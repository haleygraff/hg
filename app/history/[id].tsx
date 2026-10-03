import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Screen, Title, Body, Button, Card, DetailRow, ErrorText, SimulationNotice } from '../../components/UI';
import { strings } from '../../constants/strings';
import { getMeasurementById, deleteMeasurement } from '../../services/database/measurements';
import { formatDate } from '../../utils/dates';
import { displayableRate } from '../../services/measurement/validation';
import type { Measurement } from '../../types/measurement';
export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>(); const [record, setRecord] = useState<Measurement | null>(null);
  const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [attempt, setAttempt] = useState(0);
  useFocusEffect(useCallback(() => { let live = true; setLoading(true); setError('');
    getMeasurementById(id).then(m => { if (live) setRecord(m); }).catch(() => { if (live) setError(strings.storageError); })
      .finally(() => { if (live) setLoading(false); }); return () => { live = false; };
  }, [id, attempt]));
  function confirmDelete() { Alert.alert(strings.deleteTitle, strings.deleteBody, [
    { text: strings.keep, style: 'cancel' }, { text: strings.delete, style: 'destructive', onPress: () => {
      setBusy(true); deleteMeasurement(id).then(() => router.replace('/history')).catch(() => { setError(strings.deleteError); setBusy(false); });
    } },
  ]); }
  if (loading) return <Screen><Body>{strings.loading}</Body></Screen>;
  if (!record) return <Screen><Body>{error || strings.missing}</Body>{error ? <Button title={strings.retry} onPress={() => setAttempt(n => n + 1)} /> : <Button title={strings.history} onPress={() => router.replace('/history')} />}</Screen>;
  return <Screen><Title>{strings.detail}</Title><SimulationNotice /><Card>
    <DetailRow label={strings.participant} value={record.participantId || strings.anonymous} />
    <DetailRow label={strings.age} value={record.age?.toString() ?? strings.notProvided} />
    <DetailRow label={strings.rate} value={`${displayableRate(record) ?? '—'} ${strings.unit}`} />
    <DetailRow label={strings.quality} value={strings.qualities[record.signalQuality]} />
    <DetailRow label={strings.confidence} value={`${Math.round(record.confidenceScore * 100)}%`} />
    <DetailRow label={strings.duration} value={`${record.measurementDuration} ${strings.seconds}`} />
    <DetailRow label={strings.date} value={formatDate(record.timestamp)} />
    <DetailRow label={strings.notes} value={record.notes || strings.notProvided} />
    <DetailRow label={strings.algorithm} value={record.algorithmVersion} />
  </Card><ErrorText message={error} /><Button title={strings.delete} danger disabled={busy} onPress={confirmDelete} /><Body>{strings.disclaimer}</Body></Screen>;
}
