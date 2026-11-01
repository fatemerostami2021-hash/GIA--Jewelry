import { notFound } from 'next/navigation';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/900.css';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/900.css';
import '../globals.css';
import CookieGate from '@/components/CookieGate';
import BackgroundVideo from '@/components/BackgroundVideo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExploreStrip from '@/components/ExploreStrip';
import FloatingSocial from '@/components/FloatingSocial';
import { dict, locales } from '@/lib/dict';

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

const SITE = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4010');

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  if (!t) return {};
  const image = { url: '/media/images/og-gia.jpg', width: 1200, height: 630, alt: 'GIA Jewelry — fine gemstones & jewellery' };
  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.title, template: '%s — GIA Jewelry' },
    description: t.meta.desc,
    applicationName: 'GIA Jewelry',
    alternates: { canonical: `/${locale}`, languages: { en: '/en', fa: '/fa' } },
    openGraph: { type: 'website', siteName: 'GIA Jewelry', title: t.meta.title, description: t.meta.desc, locale: locale === 'fa' ? 'fa_IR' : 'en_US', url: `/${locale}`, images: [image] },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.desc, images: [image.url] },
    robots: { index: true, follow: true },
  };
}

export const viewport = { themeColor: '#0a0610', colorScheme: 'dark' };

export default async function Layout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const t = dict[locale];
  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <BackgroundVideo />
        <Header locale={locale} t={t} />
        <main>{children}</main>
        <ExploreStrip locale={locale} />
        <Footer t={t} />
        <FloatingSocial />
        <CookieGate locale={locale} />
      </body>
    </html>
  );
}
