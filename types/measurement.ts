export type SignalQuality = 'good' | 'fair' | 'poor' | 'unusable';
export type Participant = { participantId: string; age: number | null; notes: string };
export type MeasurementAnalysisResult = {
  respiratoryRate: number | null;
  confidenceScore: number;
  signalQuality: SignalQuality;
  measurementDuration: number;
  algorithmVersion: string;
  errorCode?: string;
};
export type Measurement = Participant & MeasurementAnalysisResult & { id: string; timestamp: string };
