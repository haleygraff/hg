import type { Measurement, SignalQuality } from '../../types/measurement.ts';
export type MeasurementRow = { id: string; participant_id: string; age: number | null; respiratory_rate: number | null;
  confidence_score: number; signal_quality: SignalQuality; measurement_duration: number; timestamp: string;
  notes: string; algorithm_version: string; error_code: string | null; created_at: string };
export function toRow(m: Measurement): MeasurementRow {
  return { id: m.id, participant_id: m.participantId, age: m.age, respiratory_rate: m.respiratoryRate,
    confidence_score: m.confidenceScore, signal_quality: m.signalQuality, measurement_duration: m.measurementDuration,
    timestamp: m.timestamp, notes: m.notes, algorithm_version: m.algorithmVersion, error_code: m.errorCode ?? null, created_at: m.timestamp };
}
export function fromRow(r: MeasurementRow): Measurement {
  return { id: r.id, participantId: r.participant_id, age: r.age, respiratoryRate: r.respiratory_rate,
    confidenceScore: r.confidence_score, signalQuality: r.signal_quality, measurementDuration: r.measurement_duration,
    timestamp: r.timestamp, notes: r.notes, algorithmVersion: r.algorithm_version, ...(r.error_code ? { errorCode: r.error_code } : {}) };
}
