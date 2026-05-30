import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone, MapPin, Clock, Star, Menu, X, ArrowUp, MessageCircle,
  Hammer, Wrench, Layers, Sparkles, Shield, Users, Award, Send,
  ChevronRight, Mail, Instagram, Facebook,
} from "lucide-react";

import heroImg from "@/assets/hero-railing.jpg";
import gGlass from "@/assets/gallery-glass.jpg";
import gStairs from "@/assets/gallery-stairs1.jpg";
import gBalls from "@/assets/gallery-balls.jpg";
import gPipes from "@/assets/gallery-pipes.jpg";
import gPost from "@/assets/gallery-post.jpg";
import gShop from "@/assets/gallery-shop.jpg";
import gHandrail from "@/assets/gallery-handrail.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "V.S STEEL Palakkad — Steel Railings, Fabrication & Distribution" },
      { name: "description", content: "Premium stainless steel staircase railings, glass railings, handrails, posts & custom fabrication in Palakkad, Kerala. 5★ rated. Call 099463 56568." },
      { property: "og:title", content: "V.S STEEL — Crafting Steel. Building Legacies." },
      { property: "og:description", content: "Premium Steel Fabrication & Distribution in Palakkad, Kerala. Stainless steel railings, custom work, expert installation." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: VSSteel,
});

const PHONE = "099463 56568";
const PHONE_TEL = "+919946356568";
const WHATSAPP = "919946356568";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "why", label: "Why Us" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  { icon: Layers, title: "SS Staircase Railings", desc: "Wood & steel combination balustrades, hand-finished for premium homes." },
  { icon: Sparkles, title: "Glass Railings", desc: "Modern frameless staircase systems with polished SS hardware." },
  { icon: Hammer, title: "Steel Handrails", desc: "Durable indoor & outdoor handrails built to last decades." },
  { icon: Wrench, title: "Steel Posts & Pillars", desc: "Chrome and painted finish posts for staircases and balconies." },
  { icon: Shield, title: "Ball Fittings & Connectors", desc: "Decorative SS hardware, ball joints and brackets in stock." },
  { icon: Award, title: "Custom Fabrication", desc: "Bespoke steel work on order — designed for your space." },
];

const GALLERY = [
  { src: heroImg, cat: "railings", label: "Wood & Steel Railing" },
  { src: gStairs, cat: "staircases", label: "Curved Staircase" },
  { src: gGlass, cat: "railings", label: "Glass Balustrade" },
  { src: gBalls, cat: "components", label: "SS Ball Fittings" },
  { src: gPost, cat: "components", label: "Chrome Steel Post" },
  { src: gPipes, cat: "components", label: "Hex SS Pipes" },
  { src: gHandrail, cat: "railings", label: "Handrail Detail" },
  { src: gShop, cat: "shop", label: "Our Workshop" },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "staircases", label: "Staircases" },
  { id: "railings", label: "Railings" },
  { id: "components", label: "Components" },
  { id: "shop", label: "Shop" },
];

const REVIEWS = [
  { name: "Rajesh Kumar", text: "Excellent quality stainless steel railings for my new home. The wood and steel combination is beautiful. Highly recommend V.S Steel!", initial: "R" },
  { name: "Anitha Menon", text: "Very professional team. They handled the staircase railing work in our villa perfectly. Finishing is top-class.", initial: "A" },
  { name: "Suresh Nair", text: "Best steel shop in Palakkad. Fair pricing, great craftsmanship and on-time delivery. Will work with them again.", initial: "S" },
];

