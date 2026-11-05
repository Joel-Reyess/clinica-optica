import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
// SQLite viene incluido en Node (22.13+): no hay nada que compilar ni instalar.
import { DatabaseSync } from 'node:sqlite'

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
  `,
  // 2: recetas privadas, personal del panel y sesiones
  `
  CREATE TABLE archivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    solicitud_id INTEGER NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
    nombre_original TEXT NOT NULL,
    nombre_guardado TEXT NOT NULL UNIQUE,
    tipo_mime TEXT NOT NULL,
    bytes INTEGER NOT NULL,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE UNIQUE INDEX idx_archivos_solicitud ON archivos (solicitud_id);

  CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL UNIQUE,
    clave_hash TEXT NOT NULL,
    nombre TEXT NOT NULL,
    rol TEXT NOT NULL DEFAULT 'personal' CHECK (rol IN ('admin', 'personal')),
    activo INTEGER NOT NULL DEFAULT 1,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE sesiones (
    token_hash TEXT PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    expira_en TEXT NOT NULL,
    creada_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX idx_sesiones_expira ON sesiones (expira_en);

  CREATE TABLE login_intentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    ip TEXT NOT NULL,
    exitoso INTEGER NOT NULL,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX idx_login_intentos ON login_intentos (usuario, creado_en);
  `,
  // 3: catálogo y textos editables
  `
  CREATE TABLE productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL CHECK (categoria IN ('clasicos', 'modernos', 'seguridad-graduada')),
    nombre TEXT NOT NULL,
    codigo TEXT,
    descripcion TEXT,
    colores TEXT NOT NULL DEFAULT '[]',
    precio_desde TEXT,
    promocion TEXT,
    visible INTEGER NOT NULL DEFAULT 1,
    orden INTEGER NOT NULL DEFAULT 0,
    creado_en TEXT NOT NULL DEFAULT (datetime('now')),
    actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE producto_imagenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
    nombre_guardado TEXT NOT NULL UNIQUE,
    texto_alternativo TEXT,
    orden INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE bloques_texto (
    clave TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    valor TEXT NOT NULL,
    actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  `,
  // 4: medición de clics (sin datos personales: solo qué botón y en qué página)
  `
  CREATE TABLE eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evento TEXT NOT NULL,
    ruta TEXT NOT NULL,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX idx_eventos ON eventos (evento, creado_en);
  `
]

let db: DatabaseSync | undefined

export function useDb() {
  if (db) return db

  const { dbPath } = useRuntimeConfig()
  const archivo = resolve(dbPath)
  mkdirSync(dirname(archivo), { recursive: true })

  const conexion = new DatabaseSync(archivo)
  conexion.exec('PRAGMA journal_mode = WAL') // lecturas y escrituras no se estorban
  conexion.exec('PRAGMA foreign_keys = ON')

  const { user_version: aplicada } = conexion.prepare('PRAGMA user_version').get() as { user_version: number }
  for (let v = aplicada; v < MIGRACIONES.length; v++) {
    conexion.exec('BEGIN')
    try {
      conexion.exec(MIGRACIONES[v]!)
      conexion.exec(`PRAGMA user_version = ${v + 1}`)
      conexion.exec('COMMIT')
    } catch (e) {
      conexion.exec('ROLLBACK')
      throw e
    }
  }

  db = conexion
  return db
}
