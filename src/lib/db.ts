import { existsSync, copyFileSync, accessSync, constants as fsConstants } from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

/**
 * Resolve SQLite database URL so it works in every environment:
 *
 * 1) Local dev / self-host — writable filesystem:
 *      .env value (file:/absolute/path) or default file:./db/custom.db
 * 2) Vercel BUILD (SSG prerender) — build container is writable:
 *      reads the committed db/custom.db directly
 * 3) Vercel RUNTIME (serverless function) — bundle fs is READ-ONLY:
 *      copies db/custom.db to /tmp once per instance and serves writes from there
 *
 * Note: relative `file:` URLs are resolved against process.cwd()
 * (repo root at build time, function bundle root /var/task at runtime).
 */
function resolveDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL || 'file:./db/custom.db'
  if (!raw.startsWith('file:')) return raw

  const rawPath = raw.slice('file:'.length)
  const dbPath = path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(process.cwd(), rawPath)

  try {
    accessSync(dbPath, fsConstants.W_OK)
    return `file:${dbPath}`
  } catch {
    // Read-only filesystem (Vercel serverless) or missing file → copy to /tmp
    const tmpDb = path.join('/tmp', 'bimehmasooliyat.db')
    try {
      if (!existsSync(tmpDb)) copyFileSync(dbPath, tmpDb)
      return `file:${tmpDb}`
    } catch {
      // Last resort: let Prisma report the original path error clearly
      return `file:${dbPath}`
    }
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Override schema env() so relative paths resolve identically in build & runtime
    datasourceUrl: resolveDatabaseUrl(),
    // لاگ کوئری در dev حجیم است و در سندباکس محدودحافظه مشکل‌ساز می‌شود
    log: process.env.NODE_ENV === 'production' ? [] : ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
