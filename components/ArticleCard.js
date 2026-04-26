export default function ArticleCard({ article }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image */}
      <a href={`/article/${article.slug}/`} className="block relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
          {article.heroImage ? (
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        {article.category && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
            {article.category}
          </span>
        )}
      </a>

      {/* Content */}
      <div className="p-6">
        <a href={`/article/${article.slug}/`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>
        </a>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {article.author?.avatar ? (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {article.author?.name?.charAt(0) || 'A'}
              </div>
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {article.author?.name || 'Anonymous'}
            </span>
          </div>
          <time className="text-gray-500 dark:text-gray-500" dateTime={article.publishedAt}>
            {formattedDate}
          </time>
        </div>

        {article.readTime && (
          <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime} min read
          </div>
        )}
      </div>
    </article>
  );
}