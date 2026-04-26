// API utilities for fetching articles from Control Board

const CONTROLBOARD_API_URL = 'https://control.clawlauncher.io';

// Use environment variables or fallback to hardcoded for static build
const CONTROLBOARD_TOKEN = process.env.CONTROLBOARD_API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWQ5MzYzNmNkZTc3N2Q3YTJkYTA5NGQiLCJlbWFpbCI6ImJhbmRlbGVlQGdtYWlsLmNvbSIsInJvbGVzIjpbIkJBU0lDIl0sInJlcXVpcmVQYXNzd29yZENoYW5nZSI6ZmFsc2UsImtleSI6ImQzOWRjNTVhOTExMTY3YzcwMDZkODc2OThjZjU2N2QzIiwiaWQiOiI2OWVhNmRjOGM1ZTFiMGZjNjZiODFiMDMiLCJwbGF0Zm9ybSI6IkFQUCIsImlhdCI6MTc3Njk3MTIwOCwiZXhwIjoxODA4NTA3MjA4fQ.zeeR5gASAXD5pNd3obdsu932QEux5jesMeIyvyy9Iso';
const WORKSPACE_ID = process.env.CONTROLBOARD_WORKSPACE_ID || '69d9aa486ac188e8b218c875';

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
      excerpt: article.description || '',
      content: article.content || article.description || '',
      heroImage: article.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      category: article.publication_name || 'Article',
      tags: article.content?.secondaryKeywords || [],
      publishedAt: article.created_at || new Date().toISOString(),
      updatedAt: article.updated_at || article.created_at || new Date().toISOString(),
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
    // First get all articles
    const articles = await fetchArticles();
    const article = articles.find(article => article.slug === slug);
    
    if (!article) return null;
    
    // Try to fetch full article details if available
    try {
      const fullData = await fetchFromControlBoard(`/api/articles/${article.id}`);
      if (fullData && fullData.article) {
        // Merge full data
        return {
          ...article,
          content: fullData.article.content?.body || fullData.article.content || article.content || article.excerpt,
          excerpt: fullData.article.description || article.excerpt
        };
      }
    } catch (e) {
      // If full fetch fails, return basic article
      console.log('Could not fetch full article details, using basic data');
    }
    
    return article;
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