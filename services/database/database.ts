import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { migrate } from './migrations';
let pending: Promise<SQLiteDatabase> | undefined;
export function initializeDatabase(): Promise<SQLiteDatabase> {
  if (!pending) pending = (async () => {
    const db = await openDatabaseAsync('respiratory.db');
    try { await migrate(db); return db; }
    catch (error) { await db.closeAsync(); throw error; }
  })().catch(error => { pending = undefined; throw error; });
  return pending;
}
