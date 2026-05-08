import type { Metadata } from 'next';
import { Suspense } from 'react';
import MushafReader from '@/features/quran/components/mushaf-reader';

export const metadata: Metadata = {
  title: 'Mushaf — Qur\'on Karim',
  description:
    "QCF V2 shriftlari yordamida Qur'on Karimni Madinah Mushafi uslubida o'qing. Har bir so'z o'ziga xos kaligrafiya bilan ko'rsatiladi.",
};

// Suspense required because MushafReader calls useSearchParams().
export default function MushafPage() {
  return (
    <Suspense fallback={null}>
      <MushafReader />
    </Suspense>
  );
}
