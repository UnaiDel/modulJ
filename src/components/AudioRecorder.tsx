// src/components/AudioRecorder.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import { sendAudioData, sendTextData } from '../services/apiService';
import { AuthContext } from '../context/AuthContext';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    AudioRecord.init({
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav'
    });

    return () => {
      AudioRecord.stop();
    };
  }, []);

  const startRecording = () => {
    setRecording(true);
    AudioRecord.start();
  };

  const stopRecording = async () => {
    setRecording(false);
    const audioFile = await AudioRecord.stop();
    sendAudioData(audioFile);
  };

  const handleSendText = async () => {
    if (inputText.trim()) {
      await sendTextData(inputText);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start Recording" onPress={startRecording} disabled={recording} />
      <Button title="Stop Recording" onPress={stopRecording} disabled={!recording} />
      <TextInput
        style={styles.input}
        placeholder="Enter text to send"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send Text" onPress={handleSendText} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }
});

export default AudioRecorder;
