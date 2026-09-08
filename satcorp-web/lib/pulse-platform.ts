/**
 * THE PULSE PLATFORM   what PULSE is, structured.
 *
 * Single source of truth for the platform specification. `/pulse` renders its
 * pillars, creator surfaces and roadmap from here; `/pulse/specification`
 * (Track A phase 2) renders the full spec from the same module; the KYRAX
 * registry seam (`registry-index.ts`, Track A phase 4) derives a `platform`
 * entry kind from it. Nothing here is a second copy of anything   if a
 * section needs a field this module does not carry, the field is added here,
 * never written straight into a page.
 *
 * The doctrine this data exists to serve is
 * `../../Next Builds/PULSE/PULSE-BUILD-PLAN.md`, in particular §7: every
 * state below has to correspond to something that is actually true. A pillar,
 * a roadmap slot or a module that is not real yet carries that fact as data
 * (`later: true`, a `RoadmapState` other than `"in-development"`) rather than
 * as a hope encoded in copy.
 */

/* ============================================================
   PILLARS   §II, "What PULSE Is"
   ============================================================ */

export type PillarId =
  | "identity"
  | "community"
  | "creator"
  | "distribution"
  | "intelligence";

export interface Pillar {
  id: PillarId;
  name: string;
  line: string;
  /** Not yet real. Plan §7.3   named and deferred, never demonstrated. */
  later?: boolean;
}

export const PILLARS: Pillar[] = [
  {
    id: "identity",
    name: "Identity",
    line: "One account. One identity. Multiple experiences.",
  },
  {
    id: "community",
    name: "Community",
    line: "A structure, not a channel list.",
  },
  {
    id: "creator",
    name: "Creator",
    line: "A studio, a store and an audience under one roof.",
  },
  {
    id: "distribution",
    name: "Distribution",
    line: "A page that is a presence, not a list of links.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    line: "KYRAX, reading the room back to you.",
    later: true,
  },
];

/* ============================================================
   IDENTITY   §IV, "PULSE ID"   built now, rendered from A2
   ============================================================ */

export type IdentityLevelId =
  | "member"
  | "creator"
  | "community"
  | "organization"
  | "developer"
  | "business"
  | "official";

export interface IdentityLevel {
  id: IdentityLevelId;
  name: string;
}

export const IDENTITY_LEVELS: IdentityLevel[] = [
  { id: "member", name: "Member" },
  { id: "creator", name: "Creator" },
  { id: "community", name: "Community" },
  { id: "organization", name: "Organization" },
  { id: "developer", name: "Developer" },
  { id: "business", name: "Business" },
  { id: "official", name: "Official" },
];

export interface VerificationClass {
  id: string;
  name: string;
  line: string;
}

export const VERIFICATION: VerificationClass[] = [
  { id: "pulse", name: "Pulse Verified", line: "Identity, confirmed." },
  { id: "creator", name: "Creator Verified", line: "An established creator." },
  {
    id: "organization",
    name: "Organization Verified",
    line: "A business or an organization.",
  },
  { id: "official", name: "Official", line: "SATCORP-controlled." },
];

/* ============================================================
   SPACES   §V   built now, rendered from A2

   The five Community Fabric lines from the original page fold in here as
   module descriptions rather than surviving as their own section   see plan
   §4, "Community Fabric folds into V and VI."
   ============================================================ */

export type ModuleId =
  | "feed"
  | "chat"
  | "voice"
  | "events"
  | "announcements"
  | "media"
  | "forums"
  | "support"
  | "store"
  | "memberships"
  | "leaderboards"
  | "polls"
  | "applications"
  | "documentation";

export interface SpaceModule {
  id: ModuleId;
  name: string;
  line: string;
}

export const SPACE_MODULES: SpaceModule[] = [
  { id: "feed", name: "Feed", line: "What the room sees when it opens." },
  {
    id: "chat",
    name: "Chat",
    line: "The shortest path between someone making a thing and the people who want it.",
  },
  {
    id: "voice",
    name: "Voice",
    line: "For the conversations text was never going to carry.",
  },
  {
    id: "events",
    name: "Events",
    line: "From a community calendar through to the door policy.",
  },
  {
    id: "announcements",
    name: "Announcements",
    line: "The line everyone in the room is meant to read.",
  },
  {
    id: "media",
    name: "Media",
    line: "Watch-alongs, launches, and the nights in between.",
  },
  {
    id: "forums",
    name: "Forums",
    line: "Threaded, moderated, and archived rather than lost.",
  },
  { id: "support", name: "Support", line: "A door that is actually staffed." },
  { id: "store", name: "Store", line: "Sell without leaving the room you built." },
  {
    id: "memberships",
    name: "Memberships",
    line: "Tiers the creator sets, not the platform.",
  },
  { id: "leaderboards", name: "Leaderboards", line: "Standing, kept in view." },
  { id: "polls", name: "Polls", line: "Ask the room before you build for it." },
  { id: "applications", name: "Applications", line: "A gate, for rooms that need one." },
  { id: "documentation", name: "Documentation", line: "The rules, written down once." },
];

