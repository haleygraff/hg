import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { styles, Body } from './UI';
import { QualityBadge } from './QualityBadge';
import { strings } from '../constants/strings';
import { formatDate } from '../utils/dates';
import { displayableRate } from '../services/measurement/validation';
import type { Measurement } from '../types/measurement';
export function MeasurementCard({ measurement: m }: { measurement: Measurement }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`${m.participantId || strings.anonymous}, ${formatDate(m.timestamp)}, ${strings.result}`}
    onPress={() => router.push({ pathname: '/history/[id]', params: { id: m.id } })} style={styles.card}>
    <Text style={styles.label}>{m.participantId || strings.anonymous}</Text><Body>{formatDate(m.timestamp)}</Body>
    <Text style={{ ...styles.title, fontSize: 25 }}>{displayableRate(m) ?? '—'} {strings.unit}</Text>
    <QualityBadge quality={m.signalQuality} /><Body>{strings.result}</Body>
  </Pressable>;
}
