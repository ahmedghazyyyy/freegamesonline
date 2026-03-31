import React from 'react';
import { Game } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  gameData?: Game;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  ogImage,
  gameData 
}) => {
  const defaultTitle = "Free Games Online - Play Instant Browser Games | NeonArcade";
  const defaultDescription = "Play the best free games online at NeonArcade. Instant access to action, puzzle, racing, and sports games. No downloads required, just click and play!";
  const siteUrl = "https://ais-dev-tc753keoqx7wrgrl2nwp5q-480359869325.europe-west2.run.app";

  const fullTitle = title ? `${title} | NeonArcade` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage || "https://cdn-icons-png.flaticon.com/512/686/686589.png";

  React.useEffect(() => {
    document.title = fullTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', fullDescription);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullCanonical);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', fullDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonical);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', fullOgImage);

    // Twitter
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', fullTitle);

    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', fullDescription);

    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', fullCanonical);

    const twImg = document.querySelector('meta[property="twitter:image"]');
    if (twImg) twImg.setAttribute('content', fullOgImage);

    // JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'json-ld-structured-data';
    script.type = 'application/ld+json';

    let jsonLd: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": siteUrl,
      "name": "NeonArcade",
      "description": defaultDescription,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    if (gameData) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": gameData.title,
        "description": gameData.description,
        "image": gameData.imageUrl,
        "url": `${siteUrl}/game/${gameData.id}`,
        "genre": gameData.category,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": gameData.rating,
          "bestRating": "5",
          "ratingCount": gameData.players
        },
        "applicationCategory": "Game",
        "operatingSystem": "Web Browser"
      };
    }

    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

  }, [fullTitle, fullDescription, fullCanonical, fullOgImage, gameData]);

  return null;
};
