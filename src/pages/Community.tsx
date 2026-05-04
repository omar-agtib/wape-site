import { useState, type ElementType } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MessageSquare,
  Newspaper,
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
  Briefcase,
  GraduationCap,
  Wrench,
  Building2,
  HelpCircle,
  Sparkles,
  Plus,
  TrendingUp,
  BookOpen,
  Hash,
  Image as ImageIcon,
  Globe,
  CheckCircle2,
} from "lucide-react";

type Profile = {
  id: string;
  name: string;
  initials: string;
  role: "Engineer" | "Researcher" | "Technician" | "Company";
  title: string;
  company: string;
};

type Post = {
  id: string;
  authorId: string;
  time: string;
  category: "Experience" | "Problem" | "Solution" | "Research";
  body: string;
  tags: string[];
  likes: number;
  liked: boolean;
  comments: { id: string; authorId: string; body: string; time: string }[];
};

type Question = {
  id: string;
  authorId: string;
  title: string;
  body: string;
  time: string;
  answers: number;
  votes: number;
};

const profiles: Record<string, Profile> = {
  u1: {
    id: "u1",
    name: "Yassine Amrani",
    initials: "YA",
    role: "Engineer",
    title: "Project Manager",
    company: "BatiPro Constructions",
  },
  u2: {
    id: "u2",
    name: "Dr. Leila Benali",
    initials: "LB",
    role: "Researcher",
    title: "PhD · Civil Engineering",
    company: "ENPC Paris",
  },
  u3: {
    id: "u3",
    name: "Karim Saidi",
    initials: "KS",
    role: "Technician",
    title: "Site Supervisor",
    company: "GTM Bâtiment",
  },
  u4: {
    id: "u4",
    name: "Constructora Iberia",
    initials: "CI",
    role: "Company",
    title: "General Contractor · 1,200 employees",
    company: "Madrid, Spain",
  },
  u5: {
    id: "u5",
    name: "Nora Mansouri",
    initials: "NM",
    role: "Engineer",
    title: "QHSE Lead",
    company: "Vinci Construction",
  },
};

const initialPosts: Post[] = [
  {
    id: "p1",
    authorId: "u1",
    time: "2h",
    category: "Experience",
    body: "We just closed a 14-month residential project 6% under budget. Game changer was switching from weekly Excel reports to daily mobile updates from the field. Our forecast at completion was finally trustable. Happy to share the playbook if anyone is interested 👷‍♂️",
    tags: ["projectmanagement", "costcontrol", "mobile"],
    likes: 47,
    liked: false,
    comments: [
      {
        id: "c1",
        authorId: "u3",
        body: "Would love the playbook — same struggle here.",
        time: "1h",
      },
      {
        id: "c2",
        authorId: "u5",
        body: "Curious how you handled the change management side.",
        time: "45m",
      },
    ],
  },
  {
    id: "p2",
    authorId: "u2",
    time: "6h",
    category: "Research",
    body: "Just published a paper on the impact of digital NCR workflows on rework rates in large infrastructure projects. Sample of 32 sites across Europe. Spoiler: average rework cost dropped 18% within the first year of digitization. Open access link in comments.",
    tags: ["research", "qhse", "ncr"],
    likes: 112,
    liked: false,
    comments: [
      {
        id: "c3",
        authorId: "u1",
        body: "This is gold. Sharing internally with our QHSE team.",
        time: "5h",
      },
    ],
  },
  {
    id: "p3",
    authorId: "u3",
    time: "1d",
    category: "Problem",
    body: "Looking for advice. We have 4 subcontractors on a high-rise project, each with their own way of reporting daily progress. Tried 3 different tools, none stuck. How are you handling subcontractor onboarding on digital platforms?",
    tags: ["subcontractors", "onboarding", "field"],
    likes: 23,
    liked: false,
    comments: [],
  },
  {
    id: "p4",
    authorId: "u4",
    time: "2d",
    category: "Solution",
    body: "After 8 months on WAPE across 11 active sites, our project directors finally have one screen with the truth. Reporting time down 40%, NCRs closed 2x faster. Proud of the team that pushed this transformation through. 🚀",
    tags: ["transformation", "kpi", "casestudy"],
    likes: 188,
    liked: false,
    comments: [
      {
        id: "c4",
        authorId: "u2",
        body: "Would love to discuss methodology for a research case.",
        time: "1d",
      },
    ],
  },
];

