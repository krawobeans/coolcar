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
  title = 'Cool Car Auto Garage - Best Car Repair Service in Freetown, Sierra Leone',
  description = 'Professional auto repair and maintenance services in Freetown, Sierra Leone. Expert mechanics, modern equipment, and reliable service for all car brands including Toyota, Mercedes, BMW, and more.',
  keywords = 'car repair Freetown, auto garage Sierra Leone, mechanic Freetown, car service Sierra Leone, vehicle maintenance Freetown, auto repair shop Sierra Leone, car workshop Freetown, Toyota repair Sierra Leone, Mercedes service Freetown, BMW mechanic Sierra Leone',
  image = '/Best-Mechanic-in-freetown.webp',
  url = 'https://coolcarautogarage.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = `${title} | Cool Car Auto Garage`;
  
  // Structured data for local business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Cool Car Auto Garage',
    image,
    '@id': url,
    url,
    telephone: '+23278590287',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '156 Bai Bureh Road',
      addressLocality: 'Freetown',
      addressRegion: 'Western Area',
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
    servesCuisine: 'Auto Repair and Maintenance',
    areaServed: ['Freetown', 'Western Area', 'Sierra Leone'],
    description,
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'General Car Maintenance'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Engine Repair'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Transmission Service'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brake Service'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Electrical Systems'
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="SL" />
      <meta name="geo.placename" content="Freetown" />
      <meta name="geo.position" content="8.409759476855601;-13.141907177382976" />
      <meta name="ICBM" content="8.409759476855601, -13.141907177382976" />
      
      {/* Language and Region */}
      <meta property="og:locale" content="en_SL" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
} 