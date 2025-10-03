import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const siteUrl = 'https://ai-teacher-training.com'; // Replace with your actual domain
  const siteName = 'التدريب على الذكاء الاصطناعي للمعلمين';
  const title = 'التدريب على الذكاء الاصطناعي للمعلمين | دورات تدريبية متخصصة';
  const description = 'برنامج تدريبي شامل للمعلمين والمعلمات لتعلم كيفية استخدام الذكاء الاصطناعي في التعليم. دورات معتمدة، محتوى عربي، وشهادات دولية.';
  const keywords = 'الذكاء الاصطناعي, تدريب المعلمين, دورات AI, التعليم الرقمي, ChatGPT للمعلمين, تقنيات التعليم, دورات معتمدة, الذكاء الاصطناعي في التعليم';
  const author = 'فريق التدريب على الذكاء الاصطناعي';
  const image = `${siteUrl}/og-image.jpg`; // You'll need to add this image

  // Structured Data (JSON-LD) for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteName,
    description: description,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://facebook.com/yourpage',
      'https://twitter.com/yourpage',
      'https://linkedin.com/company/yourpage',
      'https://youtube.com/yourchannel',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966-XX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'SA',
      availableLanguage: ['ar', 'en'],
    },
    offers: {
      '@type': 'Offer',
      category: 'التدريب على الذكاء الاصطناعي',
    },
  };

  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'التدريب على الذكاء الاصطناعي للمعلمين',
    description: description,
    provider: {
      '@type': 'Organization',
      name: siteName,
      sameAs: siteUrl,
    },
    coursePrerequisites: 'لا يوجد متطلبات مسبقة',
    educationalLevel: 'المبتدئين والمتقدمين',
    inLanguage: 'ar',
    availableLanguage: 'ar',
    teaches: 'الذكاء الاصطناعي في التعليم',
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="ar" dir="rtl" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Arabic" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ar_SA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0c4a6e" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(courseStructuredData)}
      </script>

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://ipapi.co" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
    </Helmet>
  );
};

export default SEO;
