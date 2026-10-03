import { Stack, router, type ErrorBoundaryProps } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from '../services/measurement/SessionContext';
import { theme } from '../constants/theme';
import { strings } from '../constants/strings';
import { Screen, Title, Body, Button } from '../components/UI';
export function ErrorBoundary({ retry }: ErrorBoundaryProps) {
  return <SafeAreaProvider><Screen><Title>{strings.errorTitle}</Title><Body>{strings.unexpected}</Body><Button title={strings.retry} onPress={retry} /><Button title={strings.home} onPress={() => router.replace('/')} /></Screen></SafeAreaProvider>;
}
export default function RootLayout() {
  return <SafeAreaProvider><SessionProvider><StatusBar style="dark" /><Stack screenOptions={{ headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.ink, headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal' }}>
    <Stack.Screen name="index" options={{ title: strings.app }} />
    <Stack.Screen name="measure/index" options={{ title: strings.newMeasurement }} />
    <Stack.Screen name="measure/recording" options={{ title: strings.recording, headerBackVisible: false, gestureEnabled: false }} />
    <Stack.Screen name="measure/result" options={{ title: strings.result, headerBackVisible: false, gestureEnabled: false }} />
    <Stack.Screen name="history/index" options={{ title: strings.history }} />
    <Stack.Screen name="history/[id]" options={{ title: strings.detail }} />
    <Stack.Screen name="settings" options={{ title: strings.settings }} />
  </Stack></SessionProvider></SafeAreaProvider>;
}
