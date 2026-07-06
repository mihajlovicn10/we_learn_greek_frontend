const LANG_MAP = {
  en: 'en-GB',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  ru: 'ru-RU',
  it: 'it-IT',
};

export function useTextToSpeech() {
  const speak = (text, lang = 'el-GR') => {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const speakForLanguage = (text, languageCode, isGreek = true) => {
    speak(text, isGreek ? 'el-GR' : LANG_MAP[languageCode] || 'en-GB');
  };

  return { speak, speakForLanguage };
}
