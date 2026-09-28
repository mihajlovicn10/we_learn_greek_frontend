import { demoVerbs as rawVerbs } from './verbs';
import { demoNouns as rawNouns } from './nouns';

// The API has no translation field yet; demo entries carry one so the UI can show meanings.
const NOUN_TRANSLATIONS = {
  άνθρωπος: 'person', γυναίκα: 'woman', παιδί: 'child', σπίτι: 'house', φίλος: 'friend',
  θάλασσα: 'sea', βιβλίο: 'book', δάσκαλος: 'teacher', πόλη: 'city', νερό: 'water',
  αδελφός: 'brother', αδελφή: 'sister', δέντρο: 'tree', τραπέζι: 'table', καρέκλα: 'chair',
  ουρανός: 'sky', γη: 'earth', αυτοκίνητο: 'car', μητέρα: 'mother', πατέρας: 'father',
  σκύλος: 'dog', γάτα: 'cat', ποτήρι: 'glass', πιάτο: 'plate', δρόμος: 'road',
  λεωφόρος: 'avenue', μάτι: 'eye', χέρι: 'hand', κεφάλι: 'head', καρδιά: 'heart',
};

const VERB_TRANSLATIONS = {
  είμαι: 'to be', έχω: 'to have', κάνω: 'to do, to make', μιλάω: 'to speak',
  τρώω: 'to eat', πηγαίνω: 'to go',
};

export const demoNouns = rawNouns.map((noun) => ({
  ...noun,
  translation: NOUN_TRANSLATIONS[noun.basic_noun],
}));

export const demoVerbs = rawVerbs.map((verb) => ({
  ...verb,
  translation: VERB_TRANSLATIONS[verb.infinitive],
}));

export { demoWords, localizeDemoWords } from './transparentWords';
export { demoSavedWords } from './savedWords';
export { demoGreekToGreek } from './greekToGreek';
