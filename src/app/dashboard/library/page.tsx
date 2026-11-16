"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Trash2,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Hash,
  Video,
  Lightbulb,
} from "lucide-react";

export interface SavedPost {
  id: string;
  mode: "captions" | "hashtags" | "ideas" | "reels" | "caption";
  topic: string;
  tone: string;
  content: string;
  createdAt: string;
}

const modeConfig: Record<string, { label: string; jp: string; icon: typeof MessageSquare }> = {
  captions: { label: "Captions", jp: "文", icon: MessageSquare },
  caption: { label: "Captions", jp: "文", icon: MessageSquare },
  hashtags: { label: "Hashtags", jp: "標", icon: Hash },
  reels: { label: "Reel Script", jp: "影", icon: Video },
  ideas: { label: "Post Concepts", jp: "想", icon: Lightbulb },
};

export default function LibraryPage() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("socialpilot_saved_posts");
      if (stored) {
        setPosts(JSON.parse(stored));
      }
    } catch {
      // Storage fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    try {
      localStorage.setItem("socialpilot_saved_posts", JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const query = search.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const normMode = post.mode === "caption" ? "captions" : post.mode;
    const matchesFilter = selectedFilter === "all" || normMode === selectedFilter;
    const matchesSearch =
      !query ||
      (post.topic || "").toLowerCase().includes(query) ||
      (post.content || "").toLowerCase().includes(query) ||
      (post.tone || "").toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Kage Section Header */}
      <div className="kage-sec-head">
        <span className="k"><b>05</b> — The Archives & Vault</span>
        <span className="kage-rule" />
        <span className="k kage-jp">蔵</span>
      </div>

      {/* Header Info & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="kage-eyebrow">
            <span className="dot" />
            <span>Curated Repository</span>
          </span>
          <h2 className="kage-display text-lg tracking-wider text-bone mt-1">
            Archived Dispatches
          </h2>
        </div>

        <div className="text-[10px] tracking-[0.2em] uppercase text-muted px-3 py-1.5 border border-line-soft">
          {posts.length} {posts.length === 1 ? "Dispatch" : "Dispatches"} In Vault
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vault by topic, keyword, or tone..."
            className="w-full pl-10 pr-4 py-2.5 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors rounded-none font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-ink border border-line-soft px-3 py-2">
            <Filter className="w-3.5 h-3.5 text-muted" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-transparent text-xs text-bone focus:outline-none cursor-pointer uppercase tracking-wider text-[10px]"
            >
              <option value="all" className="bg-ink-2 text-bone">All Chambers</option>
              <option value="captions" className="bg-ink-2 text-bone">Captions (文)</option>
              <option value="hashtags" className="bg-ink-2 text-bone">Hashtags (標)</option>
              <option value="reels" className="bg-ink-2 text-bone">Reel Scripts (影)</option>
              <option value="ideas" className="bg-ink-2 text-bone">Post Concepts (想)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid or Kage Empty State */}
      {!isLoaded ? (
        <div className="p-12 text-center text-xs text-muted font-light">
          Accessing archives...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="kage-card border border-line-soft p-12 flex flex-col items-center justify-center text-center">
          <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 text-muted/30 mb-4">
            <circle cx="22" cy="25" r="8.6" stroke="#dfe7e0" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1" strokeDasharray="2 2" />
          </svg>

          <h3 className="kage-display text-base tracking-wider text-bone">
            The Vault is Empty
          </h3>
          <p className="text-xs font-light text-bone-dim max-w-sm mt-2 mb-8 leading-relaxed">
            {posts.length === 0
              ? "No dispatches have been archived yet. Generate and save content from Neural Synthesis to build your collection."
              : "No dispatches match your query or chamber filter."}
          </p>

          <Link
            href="/dashboard/generator"
            className="kage-cta kage-cta--vermilion text-[10px] tracking-[0.22em] uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-vermilion" />
            <span>Open Neural Synthesis</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const normMode = post.mode === "caption" ? "captions" : post.mode;
            const config = modeConfig[normMode] || modeConfig.captions;
            const Icon = config.icon;

            return (
              <div
                key={post.id}
                className="kage-card border border-line-soft p-6 flex flex-col justify-between hover:border-line transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="kage-eyebrow">
                        <span className="dot" />
                        <span>{config.label}</span>
                      </span>
                      <span className="kage-jp text-xs text-muted">
                        ({config.jp})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-line-soft text-muted">
                        {post.tone}
                      </span>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1 text-muted hover:text-vermilion transition-colors"
                        title="Delete from Vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="kage-display text-sm tracking-wide text-bone mb-3">
                    {post.topic}
                  </h4>

                  <div className="max-h-56 overflow-y-auto text-xs text-bone-dim bg-ink border border-line-soft p-4 whitespace-pre-wrap leading-relaxed font-sans select-text">
                    {post.content}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-line-soft flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-muted">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleCopy(post.id, post.content)}
                    className="kage-cta py-1 px-3 text-[9px] tracking-[0.2em] uppercase"
                  >
                    {copiedId === post.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
