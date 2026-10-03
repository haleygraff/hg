import { Text } from 'react-native';
import { strings } from '../constants/strings';
import { theme } from '../constants/theme';
import type { SignalQuality } from '../types/measurement';
export function QualityBadge({ quality }: { quality: SignalQuality }) { return <Text style={{ color: theme.ink, fontSize: 17, fontWeight: '600' }}>{strings.qualities[quality]}</Text>; }
