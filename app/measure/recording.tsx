import { useEffect, useRef, useState } from 'react';
import { AppState, BackHandler, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Screen, Title, Body, Button, SimulationNotice, ErrorText } from '../../components/UI';
import { strings } from '../../constants/strings';
import { theme, MEASUREMENT_DURATION_SECONDS as duration } from '../../constants/theme';
import { useSession } from '../../services/measurement/SessionContext';
import { MockRespiratoryAnalyzer } from '../../services/measurement/MockRespiratoryAnalyzer';
import { newId } from '../../utils/ids';
export default function Recording() {
  const { participant, complete, clear } = useSession(); const [elapsed, setElapsed] = useState(0); const [error, setError] = useState('');
  const active = useRef(true);
  const cancel = useCallback(() => { active.current = false; clear(); router.replace('/'); }, [clear]);
  useFocusEffect(useCallback(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { cancel(); return true; }); return () => sub.remove(); }, [cancel]));
  useEffect(() => {
    if (!participant) return;
    active.current = true; let accumulated = 0; let last = Date.now(); let analyzing = false;
    const background = AppState.addEventListener('change', () => { last = Date.now(); });
    const timer = setInterval(() => {
      const now = Date.now(); if (AppState.currentState === 'active') accumulated += (now - last) / 1000; last = now;
      if (!active.current || analyzing) return;
      setElapsed(Math.min(duration, accumulated));
      if (accumulated >= duration) {
        analyzing = true;
        new MockRespiratoryAnalyzer().analyze({ durationSeconds: duration }).then(result => {
          if (!active.current) return; complete({ ...participant, ...result, id: newId(), timestamp: new Date().toISOString() });
          active.current = false; router.replace('/measure/result');
        }).catch(() => { if (active.current) setError(strings.analysisError); });
      }
    }, 100);
    return () => { active.current = false; clearInterval(timer); background.remove(); };
  }, [participant, complete]);
  if (!participant) return <Screen><Body>{strings.noSession}</Body><Button title={strings.start} onPress={() => router.replace('/measure')} /></Screen>;
  return <Screen><Title>{strings.recording}</Title><SimulationNotice /><Body>{strings.recordingHint}</Body>
    <View style={{ padding: 40, alignItems: 'center', gap: 24, backgroundColor: theme.card, borderRadius: 24 }}>
      <Text style={{ fontSize: 72, color: theme.primary, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{Math.ceil(duration - elapsed)}</Text>
      <Body>{strings.seconds}</Body><View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: duration, now: Math.floor(elapsed) }} style={{ height: 10, width: '100%', backgroundColor: theme.border, borderRadius: 5 }}>
        <View style={{ height: 10, width: `${elapsed / duration * 100}%`, borderRadius: 5, backgroundColor: theme.primary }} /></View>
    </View><ErrorText message={error} /><Button title={strings.cancel} secondary onPress={cancel} /></Screen>;
}