export type SpaceKindId = "creator" | "community" | "business" | "game";

export interface SpaceKind {
  id: SpaceKindId;
  name: string;
  line: string;
  modules: ModuleId[];
}

export const SPACE_KINDS: SpaceKind[] = [
  {
    id: "creator",
    name: "Creator",
    line: "A studio, a store and an audience under one roof.",
    modules: ["feed", "chat", "media", "memberships", "store", "events", "polls"],
  },
  {
    id: "community",
    name: "Community",
    line: "The room your people go to when the broadcast ends.",
    modules: [
      "feed",
      "chat",
      "voice",
      "forums",
      "events",
      "leaderboards",
      "applications",
    ],
  },
  {
    id: "business",
    name: "Business",
    line: "Customers, employees and community in one place.",
    modules: [
      "announcements",
      "support",
      "store",
      "events",
      "documentation",
      "applications",
    ],
  },
  {
    id: "game",
    name: "Game",
    line: "The world's social layer, standing outside it.",
    modules: ["feed", "chat", "voice", "events", "leaderboards", "media", "forums"],
  },
];

/* ============================================================
   CREATOR HUB   §VI, rewrite of Creator Network
   ============================================================ */

export interface CreatorSurface {
  name: string;
  line: string;
}

export const CREATOR_SURFACES: CreatorSurface[] = [
  {
    name: "Content",
    line: "What your audience sees when they are not looking for you.",
  },
  {
    name: "Audience",
    line: "One identity that travels with you across the network.",
  },
  {
    name: "Memberships",
    line: "Tiers you set. Nothing paywalled that should not be.",
  },
  { name: "Products", line: "Sell without leaving the room you built." },
  { name: "Events", line: "Scheduled, promoted, and run end to end." },
  { name: "Analytics", line: "The room, read back to you." },
  { name: "Payouts", line: "What you are owed, and when it lands." },
];

/* ============================================================
   TRANSMISSION SCHEDULE   §VII, rewrite of Live Experiences

   Every state here is a claim. `tone="live"` is never worn by a roadmap
   row   nothing on this page is `LIVE` until something is. Plan §7.1.
   ============================================================ */

export type RoadmapState = "in-development" | "queued" | "planned" | "later";

export interface RoadmapPhase {
  slot: string;
  name: string;
  note: string;
  state: RoadmapState;
}

export const ROADMAP: RoadmapPhase[] = [
  {
    slot: "01",
    name: "PULSE Core",
    note: "Identity, profiles, follow, feed, posts, notifications.",
    state: "in-development",
  },
  {
    slot: "02",
    name: "Community",
    note: "Chat, voice, threads, events, roles, moderation.",
    state: "queued",
  },
  {
    slot: "03",
    name: "Creator",
    note: "Memberships, paid content, products, payouts.",
    state: "queued",
  },
  {
    slot: "04",
    name: "Distribution",
    note: "PULSE pages, custom domains, business pages.",
    state: "planned",
  },
  {
    slot: "05",
    name: "Ecosystem",
    note: "Continue with PULSE   across Ki-Ra and NAMTAR.",
    state: "planned",
  },
  {
    slot: "06",
    name: "Intelligence",
    note: "KYRAX audience and community analytics.",
    state: "later",
  },
];

/** Display label for a roadmap state. The stamp reads this, never a literal. */
export const ROADMAP_STAMP: Record<RoadmapState, string> = {
  "in-development": "IN DEVELOPMENT",
  queued: "QUEUED",
  planned: "PLANNED",
  later: "LATER PHASE",
};

/* ============================================================
   THE DOCTRINE   §IX   built now, ships only once plan §7.4 is resolved
   ============================================================ */

export const DOCTRINE = {
  claim: "You pay for the platform. Not with your privacy.",
  body: "No advertising. No behavioural tracking. No sale of personal information.",
  footer:
    "That is not a feature we added. It is the only way we were willing to build it.",
};
