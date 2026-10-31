import { notFound } from 'next/navigation';
import '../globals.css';
import BackgroundVideo from '@/components/BackgroundVideo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExploreStrip from '@/components/ExploreStrip';
import FloatingSocial from '@/components/FloatingSocial';
import { dict, locales } from '@/lib/dict';

export const dynamic = 'force-dynamic';
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  return t ? { title: t.meta.title, description: t.meta.desc } : {};
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const t = dict[locale];
  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Vazirmatn:wght@400;700;900&display=swap" />
      </head>
      <body>
        <BackgroundVideo />
        <Header locale={locale} t={t} />
        <main>{children}</main>
        <ExploreStrip locale={locale} />
        <Footer t={t} />
        <FloatingSocial />
      </body>
    </html>
  );
}
