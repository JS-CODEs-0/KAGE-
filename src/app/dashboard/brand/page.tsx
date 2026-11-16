"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Save,
  Check,
  Building2,
  Users,
  Radio,
  Share2,
  Sliders,
} from "lucide-react";

export interface BrandProfile {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  brandTone: string;
  preferredPlatform: string;
}

const defaultProfile: BrandProfile = {
  businessName: "",
  businessDescription: "",
  industry: "",
  targetAudience: "",
  brandTone: "Viral & Punchy",
  preferredPlatform: "Instagram",
};

const toneOptions = [
  "Viral & Punchy",
  "Professional & Authoritative",
  "Casual & Relatable",
  "Inspirational & Bold",
  "Educational & Actionable",
  "Humorous & Witty",
];

const platformOptions = [
  "Instagram",
  "X (Twitter)",
  "LinkedIn",
  "TikTok",
  "YouTube Shorts",
  "Threads",
];

const industryOptions = [
  "Technology & Software / SaaS",
  "E-Commerce & DTC Retail",
  "Creator & Personal Brand",
  "Design & Creative Agency",
  "Marketing & Advertising",
  "Finance, Fintech & Crypto",
  "Health, Fitness & Wellness",
  "Education & Coaching",
  "Other",
];

export default function BrandPage() {
  const [profile, setProfile] = useState<BrandProfile>(defaultProfile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("socialpilot_brand_profile");
      if (stored) {
        setProfile({ ...defaultProfile, ...JSON.parse(stored) });
      }
    } catch {
      // Storage fallback
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("socialpilot_brand_profile", JSON.stringify(profile));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      // Storage fallback
    }
  };

  const isConfigured = Boolean(profile.businessName.trim() || profile.industry.trim());

  return (
    <div className="space-y-8">
      {/* Kage Section Header */}
      <div className="kage-sec-head">
        <span className="k"><b>02</b> — Brand Identity Architecture</span>
        <span className="kage-rule" />
        <span className="k kage-jp">印</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Editable Form */}
        <div className="lg:col-span-8 space-y-6">
          <form
            onSubmit={handleSave}
            className="kage-card border border-line-soft p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-line-soft pb-4">
              <div>
                <span className="kage-eyebrow">
                  <span className="dot" />
                  <span>Foundational Conditioning</span>
                </span>
                <h3 className="kage-display text-base tracking-wider text-bone mt-1">
                  Core Brand Parameters
                </h3>
              </div>
              <span className="text-[9px] tracking-[0.24em] uppercase text-muted">
                Persistent Storage
              </span>
            </div>

            <div className="space-y-5">
              {/* Business Name */}
              <div>
                <label className="kage-eyebrow mb-2 block">
                  <Building2 className="w-3 h-3 text-vermilion" />
                  <span>Business / Brand Identifier <strong className="text-vermilion">*</strong></span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  placeholder="e.g. Kage Studios"
                  className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors rounded-none"
                />
              </div>

              {/* Business Description */}
              <div>
                <label className="kage-eyebrow mb-2 block">
                  <span>Description & Value Proposition</span>
                </label>
                <textarea
                  rows={3}
                  value={profile.businessDescription}
                  onChange={(e) =>
                    setProfile({ ...profile, businessDescription: e.target.value })
                  }
                  placeholder="What is your brand's unique ethos, service, or offering to the market..."
                  className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors resize-none rounded-none leading-relaxed"
                />
              </div>

              {/* Industry & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="kage-eyebrow mb-2 block">
                    <Radio className="w-3 h-3 text-vermilion" />
                    <span>Industry / Sector</span>
                  </label>
                  <select
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone focus:outline-none focus:border-vermilion transition-colors rounded-none cursor-pointer"
                  >
                    <option value="" className="bg-ink-2 text-muted">
                      Select Sector...
                    </option>
                    {industryOptions.map((ind) => (
                      <option key={ind} value={ind} className="bg-ink-2 text-bone">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="kage-eyebrow mb-2 block">
                    <Share2 className="w-3 h-3 text-vermilion" />
                    <span>Primary Broadcast Platform</span>
                  </label>
                  <select
                    value={profile.preferredPlatform}
                    onChange={(e) =>
                      setProfile({ ...profile, preferredPlatform: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone focus:outline-none focus:border-vermilion transition-colors rounded-none cursor-pointer"
                  >
                    {platformOptions.map((plat) => (
                      <option key={plat} value={plat} className="bg-ink-2 text-bone">
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Audience & Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="kage-eyebrow mb-2 block">
                    <Users className="w-3 h-3 text-vermilion" />
                    <span>Target Demographics</span>
                  </label>
                  <input
                    type="text"
                    value={profile.targetAudience}
                    onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
                    placeholder="e.g. Senior Engineers, Creative Directors"
                    className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone placeholder:text-muted/40 focus:outline-none focus:border-vermilion transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="kage-eyebrow mb-2 block">
                    <Sliders className="w-3 h-3 text-vermilion" />
                    <span>Brand Cadence & Tone</span>
                  </label>
                  <select
                    value={profile.brandTone}
                    onChange={(e) => setProfile({ ...profile, brandTone: e.target.value })}
                    className="w-full px-4 py-3 bg-ink border border-line-soft text-xs text-bone focus:outline-none focus:border-vermilion transition-colors rounded-none cursor-pointer"
                  >
                    {toneOptions.map((t) => (
                      <option key={t} value={t} className="bg-ink-2 text-bone">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button Action */}
            <div className="pt-4 border-t border-line-soft flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
                Applied automatically to Nemotron dispatches
              </span>

              <button
                type="submit"
                className="kage-cta kage-cta--vermilion text-[10px] tracking-[0.22em] uppercase"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Blueprint Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right 4 Cols: Live Blueprint & Voice Pillars */}
        <div className="lg:col-span-4 space-y-6">
          {/* Blueprint Card */}
          <div className="kage-card border border-line-soft p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="kage-eyebrow">
                <span className="dot" />
                <span>Live Snapshot</span>
              </span>
              <span
                className={`text-[9px] tracking-[0.24em] uppercase px-2 py-0.5 border ${
                  isConfigured
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                    : "border-line-soft text-muted"
                }`}
              >
                {isConfigured ? "Active" : "Pending"}
              </span>
            </div>

            <h4 className="kage-display text-sm tracking-wider text-bone">
              Active Parameters
            </h4>

            <div className="space-y-2 text-xs font-light">
              <div className="p-2.5 border-b border-line-soft flex justify-between">
                <span className="text-muted uppercase text-[10px] tracking-wider">Brand</span>
                <span className="text-bone font-medium">{profile.businessName || "—"}</span>
              </div>
              <div className="p-2.5 border-b border-line-soft flex justify-between">
                <span className="text-muted uppercase text-[10px] tracking-wider">Sector</span>
                <span className="text-bone font-medium">{profile.industry || "General"}</span>
              </div>
              <div className="p-2.5 border-b border-line-soft flex justify-between">
                <span className="text-muted uppercase text-[10px] tracking-wider">Tone</span>
                <span className="text-vermilion font-medium">{profile.brandTone}</span>
              </div>
              <div className="p-2.5 flex justify-between">
                <span className="text-muted uppercase text-[10px] tracking-wider">Platform</span>
                <span className="text-bone font-medium">{profile.preferredPlatform}</span>
              </div>
            </div>
          </div>

          {/* Pillars Card */}
          <div className="kage-card border border-line-soft p-6 space-y-4">
            <h4 className="kage-display text-sm tracking-wider text-bone flex items-center justify-between">
              <span>Voice Pillars</span>
              <span className="kage-jp text-xs text-muted">柱</span>
            </h4>

            <div className="space-y-3 pt-1 text-xs font-light">
              <div className="p-3 border border-line-soft bg-ink/60">
                <span className="text-[10px] tracking-[0.2em] uppercase text-vermilion block mb-1">
                  01 · Strategic Hook
                </span>
                <p className="text-bone-dim text-[11px] leading-relaxed">
                  Command attention in the first 1.5 seconds. Eliminate rhetorical questions and filler.
                </p>
              </div>

              <div className="p-3 border border-line-soft bg-ink/60">
                <span className="text-[10px] tracking-[0.2em] uppercase text-vermilion block mb-1">
                  02 · Density Over Noise
                </span>
                <p className="text-bone-dim text-[11px] leading-relaxed">
                  Every sentence must deliver high insight density tailored to the target audience.
                </p>
              </div>

              <div className="p-3 border border-line-soft bg-ink/60">
                <span className="text-[10px] tracking-[0.2em] uppercase text-vermilion block mb-1">
                  03 · Deliberate Intent
                </span>
                <p className="text-bone-dim text-[11px] leading-relaxed">
                  Clear, decisive next steps without desperate engagement baiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
