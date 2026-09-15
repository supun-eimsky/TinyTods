import mysql from "mysql2/promise";
import fs from "fs";

type QueryParameter = string | number | boolean | null | Buffer | Date;

/**
 * A single shared connection pool for the whole app. In Next.js dev mode,
 * modules can be re-evaluated on every hot reload, which would otherwise
 * create a fresh pool (and fresh TCP connections) on every file save —
 * so the pool is cached on `globalThis`, the same pattern commonly used
 * for Prisma clients in Next.js apps.
 */
declare global {
  // eslint-disable-next-line no-var
  var __tinytodsPool: mysql.Pool | undefined;
}

/**
 * AWS RDS (and most managed MySQL hosts) require or strongly recommend
 * TLS. Controlled by env vars so local MySQL (no SSL) and RDS (SSL) both
 * work with the same code:
 *   DB_SSL=true                 -> enables SSL
 *   DB_SSL_CA_PATH=./rds-ca.pem -> optional path to a CA bundle file, e.g.
 *                                  one downloaded from AWS (see README).
 *   DB_SSL_CA="-----BEGIN..."   -> optional: the CA bundle's contents
 *                                  pasted directly into an env var instead
 *                                  of a file. Use this on hosts with a
 *                                  read-only/ephemeral filesystem at
 *                                  runtime (e.g. Vercel), where there's
 *                                  nowhere to save a .pem file for
 *                                  DB_SSL_CA_PATH to point at. Most hosts'
 *                                  env var UIs accept multi-line values
 *                                  fine — paste the whole file contents in
 *                                  as-is, including the BEGIN/END lines.
 *   (neither set)                -> Node's built-in trust store is used,
 *                                  which works for RDS's default certs in
 *                                  most setups.
 *
 * The return type is derived from mysql.createPool's own parameter type
 * rather than importing a named SSL-options type, since that name isn't
 * guaranteed stable across mysql2 versions/entry points — this way it's
 * always exactly what createPool expects.
 */
type PoolSslOption = NonNullable<Parameters<typeof mysql.createPool>[0]>["ssl"];

function buildSslConfig(): PoolSslOption {
  if (process.env.DB_SSL !== "true") return undefined;

  if (process.env.DB_SSL_CA) {
    return { ca: process.env.DB_SSL_CA };
  }
  if (process.env.DB_SSL_CA_PATH) {
    return { ca: fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8") };
  }
  return { rejectUnauthorized: true };
}

function createPool(): mysql.Pool {
  const {
    DB_HOST = "localhost",
    DB_PORT = "3306",
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;

  if (!DB_USER || !DB_NAME) {
    throw new Error(
      "Missing database configuration. Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD and DB_NAME in your .env.local (see .env.example)."
    );
  }

  return mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: buildSslConfig(),
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    dateStrings: true,
  });
}

export function getPool(): mysql.Pool {
  if (!global.__tinytodsPool) {
    global.__tinytodsPool = createPool();
  }
  return global.__tinytodsPool;
}

/**
 * Thin query helper so the rest of the app never touches the mysql2 API
 * directly — services just call `query<Row>(sql, params)`.
 */
export async function query<T = unknown>(sql: string, params: QueryParameter[] = []): Promise<T[]> {
  const pool = getPool();
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

/** For INSERT/UPDATE/DELETE, where you need affectedRows/insertId instead of row data. */
export async function execute(
  sql: string,
  params: QueryParameter[] = []
): Promise<mysql.ResultSetHeader> {
  const pool = getPool();
  const [result] = await pool.execute(sql, params);
  return result as mysql.ResultSetHeader;
}
