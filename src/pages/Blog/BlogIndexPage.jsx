import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Clock, User, Sparkles, Tag, ChevronRight, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { blogService } from '../../services/blog/blogService.js';
import { Badge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useSEO } from '../../hooks/useSEO.js';

export function BlogIndexPage() {
  useSEO({
    title: 'Engineering & Systems Blog | ByteLab Developer Notes',
    description: 'Technical insights, systems architecture, WebAssembly benchmarks, and computer science pedagogy written by the ByteLab engineering team.'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = blogService.getCategories();
  
  let posts = selectedCategory === 'All'
    ? blogService.getAllPosts()
    : blogService.getPostsByCategory(selectedCategory);

  if (searchQuery.trim()) {
    posts = blogService.searchPosts(searchQuery);
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white select-none">
      {/* Editorial Header Section */}
      <section className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-14 sm:py-20 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[12px] font-mono uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>ENGINEERING & SYSTEMS RESEARCH</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="display-hero text-[34px] sm:text-[46px] lg:text-[56px] text-[#000000] font-semibold tracking-tight leading-[1.08]">
              Notes from the developers building ByteLab.
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#75758a] leading-relaxed">
              Deep dives into WebAssembly runtimes, low-level memory tracing, bundle budgets, and modern computer science education.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 touch-scroll">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#17171c] text-white shadow-xs'
                      : 'bg-white text-[#525252] border border-[#d9d9dd] hover:border-[#17171c] hover:text-[#17171c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-[300px]">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#93939f]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search developer posts..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-[13px] border border-[#d9d9dd] bg-white text-[#212121] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-12 sm:py-16 space-y-12">
        {posts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#93939f] mx-auto" />
            <h3 className="text-[18px] font-semibold text-[#17171c]">No articles found</h3>
            <p className="text-[14px] text-[#75758a]">Try searching for different keywords or select "All" categories.</p>
            <Button variant="secondary" size="sm" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Post Hero Card */}
            {featuredPost && (
              <div className="group">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="block p-6 sm:p-10 rounded-[22px] bg-white border border-[#d9d9dd] hover:border-[#17171c] transition-all duration-200 shadow-xs hover:shadow-md space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#ff7759] bg-[#ff7759]/10 border border-[#ff7759]/30 px-3 py-0.5 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-[12px] text-[#75758a]">
                        • Featured Technical Post
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#75758a]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{featuredPost.publishedAt}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-semibold text-[#000000] tracking-tight group-hover:underline leading-snug">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] text-[#525252] leading-relaxed max-w-4xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#17171c] text-white flex items-center justify-center font-mono text-[12px] font-bold">
                        {featuredPost.author.avatar}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#17171c]">{featuredPost.author.name}</div>
                        <div className="text-[11px] text-[#75758a]">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[13px] font-medium text-[#17171c] group-hover:translate-x-1 transition-transform">
                      <span>Read Full Deep Dive</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Grid of Other Articles */}
            {regularPosts.length > 0 && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between border-b border-[#d9d9dd] pb-3">
                  <h3 className="text-[13px] font-mono uppercase tracking-wider text-[#75758a] font-semibold">
                    Recent Developer Articles ({regularPosts.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="p-6 rounded-[18px] bg-white border border-[#d9d9dd] hover:border-[#17171c] transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-[#ff7759] font-semibold bg-[#ff7759]/10 px-2.5 py-0.5 rounded-full border border-[#ff7759]/20">
                            {post.category}
                          </span>
                          <span className="text-[#75758a]">{post.readTime}</span>
                        </div>

                        <h4 className="text-[18px] font-semibold text-[#000000] group-hover:underline leading-snug">
                          {post.title}
                        </h4>

                        <p className="text-[13px] text-[#525252] leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[12px] text-[#75758a]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#eeece7] text-[#17171c] flex items-center justify-center font-mono text-[10px] font-bold">
                            {post.author.avatar}
                          </div>
                          <span className="truncate max-w-[120px]">{post.author.name}</span>
                        </div>
                        <span className="group-hover:text-[#17171c] flex items-center gap-1 font-medium transition-colors">
                          <span>Read</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