const initialQuestions: Question[] = [
  {
    id: "q1",
    authorId: "u3",
    title:
      "Best practices to digitize daily site reports without resistance from foremen?",
    body: "Old-school crews, tablets seen as 'extra paperwork'. What worked for you?",
    time: "3h",
    answers: 7,
    votes: 14,
  },
  {
    id: "q2",
    authorId: "u5",
    title: "How do you measure ROI of a QHSE digital platform after year 1?",
    body: "Looking for KPIs beyond the obvious 'reduced NCRs'.",
    time: "1d",
    answers: 12,
    votes: 28,
  },
  {
    id: "q3",
    authorId: "u1",
    title:
      "Integrating a planning tool with cost control — push or pull model?",
    body: "Same data model or APIs? Real-world experience welcome.",
    time: "2d",
    answers: 5,
    votes: 9,
  },
];

const trendingTags = [
  "#fieldops",
  "#qhse",
  "#planning",
  "#costcontrol",
  "#mobile",
  "#research",
  "#ncr",
  "#sustainability",
];

const roleIcon: Record<Profile["role"], ElementType> = {
  Engineer: Briefcase,
  Researcher: GraduationCap,
  Technician: Wrench,
  Company: Building2,
};

const categoryColor: Record<Post["category"], string> = {
  Experience: "bg-sky/10 text-sky",
  Problem: "bg-destructive/10 text-destructive",
  Solution: "bg-emerald-500/10 text-emerald-700",
  Research: "bg-accent/10 text-accent",
};

const Avatar = ({
  profile,
  size = 44,
}: {
  profile: Profile;
  size?: number;
}) => (
  <div
    className="rounded-full bg-accent-gradient flex items-center justify-center shrink-0 shadow-orange"
    style={{ width: size, height: size }}
  >
    <span
      className="text-accent-foreground font-display font-bold"
      style={{ fontSize: size * 0.38 }}
    >
      {profile.initials}
    </span>
  </div>
);

