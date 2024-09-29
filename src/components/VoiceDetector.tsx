// src/components/VoiceDetector.tsx
import React, { useEffect, useRef } from 'react';
import { Text, View, NativeModules, AppState } from 'react-native';
import { PorcupineManager } from '@picovoice/porcupine-react-native';

const VoiceDetector: React.FC = () => {
  const managerRef = useRef<PorcupineManager | null>(null);

  useEffect(() => {
    const initPorcupine = async () => {
      try {
        managerRef.current = await PorcupineManager.fromKeywords(['jarvis'], (keyword) => {
          console.log(`Hotword Detected: ${keyword}`);
          // Lógica para activar JARVIS cuando se detecte la hotword
        });
        managerRef.current.start();
      } catch (e) {
        console.error('Error initializing Porcupine:', e);
      }
    };

    initPorcupine();

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active' && managerRef.current) {
        managerRef.current.start();
      } else if (managerRef.current) {
        managerRef.current.stop();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (managerRef.current) {
        managerRef.current.stop();
        managerRef.current.delete();
      }
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <View>
      <Text>Voice Detector Active</Text>
    </View>
  );
};

export default VoiceDetector;
