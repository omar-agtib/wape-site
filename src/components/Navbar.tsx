import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Building2,
  Package,
  Users,
  Mail,
  CalendarCheck,
  Truck,
  Factory,
  Zap,
  HardHat,
  ShieldCheck,
  Wallet,
  ClipboardCheck,
  Lock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const industries = [
  {
    label: "Construction (BTP)",
    to: "/industries/construction",
    icon: Building2,
    status: "active" as const,
  },
  {
    label: "Logistics",
    to: "/industries/logistics",
    icon: Truck,
    status: "soon" as const,
  },
  {
    label: "Manufacturing",
    to: "/industries/manufacturing",
    icon: Factory,
    status: "soon" as const,
  },
  {
    label: "Energy",
    to: "/industries/energy",
    icon: Zap,
    status: "soon" as const,
  },
];

const solutions = [
  {
    label: "WAPE Platform (All-in-one)",
    to: "/solutions/platform",
    icon: Package,
    status: "active" as const,
  },
  {
    label: "Site Management",
    to: "/solutions/site-management",
    icon: HardHat,
    status: "active" as const,
  },
  {
    label: "Quality & Compliance",
    to: "/solutions/quality",
    icon: ShieldCheck,
    status: "active" as const,
  },
  {
    label: "Planning & Time Tracking",
    to: "/solutions/planning",
    icon: ClipboardCheck,
    status: "active" as const,
  },
  {
    label: "Budget & Cost Control",
    to: "/solutions/budget",
    icon: Wallet,
    status: "active" as const,
  },
];

const mainLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "About", to: "/about", icon: Info },
];

const trailingLinks = [
  { label: "Community", to: "/community", icon: Users },
  { label: "Contact", to: "/contact", icon: Mail },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  const linkBase = `text-sm font-medium transition-colors duration-200 hover:text-accent inline-flex items-center gap-1.5 ${
    transparent ? "text-primary-foreground/85" : "text-foreground"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-card/95 backdrop-blur-md shadow-soft border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-accent-gradient flex items-center justify-center">
            <span className="text-accent-foreground font-display font-bold text-sm">
              W
            </span>
          </div>
          <span
            className={`font-display font-bold text-xl transition-colors duration-300 ${
              transparent ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            WAPE
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {mainLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkBase}>
              <l.icon size={15} /> {l.label}
            </Link>
          ))}

          {/* Industries dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("industries")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={linkBase}>
              <Building2 size={15} /> Industries <ChevronDown size={13} />
            </button>
            {openDropdown === "industries" && (
              <div className="absolute top-full left-0 pt-3 animate-fade-in">
                <div className="bg-card border border-border rounded-xl shadow-elevated p-2 min-w-70">
                  {industries.map((i) => {
                    const isSoon = i.status === "soon";
                    return (
                      <Link
                        key={i.to}
                        to={i.to}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                          isSoon
                            ? "text-muted-foreground hover:bg-secondary/60"
                            : "text-foreground hover:bg-secondary hover:text-accent"
                        }`}
                      >
                        <i.icon
                          size={16}
                          className={isSoon ? "opacity-50" : "text-accent"}
                        />
                        <span className="text-sm flex-1">{i.label}</span>
                        {isSoon ? (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Soon
                          </span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={linkBase}>
              <Package size={15} /> Solutions <ChevronDown size={13} />
            </button>
            {openDropdown === "solutions" && (
              <div className="absolute top-full left-0 pt-3 animate-fade-in">
                <div className="bg-card border border-border rounded-xl shadow-elevated p-2 min-w-75">
                  {solutions.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-secondary hover:text-accent transition"
                    >
                      <s.icon size={16} className="text-accent" />
                      <span className="text-sm">{s.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {trailingLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkBase}>
              <l.icon size={15} /> {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book-a-demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-orange hover:brightness-110 transition"
          >
            <CalendarCheck size={15} /> Book a Demo
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${transparent ? "text-primary-foreground" : "text-foreground"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-6 py-6 space-y-1 animate-fade-in max-h-[80vh] overflow-y-auto">
          {[...mainLinks, ...trailingLinks].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={closeMenu}
              className="flex items-center gap-2.5 text-foreground font-medium py-2.5"
            >
              <l.icon size={16} className="text-accent" /> {l.label}
            </Link>
          ))}
          <div className="pt-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
              Industries
            </div>
            {industries.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={closeMenu}
                className="flex items-center gap-2.5 text-foreground/80 text-sm py-2"
              >
                <i.icon
                  size={15}
                  className={i.status === "soon" ? "opacity-50" : "text-accent"}
                />
                <span className="flex-1">{i.label}</span>
                {i.status === "soon" && (
                  <Lock size={12} className="text-muted-foreground" />
                )}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
              Solutions
            </div>
            {solutions.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={closeMenu}
                className="flex items-center gap-2.5 text-foreground/80 text-sm py-2"
              >
                <s.icon size={15} className="text-accent" /> {s.label}
              </Link>
            ))}
          </div>
          <Link
            to="/book-a-demo"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full text-center mt-4 px-5 py-3 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange"
          >
            <CalendarCheck size={16} /> Book a Demo
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
