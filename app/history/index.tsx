import { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Title, Body, Button, ErrorText } from '../../components/UI';
import { MeasurementCard } from '../../components/MeasurementCard';
import { strings } from '../../constants/strings';
import { getMeasurements } from '../../services/database/measurements';
import type { Measurement } from '../../types/measurement';
export default function History() {
  const [records, setRecords] = useState<Measurement[]>([]); const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); const [attempt, setAttempt] = useState(0);
  useFocusEffect(useCallback(() => { let live = true; setLoading(true); setError('');
    getMeasurements().then(rows => { if (live) setRecords(rows); }).catch(() => { if (live) setError(strings.storageError); })
      .finally(() => { if (live) setLoading(false); }); return () => { live = false; };
  }, [attempt]));
  return <Screen><Title>{strings.history}</Title>{loading ? <Body>{strings.loading}</Body> : error ? <><ErrorText message={error} /><Button title={strings.retry} onPress={() => setAttempt(n => n + 1)} /></> : records.length === 0 ? <><Body>{strings.empty}</Body><Body>{strings.emptyHint}</Body><Button title={strings.start} onPress={() => router.push('/measure')} /></> : records.map(m => <MeasurementCard key={m.id} measurement={m} />)}</Screen>;
}
