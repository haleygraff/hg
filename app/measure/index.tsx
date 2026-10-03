import { useState } from 'react';
import { router } from 'expo-router';
import { Screen, Title, Body, Field, Button, ErrorText, SimulationNotice } from '../../components/UI';
import { strings } from '../../constants/strings';
import { validateParticipant } from '../../services/measurement/validation';
import { useSession } from '../../services/measurement/SessionContext';
export default function NewMeasurement() {
  const [participantId, setParticipantId] = useState(''); const [age, setAge] = useState('');
  const [notes, setNotes] = useState(''); const [error, setError] = useState(''); const session = useSession();
  function begin() { try { session.begin(validateParticipant(participantId, age, notes)); router.push('/measure/recording'); }
    catch (e) { setError(e instanceof Error ? e.message : strings.analysisError); } }
  return <Screen><Title>{strings.newMeasurement}</Title><SimulationNotice /><Body>{strings.optional}</Body>
    <Field label={strings.participant} value={participantId} onChangeText={setParticipantId} maxLength={80} autoCapitalize="none" />
    <Field label={strings.age} value={age} onChangeText={setAge} keyboardType="number-pad" maxLength={3} />
    <Field label={strings.notes} value={notes} onChangeText={setNotes} multiline maxLength={2000} />
    <ErrorText message={error} /><Button title={strings.begin} onPress={begin} /></Screen>;
}
