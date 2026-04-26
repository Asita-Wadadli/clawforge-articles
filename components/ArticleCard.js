export default function ArticleCard({ article }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'ClawInvoice Pro': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Instant Quote Engine Pro': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'ClawForge Suite': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      'ClawCast AI Avatar Pack': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <a 
      href={`/article/${article.slug}/`}
      className="group flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200"
    >
      {/* Date Column */}
      <div className="flex-shrink-0 text-center w-14">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short' })}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {new Date(article.publishedAt).getDate()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {article.readTime} min read
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mt-0.5">
          {article.excerpt}
        </p>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 self-center text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}