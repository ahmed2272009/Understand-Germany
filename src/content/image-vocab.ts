import { ImageVocabItem, ImageExercise } from '../core/types/image-vocab';

// SVGs for the 10 core requested objects + additional curriculum objects
const BOOK_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#EEF2FF"/>
  <path d="M28 36C28 32.6863 30.6863 30 34 30H56C58.2091 30 60 31.7909 60 34V86C60 88.2091 58.2091 90 56 90H34C30.6863 90 28 87.3137 28 84V36Z" fill="#3B82F6"/>
  <path d="M92 36C92 32.6863 89.3137 30 86 30H64C61.7909 30 60 31.7909 60 34V86C60 88.2091 61.7909 90 64 90H86C89.3137 90 92 87.3137 92 84V36Z" fill="#60A5FA"/>
  <path d="M34 34H56V86H34C31.7909 86 30 84.2091 30 82V38C30 35.7909 31.7909 34 34 34Z" fill="#DBEAFE"/>
  <path d="M86 34H64V86H86C88.2091 86 90 84.2091 90 82V38C90 35.7909 88.2091 34 86 34Z" fill="#EFF6FF"/>
  <line x1="38" y1="46" x2="52" y2="46" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <line x1="38" y1="56" x2="52" y2="56" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <line x1="38" y1="66" x2="48" y2="66" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <line x1="68" y1="46" x2="82" y2="46" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <line x1="68" y1="56" x2="82" y2="56" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <line x1="68" y1="66" x2="78" y2="66" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 34V90" stroke="#2563EB" stroke-width="3"/>
</svg>`;

const TABLE_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FEF3C7"/>
  <rect x="22" y="44" width="76" height="12" rx="3" fill="#D97706"/>
  <path d="M26 44L34 36H86L94 44H26Z" fill="#F59E0B"/>
  <rect x="30" y="56" width="8" height="38" rx="2" fill="#B45309"/>
  <rect x="82" y="56" width="8" height="38" rx="2" fill="#B45309"/>
  <rect x="42" y="56" width="6" height="32" rx="2" fill="#92400E" opacity="0.6"/>
  <rect x="72" y="56" width="6" height="32" rx="2" fill="#92400E" opacity="0.6"/>
</svg>`;

const CHAIR_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FCE7F3"/>
  <rect x="36" y="24" width="48" height="8" rx="3" fill="#EC4899"/>
  <rect x="40" y="32" width="6" height="32" rx="2" fill="#DB2777"/>
  <rect x="74" y="32" width="6" height="32" rx="2" fill="#DB2777"/>
  <rect x="32" y="60" width="56" height="10" rx="3" fill="#F472B6"/>
  <rect x="36" y="70" width="7" height="30" rx="2" fill="#BE185D"/>
  <rect x="77" y="70" width="7" height="30" rx="2" fill="#BE185D"/>
  <rect x="46" y="70" width="5" height="24" rx="2" fill="#9D174D" opacity="0.5"/>
  <rect x="69" y="70" width="5" height="24" rx="2" fill="#9D174D" opacity="0.5"/>
</svg>`;

const HOUSE_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#DCFCE7"/>
  <path d="M60 24L24 54H96L60 24Z" fill="#DC2626"/>
  <rect x="32" y="54" width="56" height="42" fill="#FDE047" rx="2"/>
  <rect x="52" y="68" width="16" height="28" rx="2" fill="#B45309"/>
  <circle cx="64" cy="82" r="1.5" fill="#FCD34D"/>
  <rect x="38" y="62" width="10" height="12" rx="1" fill="#60A5FA"/>
  <rect x="72" y="62" width="10" height="12" rx="1" fill="#60A5FA"/>
  <rect x="74" y="28" width="8" height="16" fill="#7F1D1D"/>
</svg>`;

const CAR_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#E0F2FE"/>
  <path d="M30 62L42 42H78L90 62H30Z" fill="#38BDF8"/>
  <rect x="22" y="60" width="76" height="22" rx="6" fill="#0284C7"/>
  <circle cx="38" cy="84" r="10" fill="#1E293B"/>
  <circle cx="38" cy="84" r="4" fill="#94A3B8"/>
  <circle cx="82" cy="84" r="10" fill="#1E293B"/>
  <circle cx="82" cy="84" r="4" fill="#94A3B8"/>
  <rect x="46" y="46" width="14" height="12" fill="#E0F2FE" rx="2"/>
  <rect x="64" y="46" width="14" height="12" fill="#E0F2FE" rx="2"/>
  <circle cx="94" cy="68" r="3" fill="#FEF08A"/>
