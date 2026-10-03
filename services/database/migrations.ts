import type { SQLiteDatabase } from 'expo-sqlite';
export async function migrate(db: SQLiteDatabase) {
  await db.execAsync('PRAGMA journal_mode = WAL;');
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  if ((row?.user_version ?? 0) < 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS measurements (
        id TEXT PRIMARY KEY NOT NULL, participant_id TEXT NOT NULL, age INTEGER,
        respiratory_rate REAL, confidence_score REAL NOT NULL, signal_quality TEXT NOT NULL,
        measurement_duration REAL NOT NULL, timestamp TEXT NOT NULL, notes TEXT NOT NULL,
        algorithm_version TEXT NOT NULL, error_code TEXT, created_at TEXT NOT NULL
      ); CREATE INDEX IF NOT EXISTS measurements_timestamp ON measurements(timestamp DESC);
      PRAGMA user_version = 1;`);
    });
  }
}
