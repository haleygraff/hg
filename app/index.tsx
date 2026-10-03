import { router } from 'expo-router';
import { Screen, Title, Body, Card, Button, SimulationNotice } from '../components/UI';
import { strings } from '../constants/strings';
export default function Home() {
  return <Screen><Title>{strings.app}</Title><Body>{strings.subtitle}</Body><SimulationNotice />
    <Card><Body>{strings.roadmap}</Body><Button title={strings.start} onPress={() => router.push('/measure')} /></Card>
    <Button title={strings.history} secondary onPress={() => router.push('/history')} />
    <Button title={strings.settings} secondary onPress={() => router.push('/settings')} /><Body>{strings.disclaimer}</Body></Screen>;
}
