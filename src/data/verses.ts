export interface Verse {
  id: number;
  surahId: number;
  verseNumber: number;
  arabic: string;
  translation: string;
  transliteration?: string;
}

// Sample verses for Al-Fatihah
export const alFatihahVerses: Verse[] = [
  { id: 1, surahId: 1, verseNumber: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
  { id: 2, surahId: 1, verseNumber: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'All praise is due to Allah, Lord of the worlds.' },
  { id: 3, surahId: 1, verseNumber: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Entirely Merciful, the Especially Merciful.' },
  { id: 4, surahId: 1, verseNumber: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Sovereign of the Day of Recompense.' },
  { id: 5, surahId: 1, verseNumber: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'It is You we worship and You we ask for help.' },
  { id: 6, surahId: 1, verseNumber: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us to the straight path.' },
  { id: 7, surahId: 1, verseNumber: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'The path of those upon whom You have bestowed favor, not of those who have earned anger nor of those who are astray.' },
];

// Daily verse
export const dailyVerse: Verse = {
  id: 100,
  surahId: 2,
  verseNumber: 286,
  arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
  translation: 'Allah does not burden a soul beyond that it can bear.',
};

// Featured verses for topics
export const featuredVerses: Verse[] = [
  { id: 200, surahId: 94, verseNumber: 5, arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'For indeed, with hardship will be ease.' },
  { id: 201, surahId: 3, verseNumber: 139, arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', translation: 'So do not weaken and do not grieve, and you will be superior if you are believers.' },
  { id: 202, surahId: 13, verseNumber: 28, arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Verily, in the remembrance of Allah do hearts find rest.' },
];
