import type { MeasurementAnalysisResult } from '../../types/measurement.ts';
export type AnalyzerInput = { durationSeconds: number };
export interface RespiratoryAnalyzer { analyze(input: AnalyzerInput): Promise<MeasurementAnalysisResult> }
