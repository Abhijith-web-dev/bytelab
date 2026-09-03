import { useEffect } from 'react';

export function useSEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ByteLab`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
    
    // Cleanup is not strictly necessary for SEO tags, but we could reset if desired.
    // For an SPA, it's generally fine to leave the last set tags.
  }, [title, description]);
}
