import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Game } from '../types';

interface SEOProps {
  game?: Game | null;
}

const SEO: React.FC<SEOProps> = ({ game }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isRtl = currentLang === 'ar';
  
  const baseTitle = t('seo_title');
  const baseDescription = t('seo_description');
  const siteUrl = window.location.origin;

  const title = game ? `${game.title} | ${baseTitle}` : baseTitle;
  const description = game ? `${game.description} ${t('play_now')} on Free Games Online.` : baseDescription;
  const keywords = t('seo_keywords');

  // Supported languages for hreflang
  const languages = [
    'en', 'ar', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ru', 'pt', 
    'it', 'tr', 'hi', 'bn', 'id', 'vi', 'th', 'pl', 'nl', 'el'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Free Games Online",
    "url": siteUrl,
    "description": baseDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('nav_home'),
        "item": siteUrl
      },
      ...(game ? [{
        "@type": "ListItem",
        "position": 2,
        "name": game.title,
        "item": `${siteUrl}/?game=${game.id}`
      }] : [])
    ]
  };

  const gamePlatformData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Games Online Platform",
    "operatingSystem": "Any",
    "applicationCategory": "GameApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "12450"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} dir={isRtl ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={window.location.href} />

      {/* Hreflang Tags for International SEO */}
      {languages.map((lang) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={`${siteUrl}/?lng=${lang}`} 
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={game?.imageUrl || "https://cdn-icons-png.flaticon.com/512/686/686589.png"} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content={game ? "video.other" : "website"} />
      <meta property="og:locale" content={currentLang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={game?.imageUrl || "https://cdn-icons-png.flaticon.com/512/686/686589.png"} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(gamePlatformData)}
      </script>
    </Helmet>
  );
};

export default SEO;
