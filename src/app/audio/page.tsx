import type { Metadata } from 'next';
import Audio from '@/pages/Audio';

export const metadata: Metadata = {
  title: 'Quran Recitations',
  description:
    'Listen to the Noble Quran recited by world-renowned reciters including Mishary Alafasy, Al-Sudais, Maher Al-Muaiqly, and more.',
};

export default function AudioPage() {
  return <Audio />;
}
