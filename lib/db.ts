import mysql from "mysql2/promise";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type QueryParameter = string | number | boolean | null | Buffer | Date;

function removeUnsupportedMysqlOptions(connectionString: string): string {
  const url = new URL(connectionString);
  url.searchParams.delete("ssl-mode");
  return url.toString();
}

/**
 * Resolves the MySQL connection string.
 *
 * On Cloudflare (production/preview builds), the connection comes from
 * the Hyperdrive binding. Hyperdrive terminates TLS to RDS on its side,
 * so no SSL config or CA bundle is needed here — passing one (or trying
 * to read one from disk) will fail, since Workers has no real filesystem
 * at runtime.
 *
 * In plain local Node.js dev (`next dev`, no Cloudflare context), this
 * falls back to DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME from
 * .env.local instead.
 */
function getConnectionString(): string {
  try {
    const { env } = getCloudflareContext();
    if (env.HYPERDRIVE?.connectionString) {
      return removeUnsupportedMysqlOptions(env.HYPERDRIVE.connectionString);
    }
  } catch {
    // Not running inside a Cloudflare context (e.g. plain `next dev`) — fall through.
  }

  const {
    DB_HOST = "localhost",
    DB_PORT = "3306",
    DB_USER,
    DB_PASSWORD = "",
    DB_NAME,
  } = process.env;

  if (!DB_USER || !DB_NAME) {
    throw new Error(
      "Missing database configuration. Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD and DB_NAME in your .env.local (see .env.example), or configure the HYPERDRIVE binding for Cloudflare."
    );
  }

  return `mysql://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

export function getConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    uri: getConnectionString(),
    dateStrings: true,
    disableEval: true,
  });
}

/**
 * Thin query helper so the rest of the app never touches the mysql2 API
 * directly — services just call `query<Row>(sql, params)`.
 */
export async function query<T = unknown>(sql: string, params: QueryParameter[] = []): Promise<T[]> {
  const connection = await getConnection();
  try {
    // Hyperdrive may cache read queries. This app needs admin changes to be
    // visible immediately, so make each SELECT a distinct cache key.
    const uncachedSql = /^\s*SELECT\b/i.test(sql)
      ? `${sql} /* fresh-read-${Date.now()}-${Math.random()} */`
      : sql;
    const [rows] = await connection.query(uncachedSql, params);
    return rows as T[];
  } finally {
    await connection.end();
  }
}

/** For INSERT/UPDATE/DELETE, where you need affectedRows/insertId instead of row data. */
export async function execute(
  sql: string,
  params: QueryParameter[] = []
): Promise<mysql.ResultSetHeader> {
  const connection = await getConnection();
  try {
    // Hyperdrive does not support MySQL prepared statements (COM_STMT_PREPARE).
    const [result] = await connection.query(sql, params);
    return result as mysql.ResultSetHeader;
  } finally {
    await connection.end();
  }
}