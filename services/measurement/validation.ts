import type { Participant, MeasurementAnalysisResult } from '../../types/measurement.ts';
import { strings } from '../../constants/strings.ts';
export function validateParticipant(participantId: string, ageText: string, notes: string): Participant {
  const text = ageText.trim();
  const age = text === '' ? null : Number(text);
  if (age !== null && (!/^\d+$/.test(text) || !Number.isInteger(age) || age < 1 || age > 120)) throw new Error(strings.ageError);
  if (participantId.trim().length > 80) throw new Error(strings.idError);
  if (notes.trim().length > 2000) throw new Error(strings.notesError);
  return { participantId: participantId.trim(), age, notes: notes.trim() };
}
export function displayableRate(result: MeasurementAnalysisResult): number | null {
  return result.signalQuality === 'unusable' || result.respiratoryRate === null || !Number.isFinite(result.respiratoryRate) || result.respiratoryRate <= 0 ? null : result.respiratoryRate;
}
