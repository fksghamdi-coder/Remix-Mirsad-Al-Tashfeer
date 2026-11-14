// File: src/lib/soundEngine.ts
class SilentSoundEngine {
  public playClick(): void {}
  public playHover(): void {}
  public playPageFlip(): void {}
  public playSuccess(): void {}
  public playError(): void {}
  public playUnlock(): void {}
  public playPulse(): void {}
  public playTransition(): void {}
  public toggleMute(): boolean { return true; }
  public isMuted(): boolean { return true; }
}
export const sound = new SilentSoundEngine();
export default sound;
