import { initializeDatabase } from './database';
import { fromRow, toRow, type MeasurementRow } from './conversion';
import type { Measurement } from '../../types/measurement';
export async function createMeasurement(measurement: Measurement) {
  const db = await initializeDatabase(); const r = toRow(measurement);
  await db.runAsync(`INSERT INTO measurements (id, participant_id, age, respiratory_rate, confidence_score,
    signal_quality, measurement_duration, timestamp, notes, algorithm_version, error_code, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`,
    r.id, r.participant_id, r.age, r.respiratory_rate, r.confidence_score, r.signal_quality,
    r.measurement_duration, r.timestamp, r.notes, r.algorithm_version, r.error_code, r.created_at);
}
export async function getMeasurements() {
  const db = await initializeDatabase();
  return (await db.getAllAsync<MeasurementRow>('SELECT * FROM measurements ORDER BY timestamp DESC, id DESC')).map(fromRow);
}
export async function getMeasurementById(id: string) {
  const db = await initializeDatabase();
  const row = await db.getFirstAsync<MeasurementRow>('SELECT * FROM measurements WHERE id = ?', id);
  return row ? fromRow(row) : null;
}
export async function deleteMeasurement(id: string) {
  const db = await initializeDatabase(); await db.runAsync('DELETE FROM measurements WHERE id = ?', id);
}
