import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Best Car Repair Service in Freetown | Cool Car Auto Garage Sierra Leone',
  description = 'Leading auto repair and maintenance service in Freetown, Sierra Leone. Expert mechanics for Toyota, Mercedes, BMW & all brands. Modern diagnostic equipment, genuine parts, and trusted service since 2004. Visit our Bai Bureh Road location for professional car care.',
  keywords = 'car repair Freetown, best mechanic Sierra Leone, auto garage Freetown, car service Sierra Leone, vehicle maintenance Freetown, auto repair shop Sierra Leone, car workshop Freetown, Toyota repair Sierra Leone, Mercedes service Freetown, BMW mechanic Sierra Leone, Land Cruiser specialist Freetown, car diagnostics Sierra Leone, engine repair Freetown, brake service Sierra Leone, car AC repair Freetown',
  image = '/Best-Mechanic-in-freetown.webp',
  url = 'https://www.coolcarautorepairgarage.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = `${title} | Cool Car Auto Garage`;
  
  // Enhanced structured data for local business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Cool Car Auto Garage',
    alternateName: 'Cool Car Auto Repair Service Freetown',
    image,
    '@id': url,
    url,
    telephone: '+23278590287',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '563 Bai Bureh Road Allen Town Furniture',
      addressLocality: 'Freetown',
      addressRegion: 'Western Area',
      postalCode: '00232',
      addressCountry: 'SL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.409759476855601,
      longitude: -13.141907177382976
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/coolcarautogarage',
      'https://www.instagram.com/coolcarautogarage'
    ],
    priceRange: '$$',
    currenciesAccepted: 'SLL, USD',
    paymentAccepted: 'Cash, Bank Transfer, Mobile Money',
    areaServed: [
      {
        '@type': 'City',
        name: 'Freetown',
        '@id': 'https://www.wikidata.org/wiki/Q3744',
      },
      'Western Area',
      'Sierra Leone'
    ],
    description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto Repair Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Diagnostic Services',
            description: 'Advanced computer diagnostics for all vehicle makes'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Engine Repair & Maintenance',
            description: 'Complete engine repair and maintenance services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transmission Service',
            description: 'Manual and automatic transmission repair'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brake System Service',
            description: 'Complete brake system repair and maintenance'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Electrical Systems',
            description: 'Vehicle electrical system diagnostics and repair'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Air Conditioning Service',
            description: 'Car AC repair and maintenance'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150'
    }
  };

  return (
    <Helmet>
      {/* Enhanced Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Cool Car Auto Garage" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Cool Car Auto Garage" />
      <meta property="og:locale" content="en_SL" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Enhanced Local Business Meta Tags */}
      <meta name="geo.region" content="SL-W" />
      <meta name="geo.placename" content="Freetown, Sierra Leone" />
      <meta name="geo.position" content="8.409759476855601;-13.141907177382976" />
      <meta name="ICBM" content="8.409759476855601, -13.141907177382976" />
      <meta name="google" content="notranslate" />
      
      {/* Language and Region */}
      <meta property="og:locale" content="en_SL" />
      <meta name="language" content="English" />
      <meta name="country" content="Sierra Leone" />
      <meta name="city" content="Freetown" />
      
      {/* Mobile Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#1E40AF" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
} 