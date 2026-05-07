import type { Metadata } from 'next';
import AboutPage from '@/pages/About';

export const metadata: Metadata = {
  title: 'Biz haqimizda',
  description: "Noor platformasi haqida ma'lumot.",
};

export default function About() {
  return <AboutPage />;
}
