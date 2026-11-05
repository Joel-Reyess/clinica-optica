import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'

// Migraciones: cada elemento se aplica UNA vez, en orden. Para cambiar la base,
// NO edites una anterior: agrega una nueva al final. La versión aplicada se guarda
// en el propio archivo .db (PRAGMA user_version).
const MIGRACIONES: string[] = [
  `
  CREATE TABLE solicitudes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL UNIQUE,
    tipo TEXT NOT NULL CHECK (tipo IN ('cita', 'cotizacion', 'empresa', 'informacion')),
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    correo TEXT,
    datos TEXT NOT NULL DEFAULT '{}',
    estado TEXT NOT NULL DEFAULT 'nueva'
      CHECK (estado IN ('nueva', 'contactada', 'en_seguimiento', 'cerrada')),
    resultado TEXT,
    responsable TEXT,
    notas TEXT,
    acepta_privacidad_en TEXT NOT NULL,
    creada_en TEXT NOT NULL DEFAULT (datetime('now')),
    actualizada_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX idx_solicitudes_tipo_estado ON solicitudes (tipo, estado, creada_en);
  `
]

let db: Database.Database | undefined

export function useDb() {
  if (db) return db

  const { dbPath } = useRuntimeConfig()
  const archivo = resolve(dbPath)
  mkdirSync(dirname(archivo), { recursive: true })

  const conexion = new Database(archivo)
  conexion.pragma('journal_mode = WAL') // lecturas y escrituras no se estorban
  conexion.pragma('foreign_keys = ON')

  const aplicada = conexion.pragma('user_version', { simple: true }) as number
  for (let v = aplicada; v < MIGRACIONES.length; v++) {
    conexion.transaction(() => {
      conexion.exec(MIGRACIONES[v]!)
      conexion.pragma(`user_version = ${v + 1}`)
    })()
  }

  db = conexion
  return db
}
