// TODO: Switch to expo-audio, expo-av is deprecated and will be removed in SDK 54. Use expo-audio and expo-avideo packages to repalce the required functionality.
import { Audio } from "expo-av"; // deprecated, but still used in some projects
import { useState } from "react";

export function useAudioPlayer(url) {
  const [sound, setSound] = useState(null);

  async function playSound() {
    if (!url) {
      console.warn("No audio URL provided");
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(sound);

      //unload the sound when done
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  }

  return { playSound };
}
