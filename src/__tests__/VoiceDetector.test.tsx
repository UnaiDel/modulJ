// src/__tests__/VoiceDetector.test.tsx
import { render, act } from '@testing-library/react-native';
import VoiceDetector from '../components/VoiceDetector';
import { PorcupineManager } from '@picovoice/porcupine-react-native';

jest.mock('@picovoice/porcupine-react-native');

describe('VoiceDetector', () => {
  it('debería activar la función cuando se detecte "JARVIS"', async () => {
    const mockStart = jest.fn();
    const mockStop = jest.fn();

    PorcupineManager.fromKeywords = jest.fn().mockResolvedValue({
      start: mockStart,
      stop: mockStop,
      delete: jest.fn(),
    });

    const { getByText } = render(<VoiceDetector />);

    expect(getByText('Voice Detector Active')).toBeTruthy();
    expect(mockStart).toHaveBeenCalledTimes(1);

    // Simulación de detección de hotword
    act(() => {
      PorcupineManager.mock.calls[0][1]('jarvis');
    });

    // Aquí validarías la acción que debe ejecutarse al detectar "JARVIS"
  });
});
