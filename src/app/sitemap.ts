import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts
    .filter((post) => !post.draft) // Make sure to strictly exclude drafts in production build just in case. External posts are not returned by getAllPosts() anyway, they are fetched by getExternalPosts().
    .map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  const routes = ['', '/about', '/posts'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postUrls];
}
