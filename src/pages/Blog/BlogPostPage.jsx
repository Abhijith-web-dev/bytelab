import React, { Suspense, lazy } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Clock, Calendar, User, ArrowRight, Share2, Tag, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { blogService } from '../../services/blog/blogService.js';
import { Badge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useSEO } from '../../hooks/useSEO.js';
import { toast } from 'sonner';

const MarkdownRenderer = lazy(() =>
  import('../../components/lesson/MarkdownRenderer.jsx').then(m => ({ default: m.MarkdownRenderer }))
);

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogService.getPostBySlug(slug);

  useSEO({
    title: post ? `${post.title} | ByteLab Developer Blog` : 'Article Not Found',
    description: post ? post.excerpt : 'Engineering post on ByteLab Core.'
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const allPosts = blogService.getAllPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SubNav Bar for Blog Navigation */}
      <div className="sticky top-[58px] z-30 w-full h-[52px] bg-white/95 backdrop-blur-md border-b border-[#d9d9dd] select-none">
        <div className="max-w-[1280px] h-full mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#75758a] hover:text-[#17171c] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Developer Posts</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d9d9dd] hover:border-[#17171c] text-[12px] font-medium text-[#17171c] transition-all cursor-pointer bg-white"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Header */}
      <header className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            <span className="font-mono text-[#ff7759] font-semibold bg-[#ff7759]/10 px-3 py-0.5 rounded-full border border-[#ff7759]/30 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-[#75758a]">•</span>
            <span className="text-[#75758a] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-[#75758a]">•</span>
            <span className="text-[#75758a]">{post.publishedAt}</span>
          </div>

          <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-semibold text-[#000000] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-[17px] sm:text-[19px] text-[#525252] leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Author Card */}
          <div className="pt-6 border-t border-[#e5e5e5] flex items-center justify-between">
            <a
              href={post.author.portfolio || 'https://abhijith-dev-io.web.app/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group/author"
            >
              <div className="w-10 h-10 rounded-full bg-[#17171c] text-white flex items-center justify-center font-mono text-[13px] font-bold shadow-xs group-hover/author:ring-2 ring-[#17171c] transition-all">
                {post.author.avatar}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#17171c] group-hover/author:underline flex items-center gap-1.5">
                  <span>{post.author.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#75758a]" />
                </div>
                <div className="text-[12px] text-[#75758a]">{post.author.role}</div>
              </div>
            </a>

            <div className="flex flex-wrap gap-1.5 hidden sm:flex">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-[#d9d9dd] text-[#525252]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <main className="max-w-3xl mx-auto w-full px-4 md:px-8 py-12 sm:py-16 space-y-12">
        <article className="prose-bytelab">
          <Suspense fallback={<div className="py-20 text-center text-[#75758a]">Loading article contents...</div>}>
            <MarkdownRenderer content={post.content} />
          </Suspense>
        </article>

        {/* Tags Footer */}
        <div className="pt-8 border-t border-[#d9d9dd] space-y-3">
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#75758a] block font-semibold">
            Article Topics & Tags
          </span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[12px] font-mono px-3 py-1 rounded-full bg-[#fafafa] border border-[#d9d9dd] text-[#212121]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-[20px] bg-[#eeece7]/40 border border-[#d9d9dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <a
              href={post.author.portfolio || 'https://abhijith-dev-io.web.app/'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#17171c] text-white flex items-center justify-center font-mono text-[16px] font-bold shrink-0 shadow-xs hover:scale-105 transition-transform"
            >
              {post.author.avatar}
            </a>
            <div className="space-y-1">
              <h4 className="text-[15px] font-semibold text-[#17171c] flex items-center gap-1.5">
                <span>Written by</span>
                <a
                  href={post.author.portfolio || 'https://abhijith-dev-io.web.app/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#17171c] underline font-bold hover:text-[#ff7759] inline-flex items-center gap-1"
                >
                  {post.author.name}
                  <ExternalLink className="w-3.5 h-3.5 text-[#75758a]" />
                </a>
              </h4>
              <p className="text-[13px] text-[#525252] leading-relaxed max-w-xl">
                Founder & Systems Architect building ByteLab. Researching zero-backend WebAssembly runtimes, low-level compilation pipelines, and interactive systems pedagogy.
              </p>
            </div>
          </div>

          <a
            href={post.author.portfolio || 'https://abhijith-dev-io.web.app/'}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="secondary" size="sm" className="text-[12px] py-1.5 px-3">
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </a>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-[#d9d9dd] space-y-6">
            <h3 className="text-[18px] font-semibold text-[#17171c] tracking-tight">
              More from ByteLab Developers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="p-5 rounded-[16px] bg-white border border-[#d9d9dd] hover:border-[#17171c] transition-all flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-[#ff7759] font-medium">
                      {rel.category}
                    </span>
                    <h5 className="text-[14px] font-semibold text-[#17171c] group-hover:underline leading-snug line-clamp-2">
                      {rel.title}
                    </h5>
                  </div>
                  <span className="text-[12px] font-medium text-[#17171c] flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