</svg>`;

const PHONE_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#F3E8FF"/>
  <rect x="40" y="22" width="40" height="76" rx="10" fill="#1E1B4B"/>
  <rect x="43" y="28" width="34" height="58" rx="4" fill="#C084FC"/>
  <circle cx="60" cy="92" r="3" fill="#A855F7"/>
  <line x1="54" y1="25" x2="66" y2="25" stroke="#6B21A8" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const COMPUTER_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#E2E8F0"/>
  <rect x="26" y="28" width="68" height="46" rx="6" fill="#0F172A"/>
  <rect x="30" y="32" width="60" height="38" rx="3" fill="#38BDF8"/>
  <path d="M52 74L48 88H72L68 74H52Z" fill="#64748B"/>
  <rect x="42" y="88" width="36" height="4" rx="2" fill="#475569"/>
  <circle cx="60" cy="51" r="8" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

const SCHOOL_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FEF9C3"/>
  <path d="M60 20L20 42H100L60 20Z" fill="#E11D48"/>
  <rect x="26" y="42" width="68" height="50" fill="#FBBF24" rx="2"/>
  <rect x="52" y="64" width="16" height="28" fill="#92400E" rx="2"/>
  <rect x="34" y="50" width="12" height="14" fill="#E0F2FE" rx="2"/>
  <rect x="74" y="50" width="12" height="14" fill="#E0F2FE" rx="2"/>
  <circle cx="60" cy="34" r="5" fill="#FFFFFF"/>
  <rect x="58" y="14" width="4" height="6" fill="#64748B"/>
  <path d="M62 14L70 17L62 20V14Z" fill="#EF4444"/>
</svg>`;

const WATER_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#CFFAFE"/>
  <path d="M60 22C60 22 36 50 36 68C36 81.2548 46.7452 92 60 92C73.2548 92 84 81.2548 84 68C84 50 60 22 60 22Z" fill="#06B6D4"/>
  <path d="M60 30C60 30 42 54 42 68C42 77.9411 50.0589 86 60 86C69.9411 86 78 77.9411 78 68C78 54 60 30 60 30Z" fill="#22D3EE"/>
  <ellipse cx="50" cy="62" rx="4" ry="8" transform="rotate(-30 50 62)" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

const FAMILY_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FFE4E6"/>
  <!-- Father -->
  <circle cx="44" cy="42" r="10" fill="#F43F5E"/>
  <path d="M30 76C30 64.9543 36.268 56 44 56C51.732 56 58 64.9543 58 76H30Z" fill="#0284C7"/>
  <!-- Mother -->
  <circle cx="76" cy="44" r="9" fill="#FB7185"/>
  <path d="M64 76C64 66.0589 69.3726 58 76 58C82.6274 58 88 66.0589 88 76H64Z" fill="#E11D48"/>
  <!-- Child -->
  <circle cx="60" cy="66" r="7" fill="#FDA4AF"/>
  <path d="M50 92C50 83.1634 54.4772 76 60 76C65.5228 76 70 83.1634 70 92H50Z" fill="#10B981"/>
</svg>`;

const BREAD_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FEF3C7"/>
  <ellipse cx="60" cy="65" rx="36" ry="22" fill="#D97706"/>
  <path d="M26 62C26 44 40 36 60 36C80 36 94 44 94 62C94 68 88 72 60 72C32 72 26 68 26 62Z" fill="#F59E0B"/>
  <line x1="44" y1="44" x2="48" y2="54" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
  <line x1="58" y1="42" x2="62" y2="54" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
  <line x1="72" y1="44" x2="76" y2="54" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
</svg>`;

const APPLE_SVG = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
  <rect width="120" height="120" rx="24" fill="#FEE2E2"/>
  <circle cx="50" cy="64" r="22" fill="#EF4444"/>
  <circle cx="70" cy="64" r="22" fill="#DC2626"/>
  <path d="M60 44C60 36 64 30 68 26" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
  <path d="M66 28C74 26 80 30 78 36C70 38 66 32 66 28Z" fill="#16A34A"/>
