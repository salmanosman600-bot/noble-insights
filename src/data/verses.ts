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
  translation: 'Allah does not burden a soul beyond that it can bear.',
};

// Featured verses for topics — shown on the home page.
export const featuredVerses: Verse[] = [
  { id: 200, surahId: 94, verseNumber: 5, arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'For indeed, with hardship will be ease.' },
  { id: 201, surahId: 3, verseNumber: 139, arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', translation: 'So do not weaken and do not grieve, and you will be superior if you are believers.' },
  { id: 202, surahId: 13, verseNumber: 28, arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Verily, in the remembrance of Allah do hearts find rest.' },
];
