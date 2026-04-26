// API utilities for fetching articles from Control Board

const CONTROLBOARD_API_URL = 'https://control.clawlauncher.io';
const CONTROLBOARD_TOKEN = process.env.CONTROLBOARD_API_TOKEN;
const WORKSPACE_ID = process.env.CONTROLBOARD_WORKSPACE_ID;

async function fetchFromControlBoard(endpoint) {
  const response = await fetch(`${CONTROLBOARD_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${CONTROLBOARD_TOKEN}`,
      'X-Workspace-Id': WORKSPACE_ID,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchArticles() {
  try {
    const data = await fetchFromControlBoard('/api/articles');
    
    // Transform Control Board format to site format
    return (data.articles || []).map(article => ({
      id: article.id,
      slug: article.url || article.id,
      title: article.title,
      excerpt: article.description,
      content: article.content?.body || article.description,
      heroImage: article.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      category: article.publication_name || 'Article',
      tags: article.content?.secondaryKeywords || [],
      publishedAt: article.created_at,
      updatedAt: article.updated_at,
      readTime: Math.ceil((article.content?.wordCount || 800) / 200),
      author: {
        name: 'Vance Joseph',
        avatar: null,
        bio: 'Founder of ClawForge. Building efficient business systems through automation and AI.',
        twitter: '@vancejoseph',
        linkedin: 'vancejoseph'
      }
    }));
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug) {
  try {
    const articles = await fetchArticles();
    return articles.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function fetchArticleById(id) {
  try {
    const articles = await fetchArticles();
    return articles.find(article => article.id === id) || null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}