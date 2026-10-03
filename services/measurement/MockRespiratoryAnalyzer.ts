import type { AnalyzerInput, RespiratoryAnalyzer } from './RespiratoryAnalyzer.ts';
import type { MeasurementAnalysisResult } from '../../types/measurement.ts';
export class MockRespiratoryAnalyzer implements RespiratoryAnalyzer {
  async analyze(input: AnalyzerInput): Promise<MeasurementAnalysisResult> {
    if (!Number.isFinite(input.durationSeconds) || input.durationSeconds <= 0) throw new Error('Invalid duration');
    const short = input.durationSeconds < 30;
    return { respiratoryRate: short ? null : 16, confidenceScore: short ? 0 : 0.91,
      signalQuality: short ? 'unusable' : 'good', measurementDuration: input.durationSeconds,
      algorithmVersion: 'mock-0.1', ...(short ? { errorCode: 'RECORDING_TOO_SHORT' } : {}) };
  }
}
