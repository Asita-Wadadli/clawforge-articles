import Head from 'next/head';
import { useState, useEffect } from 'react';

// All 8 articles - complete data
const articlesData = [
  {
    id: '1',
    slug: '5-minute-invoice-hack',
    title: "The 5-Minute Invoice Hack That Gets You Paid 3x Faster",
    excerpt: "Discover the simple 5-minute invoice automation hack that helps small business owners get paid 3x faster. Learn the psychology of late payments and how automation transforms cash flow.",
    readTime: 4,
    category: "ClawInvoice Pro",
    date: "Apr 26, 2026"
  },
  {
    id: '2',
    slug: 'quote-process-costing-10k',
    title: "Why Your Quote Process Is Costing You $10K Per Month (And the AI Fix)",
    excerpt: "Every hour you spend creating quotes is an hour you're not billing clients. Discover how AI can generate professional quotes in 60 seconds and win more deals.",
    readTime: 4,
    category: "Instant Quote Engine Pro",
    date: "Apr 26, 2026"
  },
  {
    id: '3',
    slug: 'automated-80-percent-admin',
    title: "How I Automated 80% of My Admin Work in 30 Days (Without Hiring)",
    excerpt: "Most business owners spend 40% of their time on admin tasks. Learn the 30-day transformation that reclaims 20+ hours per week through strategic automation.",
    readTime: 5,
    category: "ClawForge Suite",
    date: "Apr 26, 2026"
  },
  {
    id: '4',
    slug: 'ai-chatbots-dead',
    title: "AI Chatbots Are Dead—Here's What's Replacing Them in 2026",
    excerpt: "Traditional chatbots failed because they were rigid and frustrating. Discover how AI avatars are revolutionizing customer service with natural conversations and emotional intelligence.",
    readTime: 4,
    category: "AI Avatar Pack",
    date: "Apr 26, 2026"
  },
  {
    id: '5',
    slug: '47-dollar-tool-eliminated-2000-va',
    title: "The $47 Tool That Eliminated My $2,000/Month Virtual Assistant",
    excerpt: "I was paying $24,000/year for a VA until I built an automation system that handles 80% of the work. Here's how you can do the same.",
    readTime: 4,
    category: "ClawForge Suite",
    date: "Apr 26, 2026"
  },
  {
    id: '6',
    slug: '7-ai-automation-tools',
    title: "7 AI Automation Tools Every Small Business Needs in 2026",
    excerpt: "Small businesses using AI automation grow 3x faster. Discover the 7 essential tools that can save you 20+ hours per week.",
    readTime: 5,
    category: "ClawForge Suite",
    date: "Apr 26, 2026"
  },
  {
    id: '7',
    slug: 'automated-payment-follow-up',
    title: "Stop Chasing Payments: The Automated Follow-Up System That Actually Works",
    excerpt: "Chasing invoices is awkward and kills cash flow. Learn how automated follow-ups recover 40% more revenue while saving 10+ hours per week.",
    readTime: 4,
    category: "ClawInvoice Pro",
    date: "Apr 26, 2026"
  },
  {
    id: '8',
    slug: 'from-chaos-to-cash-flow',
    title: "From Chaos to Cash Flow: A Small Business Automation Success Story",
    excerpt: "How one entrepreneur transformed their chaotic business operations into a streamlined cash flow machine using the ClawForge Business Suite.",
    readTime: 5,
    category: "ClawForge Suite",
    date: "Apr 26, 2026"
  }
];

export async function getStaticProps() {
  return {
    props: {
      articles: articlesData,
      buildTime: Date.now()
    },
    revalidate: 1
  };
}

export default function Home({ articles, buildTime }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <Head>
        <title>Blog — ClawForge</title>
        <meta name="description" content="Thoughts on automation, AI, and building efficient business systems." />
        <meta name="build-time" content={buildTime} />
      </Head>

      <div style={{ minHeight: '100vh', background: darkMode ? '#111827' : '#f9fafb', color: darkMode ? '#fff' : '#111' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'sticky', 
          top: 0, 
          height: '56px', 
          background: darkMode ? '#1f2937' : '#fff',
          borderBottom: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px'
        }}>
          <a href="https://hemisphere-claw-agency.vercel.app" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>C</div>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>ClawForge</span>
          </a>

          <div style={{ flex: 1 }}></div>

          <button 
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              background: darkMode ? '#374151' : '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>

        {/* Main Content */}
        <main style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 16px' }}>
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              Blog
            </h1>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Thoughts on automation, AI, and building efficient business systems.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>
              {articles.length} articles · Build: {new Date(buildTime).toLocaleTimeString()}
            </p>
          </header>

          {/* Articles List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {articles.map((article) => (
              <article 
                key={article.id}
                style={{
                  background: darkMode ? '#1f2937' : '#fff',
                  borderRadius: '12px',
                  border: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
                  overflow: 'hidden'
                }}
              >
                <a 
                  href={`/article/${article.slug}`}
                  style={{ 
                    display: 'block', 
                    padding: '20px', 
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {article.title}
                  </h2>
                  
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                    {article.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime} min read</span>
                    <span>·</span>
                    <span style={{ color: '#2563eb' }}>{article.category}</span>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Read Article →
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ 
          borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'), 
          background: darkMode ? '#1f2937' : '#fff', 
          marginTop: '64px',
          padding: '32px 16px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280' }}>© {new Date().getFullYear()} ClawForge Systems</p>
        </footer>
      </div>
    </>
  );
}