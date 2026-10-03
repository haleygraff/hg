import type { ReactNode } from 'react';
import { ScrollView, Text, View, Pressable, StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { strings } from '../constants/strings';
export const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: '700', color: theme.ink },
  text: { fontSize: 17, color: theme.muted, lineHeight: 26 },
  card: { backgroundColor: theme.card, borderRadius: theme.radius, padding: 24, gap: 16, borderWidth: 1, borderColor: theme.border },
  label: { fontSize: 16, color: theme.ink, fontWeight: '600' },
  error: { color: theme.danger, fontSize: 16, lineHeight: 24 },
});
export function Screen({ children }: { children: ReactNode }) {
  return <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: theme.background }}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, gap: 22, width: '100%', maxWidth: 640, alignSelf: 'center', flexGrow: 1 }}>{children}</ScrollView>
  </SafeAreaView>;
}
export function Title({ children }: { children: ReactNode }) { return <Text accessibilityRole="header" style={styles.title}>{children}</Text>; }
export function Body({ children }: { children: ReactNode }) { return <Text style={styles.text}>{children}</Text>; }
export function Card({ children }: { children: ReactNode }) { return <View style={styles.card}>{children}</View>; }
export function Button({ title, onPress, disabled = false, secondary = false, danger = false }: { title: string; onPress: () => void; disabled?: boolean; secondary?: boolean; danger?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => ({ padding: 18, minHeight: 56, borderRadius: 16, backgroundColor: danger ? theme.danger : secondary ? theme.card : theme.primary,
      borderWidth: 1, borderColor: secondary ? theme.border : 'transparent', opacity: disabled ? 0.5 : pressed ? 0.75 : 1 })}>
    <Text style={{ color: secondary && !danger ? theme.ink : '#FFFFFF', fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{title}</Text>
  </Pressable>;
}
export function SimulationNotice() { return <View style={{ backgroundColor: theme.warningBackground, padding: 16, borderRadius: 14 }}><Text style={{ color: theme.warning, fontSize: 16, fontWeight: '600', lineHeight: 24 }}>{strings.simulation}</Text></View>; }
export function ErrorText({ message }: { message: string }) { return message ? <Text accessibilityRole="alert" style={styles.error}>{message}</Text> : null; }
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={{ gap: 8 }}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label}
    placeholderTextColor={theme.muted} style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 16, minHeight: 54, fontSize: 17, color: theme.ink, textAlignVertical: 'top' }} {...props} /></View>;
}
export function DetailRow({ label, value }: { label: string; value: string }) { return <View style={{ gap: 4 }}><Text style={styles.label}>{label}</Text><Body>{value}</Body></View>; }
