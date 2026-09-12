import mysql from "mysql2/promise";

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
