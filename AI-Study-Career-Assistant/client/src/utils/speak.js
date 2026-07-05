export const speak = (text) => {
  if (!window.speechSynthesis) return Promise.resolve();

  window.speechSynthesis.cancel();

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find(v => v.name.includes("Google")) ||
      voices.find(v => v.lang === "en-US");

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};
