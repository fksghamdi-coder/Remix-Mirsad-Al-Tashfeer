// src/lib/naturalVoiceEngine.ts
// تم إيقاف وإلغاء نظام الصوت بالكامل وإزالة أي استدعاء لـ Gemini API (generateContent) أو Web Speech API

export type VoiceLectureMode = 'academic_calm' | 'detailed_math' | 'quick_review';
export type AudioEngineTier = 'auto_best' | 'gemini_neural' | 'cloud_arabic' | 'native_arabic';

export interface VoiceSegment {
  id: number;
  displayText: string;
  pureArabicSpokenText: string;
  pauseAfterMs: number;
}

export interface NaturalVoiceState {
  isPlaying: boolean;
  isPaused: boolean;
  isLoadingAudio: boolean;
  currentSegmentIndex: number;
  totalSegments: number;
  currentDisplayText: string;
  currentVocalizedScript: string;
  activeEngineLabel: string;
  engineTier: AudioEngineTier;
  selectedArabicVoiceName: string;
  availableArabicVoices: never[];
  mode: VoiceLectureMode;
  rate: number;
  pitch: number;
}

class DisabledVoiceController {
  public subscribe(listener: (state: NaturalVoiceState) => void): () => void {
    listener(this.getState());
    return () => {};
  }

  public getState(): NaturalVoiceState {
    return {
      isPlaying: false,
      isPaused: false,
      isLoadingAudio: false,
      currentSegmentIndex: 0,
      totalSegments: 0,
      currentDisplayText: '',
      currentVocalizedScript: '',
      activeEngineLabel: '',
      engineTier: 'native_arabic',
      selectedArabicVoiceName: '',
      availableArabicVoices: [],
      mode: 'academic_calm',
      rate: 1,
      pitch: 1,
    };
  }

  public setVoiceConfig(_opts?: unknown) {}
  public startLecture(_rawText?: string, _opts?: unknown) {}
  public pause() {}
  public resume() {}
  public nextSegment() {}
  public prevSegment() {}
  public stop() {}
}

export const naturalVoice = new DisabledVoiceController();
export function toPureVocalizedArabicScript(rawText: string): string {
  return rawText;
}
export function preprocessForNaturalSpeech(rawText: string): string {
  return rawText;
}