</svg>`;

export const IMAGE_VOCAB_ITEMS: ImageVocabItem[] = [
  {
    id: 'vocab-book',
    german: 'Buch',
    article: 'das',
    plural: 'die Bücher',
    english: 'book',
    french: 'le livre',
    arabic: 'كتاب',
    imageSvg: BOOK_SVG,
    audio: 'das Buch',
    exampleSentence: 'Ich lese ein Buch.',
    exampleTranslation: {
      english: 'I am reading a book.',
      french: 'Je lis un livre.',
      arabic: 'أنا أقرأ كتاباً.'
    },
    difficulty: 'beginner',
    lesson: 1,
    category: 'object'
  },
  {
    id: 'vocab-table',
    german: 'Tisch',
    article: 'der',
    plural: 'die Tische',
    english: 'table',
    french: 'la table',
    arabic: 'طاولة',
    imageSvg: TABLE_SVG,
    audio: 'der Tisch',
    exampleSentence: 'Das Buch liegt auf dem Tisch.',
    exampleTranslation: {
      english: 'The book is lying on the table.',
      french: 'Le livre est sur la table.',
      arabic: 'الكتاب موجود على الطاولة.'
    },
    difficulty: 'beginner',
    lesson: 10,
    category: 'home'
  },
  {
    id: 'vocab-chair',
    german: 'Stuhl',
    article: 'der',
    plural: 'die Stühle',
    english: 'chair',
    french: 'la chaise',
    arabic: 'كرسي',
    imageSvg: CHAIR_SVG,
    audio: 'der Stuhl',
    exampleSentence: 'Ich sitze auf dem Stuhl.',
    exampleTranslation: {
      english: 'I am sitting on the chair.',
      french: 'Je suis assis sur la chaise.',
      arabic: 'أنا جالس على الكرسي.'
    },
    difficulty: 'beginner',
    lesson: 10,
    category: 'home'
  },
  {
    id: 'vocab-house',
    german: 'Haus',
    article: 'das',
    plural: 'die Häuser',
    english: 'house',
    french: 'la maison',
    arabic: 'بيت',
    imageSvg: HOUSE_SVG,
    audio: 'das Haus',
    exampleSentence: 'Das Haus ist groß und schön.',
    exampleTranslation: {
      english: 'The house is big and beautiful.',
      french: 'La maison est grande et belle.',
      arabic: 'البيت كبير وجميل.'
    },
    difficulty: 'beginner',
    lesson: 11,
    category: 'home'
  },
  {
    id: 'vocab-car',
    german: 'Auto',
    article: 'das',
    plural: 'die Autos',
    english: 'car',
    french: 'la voiture',
    arabic: 'سيارة',
    imageSvg: CAR_SVG,
    audio: 'das Auto',
    exampleSentence: 'Er fährt ein schnelles Auto.',
    exampleTranslation: {
      english: 'He drives a fast car.',
      french: 'Il conduit une voiture rapide.',
      arabic: 'هو يقود سيارة سريعة.'
    },
    difficulty: 'beginner',
    lesson: 8,
    category: 'transport'
  },
  {
    id: 'vocab-phone',
    german: 'Handy',
    article: 'das',
    plural: 'die Handys',
    english: 'phone',
    french: 'le téléphone',
    arabic: 'هاتف',
    imageSvg: PHONE_SVG,
    audio: 'das Handy',
    exampleSentence: 'Ich telefoniere mit dem Handy.',
    exampleTranslation: {
      english: 'I am calling on the phone.',
      french: 'Je téléphone avec le portable.',
      arabic: 'أنا أتكلم في الهاتف.'
    },
    difficulty: 'beginner',
    lesson: 9,
    category: 'technology'
  },
  {
    id: 'vocab-computer',
    german: 'Computer',
    article: 'der',
    plural: 'die Computer',
    english: 'computer',
    french: 'l\'ordinateur',
    arabic: 'حاسوب',
    imageSvg: COMPUTER_SVG,
    audio: 'der Computer',
    exampleSentence: 'Der Computer steht auf dem Schreibtisch.',
    exampleTranslation: {
      english: 'The computer is on the desk.',
      french: 'L\'ordinateur est sur le bureau.',
      arabic: 'الحاسوب موجود على المكتب.'
    },
    difficulty: 'beginner',
    lesson: 12,
    category: 'technology'
  },
  {
    id: 'vocab-school',
    german: 'Schule',
    article: 'die',
    plural: 'die Schulen',
    english: 'school',
    french: 'l\'école',
    arabic: 'مدرسة',
    imageSvg: SCHOOL_SVG,
    audio: 'die Schule',
    exampleSentence: 'Die Kinder gehen zur Schule.',
    exampleTranslation: {
      english: 'The children go to school.',
      french: 'Les enfants vont à l\'école.',
      arabic: 'الأطفال يذهبون إلى المدرسة.'
    },
    difficulty: 'beginner',
    lesson: 7,
    category: 'object'
  },
  {
    id: 'vocab-water',
    german: 'Wasser',
    article: 'das',
    plural: 'die Wässer',
    english: 'water',
    french: 'l\'eau',
    arabic: 'ماء',
    imageSvg: WATER_SVG,
    audio: 'das Wasser',
    exampleSentence: 'Wir trinken kaltes Wasser.',
    exampleTranslation: {
      english: 'We drink cold water.',
      french: 'Nous buvons de l\'eau fraîche.',
      arabic: 'نحن نشرب ماء بارداً.'
    },
    difficulty: 'beginner',
    lesson: 13,
    category: 'nature'
  },
  {
    id: 'vocab-family',
    german: 'Familie',
    article: 'die',
    plural: 'die Familien',
    english: 'family',
    french: 'la famille',
    arabic: 'عائلة',
    imageSvg: FAMILY_SVG,
    audio: 'die Familie',
    exampleSentence: 'Meine Familie wohnt in Berlin.',
    exampleTranslation: {
      english: 'My family lives in Berlin.',
      french: 'Ma famille habite à Berlin.',
      arabic: 'عائلتي تسكن في برلين.'
    },
    difficulty: 'beginner',
    lesson: 3,
    category: 'people'
  },
  {
    id: 'vocab-bread',
    german: 'Brot',
    article: 'das',
    plural: 'die Brote',
    english: 'bread',
    french: 'le pain',
    arabic: 'خبز',
    imageSvg: BREAD_SVG,
    audio: 'das Brot',
    exampleSentence: 'Ich esse frisches Brot.',
    exampleTranslation: {
      english: 'I eat fresh bread.',
      french: 'Je mange du pain frais.',
      arabic: 'أنا آكل خبزاً طازجاً.'
    },
    difficulty: 'beginner',
    lesson: 5,
    category: 'food'
  },
  {
    id: 'vocab-apple',
    german: 'Apfel',
    article: 'der',
    plural: 'die Äpfel',
    english: 'apple',
    french: 'la pomme',
    arabic: 'تفاح',
    imageSvg: APPLE_SVG,
    audio: 'der Apfel',
    exampleSentence: 'Der Apfel ist rot und süß.',
    exampleTranslation: {
      english: 'The apple is red and sweet.',
      french: 'La pomme est rouge et sucrée.',
      arabic: 'التفاحة حمراء وحلوة.'
    },
    difficulty: 'beginner',
    lesson: 14,
    category: 'food'
  }
];

// Predefined Image-based Exercises matching the prompt requirement
export const IMAGE_EXERCISES: ImageExercise[] = IMAGE_VOCAB_ITEMS.map((item, idx) => {
  // Pick 2 distractor options with matching article pattern
  const distractors = IMAGE_VOCAB_ITEMS
    .filter(other => other.id !== item.id)
    .slice(idx % 3, (idx % 3) + 2)
    .map(other => `${other.article} ${other.german}`);

  const correct = `${item.article} ${item.german}`;
  const options = [...distractors, correct].sort(() => (idx % 2 === 0 ? -1 : 1));

  return {
    id: `img-ex-${item.id}`,
    vocabId: item.id,
    question: 'Was ist das?',
    imageSvg: item.imageSvg,
    options,
    correctAnswer: correct,
    explanation: {
      word: `${item.article} ${item.german}`,
      plural: item.plural,
      exampleSentence: item.exampleSentence,
      english: item.english,
      french: item.french,
      arabic: item.arabic
    }
  };
});
