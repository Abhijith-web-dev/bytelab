import { useEffect } from 'react';

const BASE_URL = 'https://bytelab-lms.sparklabinfo1.workers.dev';

export function useSEO({ title, description, image = '/og-image.jpg' }) {
  useEffect(() => {
    if (title) {
      const fullTitle = `${title} | ByteLab`;
      document.title = fullTitle;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = fullTitle;
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.content = fullTitle;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = description;
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.content = description;
    }

    if (image) {
      const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? image : '/' + image}`;
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.content = fullImageUrl;
      const ogImageSecure = document.querySelector('meta[property="og:image:secure_url"]');
      if (ogImageSecure) ogImageSecure.content = fullImageUrl;
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) twitterImage.content = fullImageUrl;
    }
  }, [title, description, image]);
}
