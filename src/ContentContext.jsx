import { createContext, useContext, useEffect, useState } from 'react';
import { SITE_CONTENT as DEFAULT_CONTENT } from './siteContent';
import { BLOG_POSTS } from './blogData';
import { PROJECTS } from './projectsData';

const FALLBACK_CONTENT = { ...DEFAULT_CONTENT, blogs: BLOG_POSTS, projects: PROJECTS };

const ContentContext = createContext(FALLBACK_CONTENT);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT);

  useEffect(() => {
    fetch('/content/site-content.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Content file unavailable');
        return response.json();
      })
      .then((remoteContent) => setContent({
        ...FALLBACK_CONTENT,
        ...remoteContent,
        blogs: remoteContent.blogs ?? FALLBACK_CONTENT.blogs,
        projects: remoteContent.projects ?? FALLBACK_CONTENT.projects
      }))
      .catch(() => {
        // The bundled content keeps the site available when the external file is missing.
      });
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(ContentContext);
}
