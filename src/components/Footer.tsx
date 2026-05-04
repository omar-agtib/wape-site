import { Mail, ExternalLink, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground/70 py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent-gradient flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-sm">
                  W
                </span>
              </div>
              <span className="font-display font-bold text-xl text-primary-foreground">
                WAPE
              </span>
            </div>
            <p className="text-primary-foreground/50 max-w-sm leading-relaxed mb-6">
              Work Accurately, Proactively and Efficiently. The integrated
              digital platform transforming construction and asset-intensive
              industries.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:contact@wape.io"
                className="inline-flex items-center gap-2 hover:text-accent transition"
              >
                <Mail size={16} /> contact@wape.io
              </a>
              <div className="flex items-center gap-2">
                <Phone size={16} /> +33 1 23 45 67 89
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Paris · Casablanca
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-accent transition">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/book-a-demo"
                  className="hover:text-accent transition"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/solutions/site-management"
                  className="hover:text-accent transition"
                >
                  Site Management
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/quality"
                  className="hover:text-accent transition"
                >
                  Quality & Compliance
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/budget"
                  className="hover:text-accent transition"
                >
                  Budget Control
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/resources"
                  className="hover:text-accent transition"
                >
                  Resource Planning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">
              Industries
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/industries/construction"
                  className="hover:text-accent transition"
                >
                  Construction
                </Link>
              </li>
              <li>
                <Link
                  to="/industries/logistics"
                  className="hover:text-accent transition"
                >
                  Logistics
                </Link>
              </li>
              <li>
                <Link
                  to="/industries/manufacturing"
                  className="hover:text-accent transition"
                >
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link
                  to="/industries/energy"
                  className="hover:text-accent transition"
                >
                  Energy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-primary-foreground/40">
          <div>© 2026 WAPE. All rights reserved.</div>
          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-accent inline-flex items-center gap-1.5"
            >
              <Mail size={14} /> LinkedIn
            </a>
            <a
              href="#"
              className="hover:text-accent inline-flex items-center gap-1.5"
            >
              <ExternalLink size={14} /> Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
