export default function ArticleCard({ article }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group">
      <a 
        href={`/article/${article.slug}/`}
        className="block py-5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors -mx-4 px-4 rounded-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 leading-snug">
              {article.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {article.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
              {article.category && (
                <>
                  <span>·</span>
                  <span className="text-blue-600 dark:text-blue-400">{article.category}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex-shrink-0 mt-1 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </article>
  );
}