function VSSteel() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowTop(window.scrollY > 600);
      // active section
      const offsets = NAV.map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return { id: n.id, top: Infinity };
        const r = el.getBoundingClientRect();
        return { id: n.id, top: Math.abs(r.top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // intersection observer reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredGallery = GALLERY.filter((g) => filter === "all" || g.cat === filter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => goTo("home")} className="flex items-center gap-2.5 group">
            <Logo />
            <div className="leading-none">
              <div className="font-display text-2xl tracking-widest text-chrome-gradient">V.S STEEL</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Palakkad</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                className={`px-4 py-2 text-sm uppercase tracking-wider font-heading font-medium transition-colors relative ${
                  active === n.id ? "text-primary" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {n.label}
                {active === n.id && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-primary" />}
              </button>
            ))}
          </nav>

          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm font-heading font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition shadow-[var(--shadow-ember)]"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>

          <button className="lg:hidden text-foreground" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="flex flex-col p-2">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => goTo(n.id)}
                  className={`text-left px-4 py-3 font-heading uppercase tracking-wider text-sm border-b border-border/50 ${
                    active === n.id ? "text-primary" : ""
                  }`}
                >
                  {n.label}
                </button>
              ))}
              <a href={`tel:${PHONE_TEL}`} className="mt-2 mx-2 mb-2 bg-primary text-primary-foreground py-3 text-center font-heading uppercase tracking-wider text-sm">
                Call {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center bg-steel-texture overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* shimmer accents */}
        <div className="absolute top-1/3 left-0 right-0 h-px shimmer-line opacity-40" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px shimmer-line opacity-30" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-border bg-card/60 backdrop-blur px-3 py-1.5 mb-6 reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-ember" />
              <span className="text-xs uppercase tracking-[0.25em] font-heading text-muted-foreground">
                Trusted Steel Distributor • Palakkad, Kerala
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] reveal">
              <span className="block text-chrome-gradient">Crafting Steel.</span>
              <span className="block text-primary mt-1">Building Legacies.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl reveal">
              Premium Steel Fabrication & Distribution — handcrafted railings, custom
              staircases and decorative SS hardware, made in Kerala.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 reveal">
              <button
                onClick={() => goTo("gallery")}
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-heading uppercase tracking-widest text-sm font-semibold hover:bg-primary/90 transition shadow-[var(--shadow-ember)]"
              >
                View Our Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 border border-chrome/40 bg-card/50 backdrop-blur text-foreground px-7 py-4 font-heading uppercase tracking-widest text-sm font-semibold hover:bg-card transition"
              >
                <Phone className="w-4 h-4" /> {PHONE}
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground reveal">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="ml-1 font-heading text-foreground">5.0</span>
              </div>
              <span className="w-px h-4 bg-border" />
              <span className="font-heading uppercase tracking-wider">9+ Google Reviews</span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              <span className="hidden sm:inline font-heading uppercase tracking-wider">Open • Closes 7 PM</span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 float text-muted-foreground">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-chrome mx-auto" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <SectionLabel>01 — About V.S Steel</SectionLabel>
            <h2 className="font-display text-4xl sm:text-6xl mt-4 leading-tight">
              <span className="text-chrome-gradient">Steel that stands.</span>
              <br />
              <span className="text-primary">Craft that lasts.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              For years, V.S Steel has been Palakkad's trusted name for stainless steel
              fabrication and distribution. From elegant staircase railings to custom
              architectural steelwork, we combine traditional Kerala craftsmanship with
              precision modern fabrication — delivering work that families and builders
              come back to, again and again.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Located opposite Barath Petrol Pump near Grand Hotel, Kalmandapam — our
              workshop stocks ready hardware and accepts custom orders for railings,
              glass balustrades, posts, ball fittings and more.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 reveal">
            <StatCard icon={Star} value="5.0★" label="Google Rating" />
            <StatCard icon={Users} value="9+" label="Happy Clients" />
            <StatCard icon={Hammer} value="Expert" label="Fabrication" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 sm:py-32 bg-card/30 border-y border-border relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <SectionLabel center>02 — Products & Services</SectionLabel>
            <h2 className="font-display text-4xl sm:text-6xl mt-4 text-chrome-gradient">
              Built in Steel. Made to Last.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From ready hardware to bespoke fabrication — everything you need for a
              staircase that looks as strong as it stands.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 reveal">
            <div>
              <SectionLabel>03 — Portfolio</SectionLabel>
              <h2 className="font-display text-4xl sm:text-6xl mt-4 text-chrome-gradient">Our Work</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-heading font-semibold border transition ${
                    filter === f.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-chrome hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredGallery.map((g, i) => (
              <button
                key={g.src}
                onClick={() => setLightbox(g.src)}
                className={`group relative overflow-hidden bg-card border border-border reveal ${
                  i % 5 === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent opacity-80 group-hover:opacity-100 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 transition">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading">{g.cat}</div>
                  <div className="font-heading uppercase text-sm tracking-wider mt-0.5">{g.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-24 sm:py-32 bg-steel-texture border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <SectionLabel center>04 — Why Choose Us</SectionLabel>
            <h2 className="font-display text-4xl sm:text-6xl mt-4 text-chrome-gradient">
              Kerala Craftsmanship. Steel Precision.
            </h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "Premium Materials", desc: "Only graded stainless steel and authentic hardware." },
              { icon: Hammer, title: "Expert Installation", desc: "Trained team for clean, precise on-site fitting." },
              { icon: Sparkles, title: "Custom Designs", desc: "Tailor-made railings to match your home's style." },
              { icon: Star, title: "5★ Trusted", desc: "Loved by 9+ verified Google reviews in Palakkad." },
            ].map((f, i) => (
              <div
                key={f.title}
                className="reveal group p-7 bg-card/70 backdrop-blur border border-border hover:border-primary/60 transition"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center border border-chrome/30 bg-background mb-5 group-hover:bg-primary group-hover:border-primary transition">
                  <f.icon className="w-5 h-5 text-chrome-bright group-hover:text-primary-foreground transition" />
                </div>
                <h3 className="font-heading uppercase tracking-wider text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <SectionLabel center>05 — Testimonials</SectionLabel>
            <h2 className="font-display text-4xl sm:text-6xl mt-4 text-chrome-gradient">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 font-heading uppercase tracking-wider text-muted-foreground">5.0 on Google • 9 reviews</span>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="reveal p-7 bg-card border border-border relative" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-[oklch(0.65_0.21_35)] flex items-center justify-center font-display text-xl text-primary-foreground">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-heading uppercase tracking-wider">{r.name}</div>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-primary text-primary" />)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 sm:py-32 bg-card/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <SectionLabel center>06 — Get In Touch</SectionLabel>
            <h2 className="font-display text-4xl sm:text-6xl mt-4 text-chrome-gradient">
              Visit Our Workshop
            </h2>
          </div>

          <div className="mt-14 grid lg:grid-cols-2 gap-10">
            <div className="space-y-5 reveal">
              <ContactCard icon={MapPin} title="Address">
                Opp. Barath Petrol Pump, Near Grand Hotel,<br />
                Kalmandapam, Palakkad, Kerala 678001
              </ContactCard>
              <ContactCard icon={Phone} title="Phone">
                <a href={`tel:${PHONE_TEL}`} className="hover:text-primary transition">{PHONE}</a>
              </ContactCard>
              <ContactCard icon={Clock} title="Business Hours">
                <span className="text-primary font-semibold">Open Today</span> • Closes 7:00 PM<br />
                Monday – Saturday
              </ContactCard>

              <div className="aspect-[16/10] border border-border overflow-hidden bg-background">
                <iframe
                  title="V.S Steel location"
                  src="https://www.google.com/maps?q=Kalmandapam,Palakkad,Kerala+678001&output=embed"
                  className="w-full h-full grayscale contrast-125"
                  loading="lazy"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo />
              <div className="leading-none">
                <div className="font-display text-2xl tracking-widest text-chrome-gradient">V.S STEEL</div>
                <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Palakkad</div>
              </div>
            </div>
            <p className="mt-5 text-muted-foreground max-w-md text-sm leading-relaxed">
              Premium stainless steel fabrication and distribution. Staircase railings,
              glass balustrades, custom work and decorative hardware — crafted in Palakkad, Kerala.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading uppercase tracking-widest text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => goTo(n.id)} className="hover:text-primary transition">{n.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading uppercase tracking-widest text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" /><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />vssteel.palakkad@gmail.com</li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />Kalmandapam, Palakkad, Kerala 678001</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest font-heading">
          <span>© 2025 V.S Steel, Palakkad. All Rights Reserved.</span>
          <span>Steel That Stands. Craft That Lasts.</span>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=Hi%20V.S%20Steel%2C%20I%27m%20interested%20in%20your%20services.`}
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl pulse-ember font-heading uppercase tracking-wider text-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" /> <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 sm:bottom-6 sm:right-44 z-40 w-11 h-11 flex items-center justify-center bg-card border border-border hover:border-primary hover:text-primary transition rounded-full shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center border border-border bg-card hover:border-primary hover:text-primary"
            aria-label="Close"
          >
            <X />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain border border-border" />
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center bg-primary border border-primary/60 shadow-[var(--shadow-ember)]">
      <span className="font-display text-2xl text-primary-foreground leading-none">VS</span>
      <div className="absolute inset-0 border border-chrome-bright/20 translate-x-0.5 translate-y-0.5 pointer-events-none" />
    </div>
  );
}

function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="w-8 h-px bg-primary" />
      <span className="text-xs uppercase tracking-[0.3em] font-heading text-primary">{children}</span>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Star; value: string; label: string }) {
  return (
    <div className="bg-card border border-border p-6 hover:border-primary/60 transition group">
      <Icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition" />
      <div className="font-display text-4xl text-chrome-gradient">{value}</div>
      <div className="font-heading uppercase tracking-widest text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function ServiceCard({
  icon: Icon, title, desc, index,
}: { icon: typeof Star; title: string; desc: string; index: number }) {
  return (
    <div
      className="reveal group relative p-7 bg-background border border-border hover:border-primary transition overflow-hidden"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="absolute -top-px left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
      <div className="w-12 h-12 flex items-center justify-center border border-chrome/30 mb-5 group-hover:bg-primary group-hover:border-primary transition">
        <Icon className="w-5 h-5 text-chrome-bright group-hover:text-primary-foreground transition" />
      </div>
      <h3 className="font-heading uppercase tracking-wider text-xl">{title}</h3>
      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition" />
    </div>
  );
}

function ContactCard({ icon: Icon, title, children }: { icon: typeof Star; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-5 bg-background border border-border">
      <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-primary text-primary-foreground">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-heading uppercase tracking-widest text-xs text-muted-foreground">{title}</div>
        <div className="mt-1 text-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    const name = fd.get("name");
    const phone = fd.get("phone");
    const msg = fd.get("message");
    const text = `Hi V.S Steel,%0AName: ${name}%0APhone: ${phone}%0A%0A${msg}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="reveal bg-background border border-border p-7 sm:p-9 space-y-4"
    >
      <h3 className="font-display text-3xl text-chrome-gradient">Send Us a Message</h3>
      <p className="text-sm text-muted-foreground">Tell us what you need — we'll reply on WhatsApp.</p>

      <Field name="name" label="Your Name" required />
      <Field name="phone" label="Phone Number" type="tel" required />
      <div>
        <label className="block text-xs uppercase tracking-widest font-heading text-muted-foreground mb-1.5">Message</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full bg-input/40 border border-border focus:border-primary outline-none px-4 py-3 text-foreground transition resize-none"
          placeholder="Tell us about your project…"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 font-heading uppercase tracking-widest text-sm font-semibold hover:bg-primary/90 transition shadow-[var(--shadow-ember)]"
      >
        {sent ? "Opening WhatsApp…" : <>Send Message <Send className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-heading text-muted-foreground mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-input/40 border border-border focus:border-primary outline-none px-4 py-3 text-foreground transition"
      />
    </div>
  );
}
