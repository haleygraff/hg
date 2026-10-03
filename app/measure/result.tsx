import { useRef, useState } from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { Screen, Title, Body, Card, Button, SimulationNotice, ErrorText, DetailRow } from '../../components/UI';
import { QualityBadge } from '../../components/QualityBadge';
import { strings } from '../../constants/strings';
import { theme } from '../../constants/theme';
import { useSession } from '../../services/measurement/SessionContext';
import { displayableRate } from '../../services/measurement/validation';
import { createMeasurement } from '../../services/database/measurements';
export default function Result() {
  const { result, clear } = useSession(); const [saved, setSaved] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const lock = useRef(false);
  async function save() { if (!result || lock.current) return; lock.current = true; setBusy(true); setError('');
    try { await createMeasurement(result); setSaved(true); } catch { setError(strings.saveError); lock.current = false; } finally { setBusy(false); } }
  if (!result) return <Screen><Body>{strings.noSession}</Body><Button title={strings.start} onPress={() => router.replace('/measure')} /></Screen>;
  const rate = displayableRate(result);
  return <Screen><Title>{strings.result}</Title><SimulationNotice /><Body>{strings.mockDetail}</Body>
    <Card><Body>{strings.rate}</Body>{rate === null ? <Body>{strings.unusable}</Body> : <><Text style={{ color: theme.primary, fontSize: 80, fontWeight: '700' }}>{rate}</Text><Body>{strings.unit}</Body></>}
      <Body>{strings.quality}</Body><QualityBadge quality={result.signalQuality} />
      <DetailRow label={strings.confidence} value={`${Math.round(result.confidenceScore * 100)}%`} /></Card>
    <ErrorText message={error} /><Button title={saved ? strings.saved : strings.save} disabled={saved || busy} onPress={() => void save()} />
    <Button title={strings.again} secondary disabled={busy} onPress={() => { clear(); router.replace('/measure'); }} />
    <Button title={strings.done} secondary disabled={busy} onPress={() => { clear(); router.replace('/'); }} /><Body>{strings.disclaimer}</Body></Screen>;
}
