export interface Verse {
  id: number;
  surahId: number;
  verseNumber: number;
  arabic: string;
  translation: string;
  transliteration?: string;
}

// Daily verse — shown on the home page.
export const dailyVerse: Verse = {
  id: 100,
  surahId: 2,
  verseNumber: 286,
  arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
  translation: 'Alloh hech bir jonni uning toqatidan orttig\'ini yuklamaydi.',
};

// Featured verses for topics — shown on the home page.
export const featuredVerses: Verse[] = [
  { id: 200, surahId: 94, verseNumber: 5, arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'Bas, darhaqiqat, qiyinchilik bilan birga osonlik bor.' },
  { id: 201, surahId: 3, verseNumber: 139, arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', translation: 'Siz zaiflik ko\'rsatmang va qayg\'urmang. Agar mo\'min bo\'lsangiz, albatta, g\'olib bo\'lasiz.' },
  { id: 202, surahId: 13, verseNumber: 28, arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Ogoh bo\'ling, Allohni zikr qilish bilan qalblar tinchlanur.' },
];