const Community = () => {
  const [tab, setTab] = useState<"feed" | "qa" | "people">("feed");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [questions] = useState<Question[]>(initialQuestions);
  const [composer, setComposer] = useState("");
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const me = profiles.u1;

  const toggleLike = (id: string) => {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p,
      ),
    );
  };

  const addComment = (id: string) => {
    const body = (commentDraft[id] || "").trim();
    if (!body) return;
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c-${Date.now()}`, authorId: me.id, body, time: "now" },
              ],
            }
          : p,
      ),
    );
    setCommentDraft((d) => ({ ...d, [id]: "" }));
  };

  const submitPost = () => {
    const body = composer.trim();
    if (!body) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      authorId: me.id,
      time: "now",
      category: "Experience",
      body,
      tags: [],
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts((ps) => [newPost, ...ps]);
    setComposer("");
  };

  return (
    <>
      {/* Hero band */}
      <section className="relative bg-hero pt-28 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} /> Community Hub · Preview
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
                The construction professionals' hub
              </h1>
              <p className="text-primary-foreground/75 text-lg max-w-2xl">
                A LinkedIn-style space for engineers, researchers, technicians
                and companies to share field experience, ask questions and build
                the future of construction together.
              </p>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
              <div className="flex -space-x-2">
                {Object.values(profiles)
                  .slice(0, 4)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="ring-2 ring-deep-blue rounded-full"
                    >
                      <Avatar profile={p} size={32} />
                    </div>
                  ))}
              </div>
              <div>
                <div className="font-semibold text-primary-foreground">
                  12,400+ members
                </div>
                <div className="text-xs">
                  Engineers · Researchers · Technicians · Companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 lg:top-20 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-1 overflow-x-auto">
          {[
            { id: "feed" as const, label: "Feed", icon: Newspaper },
            {
              id: "qa" as const,
              label: "Questions & Answers",
              icon: HelpCircle,
            },
            { id: "people" as const, label: "People & Companies", icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                tab === t.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left rail — profile */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="h-16 bg-hero" />
              <div className="px-5 pb-5 -mt-8">
                <Avatar profile={me} size={64} />
                <h3 className="font-display font-semibold text-foreground mt-3">
                  {me.name}
                </h3>
                <p className="text-xs text-muted-foreground">{me.title}</p>
                <p className="text-xs text-muted-foreground">{me.company}</p>
                <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile views</span>
                    <span className="font-semibold text-accent">128</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Post impressions
                    </span>
                    <span className="font-semibold text-accent">2.3k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-semibold text-accent">486</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Hash size={12} /> Trending tags
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground hover:bg-accent/10 hover:text-accent cursor-pointer transition"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Center — main */}
          <main className="lg:col-span-6 space-y-5">
            {tab === "feed" && (
              <>
                {/* Composer */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                  <div className="flex gap-3">
                    <Avatar profile={me} />
                    <div className="flex-1">
                      <textarea
                        value={composer}
                        onChange={(e) => setComposer(e.target.value)}
                        placeholder="Share an experience, a problem from the field, or a solution that worked…"
                        className="w-full resize-none border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 bg-background"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <button className="inline-flex items-center gap-1.5 text-xs hover:text-accent transition">
                            <ImageIcon size={15} /> Photo
                          </button>
                          <button className="inline-flex items-center gap-1.5 text-xs hover:text-accent transition">
                            <BookOpen size={15} /> Article
                          </button>
                          <button className="inline-flex items-center gap-1.5 text-xs hover:text-accent transition">
                            <Hash size={15} /> Tag
                          </button>
                        </div>
                        <button
                          onClick={submitPost}
                          disabled={!composer.trim()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-orange hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={14} /> Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts */}
                {posts.map((p) => {
                  const author = profiles[p.authorId];
                  const RoleIcon = roleIcon[author.role];
                  return (
                    <article
                      key={p.id}
                      className="bg-card border border-border rounded-2xl shadow-card hover:shadow-elevated transition overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar profile={author} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-display font-semibold text-foreground">
                                {author.name}
                              </span>
                              {author.role === "Company" && (
                                <CheckCircle2 size={14} className="text-sky" />
                              )}
                              <span
                                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold inline-flex items-center gap-1 ${categoryColor[p.category]}`}
                              >
                                <RoleIcon size={10} /> {author.role}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {author.title} · {author.company}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              {p.time} · <Globe size={10} />
                            </p>
                          </div>
                          <span
                            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-semibold ${categoryColor[p.category]}`}
                          >
                            {p.category}
                          </span>
                        </div>

                        <p className="text-foreground leading-relaxed whitespace-pre-line mb-3">
                          {p.body}
                        </p>

                        {p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="text-xs text-accent hover:underline cursor-pointer"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp size={12} className="text-accent" />{" "}
                            {p.likes}
                          </span>
                          <span>{p.comments.length} comments</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 border-t border-border">
                        <button
                          onClick={() => toggleLike(p.id)}
                          className={`flex items-center justify-center gap-2 py-3 text-sm font-medium hover:bg-secondary transition ${
                            p.liked ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          <ThumbsUp
                            size={16}
                            fill={p.liked ? "currentColor" : "none"}
                          />{" "}
                          Like
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition">
                          <MessageCircle size={16} /> Comment
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition">
                          <Share2 size={16} /> Share
                        </button>
                      </div>

                      {/* Comments */}
                      <div className="px-5 py-4 border-t border-border bg-secondary/30 space-y-3">
                        {p.comments.map((c) => {
                          const ca = profiles[c.authorId];
                          return (
                            <div key={c.id} className="flex gap-2.5">
                              <Avatar profile={ca} size={32} />
                              <div className="flex-1 bg-card rounded-xl px-3.5 py-2 border border-border">
                                <div className="flex items-center gap-1.5 text-xs">
                                  <span className="font-semibold text-foreground">
                                    {ca.name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    · {ca.title}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground mt-0.5">
                                  {c.body}
                                </p>
                                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                                  <span>{c.time}</span>
                                  <button className="hover:text-accent">
                                    Like
                                  </button>
                                  <button className="hover:text-accent">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="flex gap-2.5 pt-1">
                          <Avatar profile={me} size={32} />
                          <div className="flex-1 flex gap-2">
                            <input
                              value={commentDraft[p.id] || ""}
                              onChange={(e) =>
                                setCommentDraft((d) => ({
                                  ...d,
                                  [p.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addComment(p.id);
                              }}
                              placeholder="Add a comment…"
                              className="flex-1 px-3.5 py-2 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                            />
                            <button
                              onClick={() => addComment(p.id)}
                              className="p-2 rounded-full bg-accent-gradient text-accent-foreground shadow-orange hover:brightness-110 transition"
                              aria-label="Send"
                            >
                              <Send size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </>
            )}

            {tab === "qa" && (
              <>
                <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      Questions & Answers
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Get help from the construction community.
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-orange hover:brightness-110 transition">
                    <Plus size={14} /> Ask a question
                  </button>
                </div>

                {questions.map((q) => {
                  const a = profiles[q.authorId];
                  return (
                    <div
                      key={q.id}
                      className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elevated transition flex gap-4"
                    >
                      <div className="flex flex-col items-center gap-1 w-14 shrink-0">
                        <div className="bg-secondary rounded-lg w-full py-2 text-center">
                          <div className="font-display font-bold text-foreground">
                            {q.votes}
                          </div>
                          <div className="text-[10px] uppercase text-muted-foreground">
                            votes
                          </div>
                        </div>
                        <div className="bg-accent/10 rounded-lg w-full py-2 text-center">
                          <div className="font-display font-bold text-accent">
                            {q.answers}
                          </div>
                          <div className="text-[10px] uppercase text-accent/80">
                            answers
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-foreground hover:text-accent cursor-pointer mb-1.5">
                          {q.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {q.body}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Avatar profile={a} size={24} />
                          <span className="font-semibold text-foreground">
                            {a.name}
                          </span>
                          <span>· {a.title}</span>
                          <span>· {q.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {tab === "people" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.values(profiles).map((p) => {
                  const RoleIcon = roleIcon[p.role];
                  return (
                    <div
                      key={p.id}
                      className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elevated transition"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar profile={p} size={52} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display font-semibold text-foreground truncate">
                              {p.name}
                            </h3>
                            {p.role === "Company" && (
                              <CheckCircle2 size={14} className="text-sky" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {p.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.company}
                          </p>
                          <span
                            className={`mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${categoryColor[p.role === "Company" ? "Solution" : p.role === "Researcher" ? "Research" : p.role === "Technician" ? "Problem" : "Experience"]}`}
                          >
                            <RoleIcon size={10} /> {p.role}
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-accent text-accent font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition">
                        <Plus size={14} /> Connect
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

          {/* Right rail */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-accent" />
                <h3 className="font-display font-semibold text-foreground text-sm">
                  What's happening
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  {
                    t: "5 KPIs every construction director should track in 2026",
                    m: "Insights · 3.2k reads",
                  },
                  {
                    t: "How BatiPro cut reporting time by 60% with WAPE",
                    m: "Customer story · 1.8k reads",
                  },
                  {
                    t: "Mobile NCR workflows: a field benchmark",
                    m: "Research · 920 reads",
                  },
                ].map((n) => (
                  <li key={n.t} className="cursor-pointer group">
                    <div className="font-semibold text-foreground group-hover:text-accent transition leading-snug">
                      {n.t}
                    </div>
                    <div className="text-xs text-muted-foreground">{n.m}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-accent" />
                <h3 className="font-display font-semibold text-foreground text-sm">
                  People you may know
                </h3>
              </div>
              <ul className="space-y-3">
                {Object.values(profiles)
                  .slice(1, 4)
                  .map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <Avatar profile={p} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {p.title}
                        </div>
                      </div>
                      <button className="text-xs font-semibold text-accent border border-accent rounded-full px-3 py-1 hover:bg-accent hover:text-accent-foreground transition">
                        + Connect
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-deep-blue text-primary-foreground rounded-2xl p-5 shadow-elevated relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="relative">
                <Sparkles className="text-accent mb-2" size={18} />
                <h3 className="font-display font-semibold mb-1.5">
                  Join the conversation
                </h3>
                <p className="text-xs text-primary-foreground/75 mb-4">
                  Connect with construction leaders, researchers and field teams
                  using WAPE every day.
                </p>
                <Link
                  to="/book-a-demo"
                  className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 rounded-lg bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-orange hover:brightness-110 transition"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto bg-secondary/60 border border-dashed border-border rounded-xl p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <MessageSquare size={14} className="text-accent" />
          <span>
            This is a preview of the Community Hub with sample content. Account
            creation, messaging and full publishing tools are coming soon.
          </span>
        </div>
      </section>
    </>
  );
};

export default Community;
