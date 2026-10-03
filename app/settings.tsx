import { useState } from 'react';
import { Screen, Title, Body, Button, ErrorText, SimulationNotice } from '../components/UI';
import { strings } from '../constants/strings';
import { DEVELOPMENT } from '../constants/theme';
import { createMeasurement } from '../services/database/measurements';
import { MockRespiratoryAnalyzer } from '../services/measurement/MockRespiratoryAnalyzer';
import { newId } from '../utils/ids';
export default function Settings() {
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function samples() { setBusy(true); setError(''); try {
    for (let i = 0; i < 5; i++) await createMeasurement({ ...await new MockRespiratoryAnalyzer().analyze({ durationSeconds: 30 }),
      id: newId(), participantId: `DEMO-${i + 1}`, age: null, notes: strings.sampleNotes, timestamp: new Date(Date.now() - i * 3600000).toISOString() });
  } catch { setError(strings.sampleError); } finally { setBusy(false); } }
  return <Screen><Title>{strings.settings}</Title><SimulationNotice /><Body>{strings.privacy}</Body><Body>{strings.roadmap}</Body><Body>{strings.disclaimer}</Body>
    {DEVELOPMENT && <><Title>{strings.developer}</Title><Button title={strings.samples} disabled={busy} onPress={() => void samples()} /><ErrorText message={error} /></>}
  </Screen>;
}
