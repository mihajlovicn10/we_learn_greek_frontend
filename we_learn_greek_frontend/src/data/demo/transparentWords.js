export const demoWords = [
          { 
            id: 1, 
            greek_word: 'δημοκρατία',
            language_word: 'democracy',
            pronunciation: 'dimokratía',
            etymology: 'From Greek "demos" (people) and "kratos" (power)',
            example_greek: 'Η δημοκρατία είναι σημαντική.',
            example_translation: 'Democracy is important.',
            category: 'politics'
          },
          { 
            id: 2, 
            greek_word: 'φιλοσοφία',
            language_word: 'philosophy',
            pronunciation: 'filosofía',
            etymology: 'From Greek "philo" (love) and "sophia" (wisdom)',
            example_greek: 'Η φιλοσοφία μας βοηθά να καταλάβουμε τη ζωή.',
            example_translation: 'Philosophy helps us understand life.',
            category: 'academics'
          },
          { 
            id: 3, 
            greek_word: 'τηλέφωνο',
            language_word: 'telephone',
            pronunciation: 'tiléfono',
            etymology: 'From Greek "tele" (far) and "phone" (voice)',
            example_greek: 'Το τηλέφωνό μου χτυπάει.',
            example_translation: 'My telephone is ringing.',
            category: 'technology'
          },
          { 
            id: 4, 
            greek_word: 'γεωγραφία',
            language_word: 'geography',
            pronunciation: 'geografía',
            etymology: 'From Greek "geo" (earth) and "graphia" (writing)',
            example_greek: 'Μου αρέσει η γεωγραφία.',
            example_translation: 'I like geography.',
            category: 'academics'
          },
          { 
            id: 5, 
            greek_word: 'μουσική',
            language_word: 'music',
            pronunciation: 'mousikí',
            etymology: 'From Greek "mousike" (art of the Muses)',
            example_greek: 'Η μουσική είναι η γλώσσα της ψυχής.',
            example_translation: 'Music is the language of the soul.',
            category: 'arts'
          },
          { 
            id: 6, 
            greek_word: 'αστρονομία',
            language_word: 'astronomy',
            pronunciation: 'astronomía',
            etymology: 'From Greek "astron" (star) and "nomos" (law)',
            example_greek: 'Η αστρονομία είναι η μελέτη των ουράνιων σωμάτων.',
            example_translation: 'Astronomy is the study of celestial bodies.',
            category: 'science'
          },
          { 
            id: 7, 
            greek_word: 'βιολογία',
            language_word: 'biology',
            pronunciation: 'viología',
            etymology: 'From Greek "bios" (life) and "logia" (study)',
            example_greek: 'Η βιολογία είναι η επιστήμη της ζωής.',
            example_translation: 'Biology is the science of life.',
            category: 'science'
          }
        ];

export function localizeDemoWords(words, language) {
  return words.map((word) => {
    const localizedWord = { ...word };
    if (language === "fr") {
      if (word.greek_word === "δημοκρατία") localizedWord.language_word = "démocratie";
      if (word.greek_word === "φιλοσοφία") localizedWord.language_word = "philosophie";
      if (word.greek_word === "τηλέφωνο") localizedWord.language_word = "téléphone";
      if (word.greek_word === "γεωγραφία") localizedWord.language_word = "géographie";
      if (word.greek_word === "μουσική") localizedWord.language_word = "musique";
      if (word.greek_word === "αστρονομία") localizedWord.language_word = "astronomie";
      if (word.greek_word === "βιολογία") localizedWord.language_word = "biologie";
    } else if (language === "de") {
      if (word.greek_word === "δημοκρατία") localizedWord.language_word = "Demokratie";
      if (word.greek_word === "φιλοσοφία") localizedWord.language_word = "Philosophie";
      if (word.greek_word === "τηλέφωνο") localizedWord.language_word = "Telefon";
      if (word.greek_word === "γεωγραφία") localizedWord.language_word = "Geographie";
      if (word.greek_word === "μουσική") localizedWord.language_word = "Musik";
      if (word.greek_word === "αστρονομία") localizedWord.language_word = "Astronomie";
      if (word.greek_word === "βιολογία") localizedWord.language_word = "Biologie";
    } else if (language === "es") {
      if (word.greek_word === "δημοκρατία") localizedWord.language_word = "democracia";
      if (word.greek_word === "φιλοσοφία") localizedWord.language_word = "filosofía";
      if (word.greek_word === "τηλέφωνο") localizedWord.language_word = "teléfono";
      if (word.greek_word === "γεωγραφία") localizedWord.language_word = "geografía";
      if (word.greek_word === "μουσική") localizedWord.language_word = "música";
      if (word.greek_word === "αστρονομία") localizedWord.language_word = "astronomía";
      if (word.greek_word === "βιολογία") localizedWord.language_word = "biología";
    }
    return localizedWord;
  });
}
