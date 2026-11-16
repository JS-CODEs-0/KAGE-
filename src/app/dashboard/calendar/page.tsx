"use client";

import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  X,
  Clock,
  Check,
} from "lucide-react";

export interface CalendarPost {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  createdAt: string;
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<CalendarPost | null>(null);

  // Form State
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postDate, setPostDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("socialpilot_calendar_posts");
      if (stored) {
        setPosts(JSON.parse(stored));
      }
    } catch {
      // Storage fallback
    }
  }, []);

  const saveToStorage = (updatedPosts: CalendarPost[]) => {
    setPosts(updatedPosts);
    try {
      localStorage.setItem("socialpilot_calendar_posts", JSON.stringify(updatedPosts));
    } catch {
      // Storage fallback
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openCreateModal = (defaultDate?: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setEditingPost(null);
    setPostTitle("");
    setPostContent("");
    setPostDate(defaultDate || todayStr);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: CalendarPost, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setPostDate(post.date);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      setFormError("Post title is required.");
      return;
    }
    if (!postDate) {
      setFormError("Scheduled date is required.");
      return;
    }
    if (!postContent.trim()) {
      setFormError("Post content is required.");
      return;
    }

    if (editingPost) {
      const updated = posts.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              title: postTitle.trim(),
              content: postContent.trim(),
              date: postDate,
            }
          : p
      );
      saveToStorage(updated);
    } else {
      const newPost: CalendarPost = {
        id: `cal_${Date.now()}`,
        title: postTitle.trim(),
        content: postContent.trim(),
        date: postDate,
        createdAt: new Date().toISOString(),
      };
      saveToStorage([newPost, ...posts]);
    }

    setIsModalOpen(false);
  };

  const handleDeletePost = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = posts.filter((p) => p.id !== id);
    saveToStorage(updated);
    if (editingPost?.id === id) {
      setIsModalOpen(false);
    }
  };

  // Calendar math
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: {
    dayNumber: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isToday: boolean;
  }[] = [];

  const todayStr = new Date().toISOString().split("T")[0];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = totalDaysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, day);
    const dateStr = prevMonthDate.toISOString().split("T")[0];
    calendarDays.push({
      dayNumber: day,
      dateStr,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
    });
  }

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const curDate = new Date(year, month, d);
    const yyyy = curDate.getFullYear();
    const mm = String(curDate.getMonth() + 1).padStart(2, "0");
    const dd = String(curDate.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
    });
  }

  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextMonthDate = new Date(year, month + 1, d);
    const yyyy = nextMonthDate.getFullYear();
    const mm = String(nextMonthDate.getMonth() + 1).padStart(2, "0");
    const dd = String(nextMonthDate.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
    });
  }

  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const visibleMonthPostsCount = posts.filter((p) => p.date.startsWith(monthPrefix)).length;

  return (
    <div className="space-y-8">
      {/* Kage Section Header */}
      <div className="kage-sec-head">
        <span className="k"><b>04</b> — Temporal Grid & Rhythm</span>
        <span className="kage-rule" />
        <span className="k kage-jp">暦</span>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="kage-eyebrow">
            <span className="dot" />
            <span>Broadcast Timeline</span>
          </span>
          <h2 className="kage-display text-lg tracking-wider text-bone mt-1">
            Publication Schedule
          </h2>
        </div>

        <button
          onClick={() => openCreateModal()}
          className="kage-cta kage-cta--vermilion text-[10px] tracking-[0.22em] uppercase py-2 px-4"
        >
          <Plus className="w-3.5 h-3.5 text-vermilion" />
          <span>Schedule Dispatch</span>
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="kage-card border border-line-soft">
        {/* Navigation Toolbar */}
        <div className="p-5 border-b border-line-soft flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="kage-display text-base tracking-widest text-bone">
              {monthNames[month]} {year}
            </h3>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted px-2.5 py-0.5 border border-line-soft">
              {visibleMonthPostsCount} Dispatches
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToday}
              className="kage-cta py-1.5 px-3 text-[9px] tracking-[0.2em] uppercase"
            >
              Today
            </button>
            <div className="flex items-center border border-line-soft">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-line-soft text-muted hover:text-bone transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-line-soft" />
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-line-soft text-muted hover:text-bone transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-line-soft text-center text-[10px] font-medium tracking-[0.22em] uppercase text-muted bg-ink/70">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-3 border-r border-line-soft last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7 bg-ink/30">
          {calendarDays.map((cell, idx) => {
            const dayPosts = posts.filter((p) => p.date === cell.dateStr);

            return (
              <div
                key={idx}
                onClick={() => openCreateModal(cell.dateStr)}
                className={`group min-h-[95px] sm:min-h-[125px] p-2.5 border-r border-b border-line-soft last:border-r-0 transition-colors flex flex-col justify-between cursor-pointer ${
                  cell.isCurrentMonth
                    ? "bg-transparent hover:bg-line-soft/30"
                    : "bg-ink/60 text-muted/30 hover:bg-ink/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`inline-flex items-center justify-center text-xs tabular-nums w-6 h-6 rounded-full transition-colors ${
                      cell.isToday
                        ? "bg-vermilion text-white font-medium shadow-[0_0_10px_rgba(224,35,28,0.5)]"
                        : cell.isCurrentMonth
                        ? "text-bone font-light"
                        : "text-muted/40"
                    }`}
                  >
                    {cell.dayNumber}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCreateModal(cell.dateStr);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-muted hover:text-vermilion transition-opacity"
                    title={`Add to ${cell.dateStr}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Scheduled Posts */}
                <div className="flex-1 space-y-1 overflow-y-auto max-h-[75px]">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={(e) => openEditModal(post, e)}
                      className="group/item flex items-center justify-between gap-1 px-2 py-1 bg-ink border border-line-soft hover:border-vermilion/50 text-[11px] text-bone transition-all border-l-2 border-l-vermilion"
                      title={post.title}
                    >
                      <span className="truncate font-light text-[11px] flex-1">
                        {post.title}
                      </span>
                      <button
                        onClick={(e) => handleDeletePost(post.id, e)}
                        className="opacity-0 group-hover/item:opacity-100 text-muted hover:text-vermilion transition-opacity"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {dayPosts.length === 0 && (
                  <div className="hidden sm:block text-[10px] text-muted/10">&nbsp;</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Footnote */}
      <div className="p-4 border border-line-soft bg-ink/60 flex items-center gap-3 text-xs text-bone-dim">
        <Clock className="w-4 h-4 text-vermilion shrink-0" />
        <span className="font-light">
          Click any cell to schedule a dispatch for that date. All entries synchronize continuously with local storage.
        </span>
      </div>

      {/* Schedule / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md">
          <div
            className="w-full max-w-lg kage-card border border-line-soft p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kage-sec-head mb-0">
              <span className="k">
                <b>{editingPost ? "EDIT" : "SCHEDULE"}</b> — DISPATCH
              </span>
              <span className="kage-rule" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-muted hover:text-bone transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              {formError && (
                <div className="p-2.5 border border-vermilion/40 bg-vermilion/10 text-vermilion text-xs">
                  {formError}
                </div>
              )}

              <div>
                <label className="kage-eyebrow mb-2 block">
                  <span>Dispatch Title / Concept <strong className="text-vermilion">*</strong></span>
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Kyoto Night Walk Architecture"
                  className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors rounded-none"
                />
              </div>

              <div>
                <label className="kage-eyebrow mb-2 block">
                  <span>Release Date <strong className="text-vermilion">*</strong></span>
                </label>
                <input
                  type="date"
                  required
                  value={postDate}
                  onChange={(e) => setPostDate(e.target.value)}
                  className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone focus:outline-none focus:border-vermilion transition-colors rounded-none cursor-pointer"
                />
              </div>

              <div>
                <label className="kage-eyebrow mb-2 block">
                  <span>Dispatch Content / Script <strong className="text-vermilion">*</strong></span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Copy, script or caption..."
                  className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors resize-none rounded-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-line-soft flex items-center justify-between">
                <div>
                  {editingPost && (
                    <button
                      type="button"
                      onClick={() => handleDeletePost(editingPost.id)}
                      className="kage-cta py-1.5 px-3 text-[9px] tracking-[0.2em] uppercase text-vermilion hover:border-vermilion"
                    >
                      <Trash2 className="w-3 h-3 text-vermilion" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="kage-cta py-1.5 px-3 text-[9px] tracking-[0.2em] uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="kage-cta kage-cta--vermilion py-1.5 px-4 text-[9px] tracking-[0.22em] uppercase"
                  >
                    <Check className="w-3 h-3 text-vermilion" />
                    <span>{editingPost ? "Save Changes" : "Schedule"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
