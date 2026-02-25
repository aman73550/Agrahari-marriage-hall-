import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Star, MapPin, Phone, Clock, ChevronLeft, ChevronRight, Menu, X, Utensils, Crown, ShoppingBag, ArrowRight, Sparkles, Compass, Navigation, ExternalLink, Quote, Instagram } from "lucide-react";

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/fvJKZ1YgDREkeJm38";
const PHONE_NUMBER = "08009188327";
const WHATSAPP_LINK = `https://wa.me/918009188327`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Reviews", id: "reviews" },
    { label: "Visit Us", id: "location" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4 h-20">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3"
            data-testid="link-logo"
          >
            <Sparkles className="w-6 h-6 text-gold flex-shrink-0" />
            <span className="font-serif tracking-[0.15em] text-gold leading-tight whitespace-nowrap">
              <span className="text-base sm:text-lg md:hidden">AGRAHARI MARRIAGE HALL</span>
              <span className="hidden md:inline text-base">AGRAHARI MARRIAGE HALL,{" "}
                <span className="text-gold/75">RESTAURANT & SHOPPING CENTRE</span>
              </span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm tracking-[0.2em] uppercase text-white/70 transition-colors duration-500 hover:text-gold whitespace-nowrap"
                data-testid={`link-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.15em] uppercase px-7 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-charcoal font-semibold transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 border border-white/10 backdrop-blur-sm whitespace-nowrap"
              data-testid="button-get-directions-nav"
            >
              Get Directions
            </a>
          </div>

          <button
            className="md:hidden text-white/80 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/60 backdrop-blur-2xl border-t border-gold/10"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm tracking-[0.2em] uppercase text-white/70 text-left transition-colors duration-300 hover:text-gold"
                  data-testid={`link-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.15em] uppercase px-6 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-charcoal text-center font-semibold transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-white/10"
                data-testid="button-get-directions-mobile"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden" data-testid="section-hero">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.img
          src="/images/hero-dining.png"
          alt="Luxury dining interior"
          className="w-full h-[130%] object-cover"
          style={{ scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.6)]" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">
            Est. Dumariyaganj
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] tracking-[0.04em] max-w-5xl"
        >
          Experience the{" "}
          <span className="italic text-gold">Pinnacle</span>
          <br />
          of Elegance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-white/60 text-base sm:text-lg tracking-[0.08em] max-w-xl font-light leading-relaxed"
        >
          The Royal Landmark of Siddharth Nagar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-5"
        >
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-full bg-gradient-to-r from-gold to-gold-dark text-charcoal font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 inline-flex items-center gap-3 border border-white/20 backdrop-blur-sm font-semibold"
            data-testid="button-reserve-hero"
          >
            Visit Us Now
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full border border-white/20 text-white/80 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:border-gold/50 hover:text-gold backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            data-testid="button-explore-hero"
          >
            Explore
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent mx-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
      <span className="text-gold/80 text-xs tracking-[0.35em] uppercase font-sans">
        {label}
      </span>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-gold/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(212,175,55,0.04),0_4px_24px_rgba(212,175,55,0.06)] ${className}`}>
      {children}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 sm:py-40 lg:py-48" data-testid="section-about">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection>
            <SectionLabel label="Our Legacy" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.04em] leading-[1.2] mb-8">
              Where Tradition
              <br />
              Meets <span className="italic text-gold">Grandeur</span>
            </h2>
            <div className="space-y-6">
              <p className="text-white/60 leading-[1.8] text-base tracking-wide font-light">
                Nestled in the heart of Dumariyaganj, Agrahari Marriage Hall, Restaurant & Shopping Centre
                stands as a testament to refined taste and timeless elegance. Our establishment
                brings together the finest culinary traditions, a majestic celebration venue,
                and an exquisite retail experience under one roof.
              </p>
              <p className="text-white/60 leading-[1.8] text-base tracking-wide font-light">
                Every corner of our space is designed to evoke a sense of wonder, from the
                aromatic flavors of our gourmet kitchen to the chandelier-lit grandeur of our
                imperial ballroom. Welcome to the royal landmark of Siddharth Nagar.
              </p>
            </div>

            <GlassCard className="mt-10 p-6 inline-flex items-center gap-8 flex-wrap">
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold">4.2</span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/40 mt-1 block">Rating</span>
              </div>
              <div className="w-px h-12 bg-gold/20" />
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold">50000+</span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/40 mt-1 block">Happy Guests</span>
              </div>
              <div className="w-px h-12 bg-gold/20" />
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold">3</span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/40 mt-1 block">Wings</span>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="relative">
            <div className="relative group rounded-3xl overflow-hidden">
              <img
                src="/images/exterior.png"
                alt="Agrahari Restaurant exterior"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.3)]" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold/20 rounded-3xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold/20 rounded-3xl" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    title: "The Gourmet Atelier",
    subtitle: "Fine Dining Suite",
    description:
      "Savor authentic flavors crafted with passion and served with elegance. Our dining suite offers a curated menu featuring the finest regional and continental cuisine in an ambiance that whispers luxury.",
    image: "/images/fine-dining.png",
    icon: Utensils,
    highlights: ["Authentic Flavors", "Fine Dining Ambiance", "Curated Menu"],
  },
  {
    title: "The Grand Imperial Ballroom",
    subtitle: "Celebration Venue",
    description:
      "Host your most cherished moments in our centrally air-conditioned ballroom, adorned with crystal chandeliers and a grand entrance that takes your breath away. The perfect stage for royal celebrations.",
    image: "/images/marriage-hall.png",
    icon: Crown,
    highlights: ["Centrally Air-Conditioned", "Grand Chandelier Entrance", "Royal Celebrations"],
  },
  {
    title: "The Boutique Gallery",
    subtitle: "Luxury Retail Wing",
    description:
      "Discover the fashion hub of Dumariyaganj. Our boutique gallery houses curated collections from premier brands, offering an exclusive shopping experience that matches the sophistication of metropolitan retail.",
    image: "/images/shopping-centre.png",
    icon: ShoppingBag,
    highlights: ["Fashion Hub", "Premier Brands", "Exclusive Collections"],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 sm:py-40 lg:py-48" data-testid="section-experience">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.04),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-20 lg:mb-28">
          <SectionLabel label="The Experience" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.04em] leading-[1.2]">
            Three Wings of
            <br />
            <span className="italic text-gold">Unparalleled Excellence</span>
          </h2>
        </AnimatedSection>

        <div className="space-y-24 lg:space-y-36">
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.title} delay={0.1}>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative group rounded-3xl overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      data-testid={`img-experience-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_15px_rgba(0,0,0,0.3)]" />
                    <div className="absolute bottom-6 left-6">
                      <GlassCard className="px-4 py-2 inline-flex items-center gap-2 rounded-full">
                        <exp.icon className="w-4 h-4 text-gold" />
                        <span className="text-xs tracking-[0.25em] uppercase text-gold/90">
                          {exp.subtitle}
                        </span>
                      </GlassCard>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.04em] leading-[1.2] mb-6 bg-gradient-to-r from-[#D4AF37] to-[#F5E0A3] bg-clip-text text-transparent">
                    {exp.title}
                  </h3>
                  <p className="text-white/60 leading-[1.8] text-base tracking-wide font-light mb-8">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {exp.highlights.map((h) => (
                      <GlassCard
                        key={h}
                        className="text-xs tracking-[0.15em] uppercase text-gold/80 px-5 py-2.5 rounded-full"
                      >
                        {h}
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "An extraordinary dining experience! The ambiance is unmatched in the entire district. The food quality is exceptional and the staff treats you like royalty.",
    source: "Google",
    verified: true,
    featured: true,
  },
  {
    name: "Priya Agrahari",
    rating: 5,
    text: "We celebrated our daughter's wedding here and it was nothing short of magical. The ballroom was decorated beautifully and every guest was impressed.",
    source: "JustDial",
    verified: true,
    featured: false,
  },
  {
    name: "Amit Singh",
    rating: 4,
    text: "The shopping centre has an impressive collection. Found premium brands that I usually only find in metro cities. A true gem in Dumariyaganj.",
    source: "Google",
    verified: true,
    featured: false,
  },
  {
    name: "Sunita Devi",
    rating: 5,
    text: "Excellent food quality and friendly staff. The restaurant has a premium feel that you wouldn't expect in a small town. Highly recommended!",
    source: "MakeMyTrip",
    verified: true,
    featured: false,
  },
  {
    name: "Vikram Pandey",
    rating: 5,
    text: "The marriage hall is centrally air-conditioned with beautiful chandeliers. Our guests couldn't stop complimenting the venue. Truly a royal experience.",
    source: "Google",
    verified: true,
    featured: false,
  },
  {
    name: "Meera Gupta",
    rating: 5,
    text: "The best fine-dining experience in Dumariyaganj. The marriage hall is truly royal! We had our anniversary dinner here and it was perfect.",
    source: "Google",
    verified: true,
    featured: false,
  },
];

function ReviewCard({ review, index, featured = false }: { review: typeof reviews[0]; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`group relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(212,175,55,0.08)] ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
      data-testid={`card-review-${index}`}
    >
      {featured && (
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
          <Quote className="w-8 h-8 text-gold/15" />
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? "text-gold fill-gold" : "text-white/15"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-sans">
            {review.source}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-gold/50 transition-colors duration-500" />
        </div>
      </div>

      <p className={`text-white/70 italic leading-[1.8] tracking-wide mb-6 font-light ${
        featured ? "text-base sm:text-lg lg:text-xl lg:leading-[1.8]" : "text-sm sm:text-base"
      }`}>
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center justify-between gap-3 mt-auto">
        <span className="text-white font-semibold text-sm tracking-[0.1em]">
          {review.name}
        </span>
        {review.verified && (
          <span className="text-[9px] tracking-[0.2em] uppercase text-gold/60 border border-gold/20 px-3 py-1 rounded-full bg-gold/5 backdrop-blur-sm whitespace-nowrap">
            Verified
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const featuredReview = reviews.find((r) => r.featured)!;
  const otherReviews = reviews.filter((r) => !r.featured);

  return (
    <section id="reviews" className="relative py-32 sm:py-40 lg:py-48" data-testid="section-reviews">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16 lg:mb-24">
          <SectionLabel label="Guest Experiences" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.04em] leading-[1.2]">
            Voices of Our{" "}
            <span className="italic text-gold">Elite Guests</span>
          </h2>
          <p className="mt-6 text-white/40 text-sm tracking-[0.15em] uppercase">
            4.5+ Average Rating on Google & JustDial
          </p>
        </AnimatedSection>

        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 lg:row-span-2">
            <ReviewCard review={featuredReview} index={0} featured />
          </div>
          {otherReviews.slice(0, 4).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i + 1} />
          ))}
        </div>

        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, i) => (
              <div key={review.name} className="snap-center flex-shrink-0 w-[85vw] sm:w-[70vw]">
                <ReviewCard review={review} index={i} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                canScrollLeft
                  ? "border-gold/30 text-gold/70 bg-white/[0.03]"
                  : "border-white/10 text-white/20"
              }`}
              data-testid="button-review-scroll-left"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                canScrollRight
                  ? "border-gold/30 text-gold/70 bg-white/[0.03]"
                  : "border-white/10 text-white/20"
              }`}
              data-testid="button-review-scroll-right"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatedSection className="mt-16 text-center">
          <GlassCard className="inline-flex items-center gap-6 px-8 py-4 rounded-full">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[5, 5, 5, 4, 5].map((r, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-gold font-serif text-xl ml-2">4.5+</span>
            </div>
            <div className="w-px h-8 bg-gold/20" />
            <span className="text-white/50 text-xs tracking-[0.15em] uppercase">
              Google &middot; JustDial &middot; MakeMyTrip
            </span>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="location" className="relative py-32 sm:py-40 lg:py-48" data-testid="section-location">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0e0e0e] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16 lg:mb-24">
          <SectionLabel label="The Destination" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.04em] leading-[1.2]">
            Navigate to{" "}
            <span className="italic text-gold">Paradise</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimatedSection>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-charcoal-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.4!2d82.7!3d27.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAwJzAwLjAiTiA4MsKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-0 grayscale contrast-125 opacity-60"
                loading="lazy"
                allowFullScreen
                title="Agrahari Restaurant Location"
                data-testid="map-embed"
              />
              <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-3xl" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_15px_rgba(0,0,0,0.4)] rounded-3xl" />

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 group px-8 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-charcoal font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 inline-flex items-center gap-3 pointer-events-auto border border-white/20 font-semibold"
                data-testid="button-vip-directions"
              >
                <MapPin className="w-4 h-4" />
                Get VIP Directions
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col justify-center h-full gap-8">
              <GlassCard className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="w-6 h-6 text-gold" />
                  <h3 className="font-serif text-xl text-gold tracking-[0.1em]">
                    Concierge Desk
                  </h3>
                </div>
                <p className="text-white/50 text-sm tracking-wide leading-relaxed">
                  For Royal Bookings & Marriage Hall Enquiries,
                  contact our Executive Desk.
                </p>
              </GlassCard>

              <div className="space-y-6 px-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold/70" />
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-gold/50 block mb-1">
                      Address
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed" data-testid="text-address">
                      Ward No. 15, Near Shivam Guest House,
                      <br />
                      Itwa Road, Dumariyaganj,
                      <br />
                      Siddharth Nagar, Uttar Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gold/70" />
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-gold/50 block mb-1">
                      Executive Desk
                    </span>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="text-white/70 text-sm hover:text-gold transition-colors duration-300"
                      data-testid="text-phone"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gold/70" />
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-gold/50 block mb-1">
                      Hours
                    </span>
                    <p className="text-white/70 text-sm" data-testid="text-hours">
                      Open Daily: 10:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 w-full rounded-full bg-white/5 backdrop-blur-md border border-gold/40 text-white font-semibold tracking-[0.1em] text-sm transition-all duration-500 hover:bg-gold hover:text-charcoal hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                data-testid="button-call-concierge"
              >
                <Phone className="w-4 h-4 text-gold group-hover:text-charcoal transition-colors duration-500" />
                <span>Speak with our Concierge</span>
              </a>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
                data-testid="link-navigate-card"
              >
                <GlassCard className="p-6 flex items-center justify-between gap-4 group cursor-pointer transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="font-serif text-lg text-gold tracking-[0.08em] block">
                        Navigate to Agrahari
                      </span>
                      <span className="text-white/40 text-xs tracking-wider">
                        Open in Google Maps
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gold/50 transition-all duration-500 group-hover:text-gold group-hover:translate-x-1" />
                </GlassCard>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16" data-testid="section-footer">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold/60 flex-shrink-0" />
            <span className="font-serif text-sm tracking-[0.12em] text-gold/60 leading-tight">
              AGRAHARI MARRIAGE HALL,<br />
              <span className="text-xs tracking-[0.08em] text-gold/40">RESTAURANT & SHOPPING CENTRE</span>
            </span>
          </div>

          <p className="text-white/30 text-xs tracking-[0.15em] text-center">
            THE ROYAL LANDMARK OF SIDDHARTH NAGAR
          </p>

          <p className="text-white/20 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Agrahari Marriage Hall, Restaurant & Shopping Centre
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <a
            href="https://www.instagram.com/amangupta.yt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/35 hover:text-gold transition-all duration-500 group"
            data-testid="link-creator-credit"
          >
            <span>Designed & Developed by</span>
            <span className="text-gold/60 group-hover:text-gold transition-colors duration-500">Aman Gupta</span>
            <span className="text-white/20">|</span>
            <Instagram className="w-3 h-3 text-gold/50 group-hover:text-gold transition-colors duration-500" />
            <span className="text-gold/50 group-hover:text-gold transition-colors duration-500">@amangupta.yt</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-black/70 backdrop-blur-2xl border border-gold/20 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(212,175,55,0.08)]">
            <a
              href={`tel:${PHONE_NUMBER}`}
              data-testid="button-dock-call"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 transition-all duration-300 hover:bg-gold hover:border-gold group"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
              <span className="text-[9px] tracking-widest uppercase text-gold/70 group-hover:text-charcoal transition-colors duration-300">Call</span>
            </a>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-dock-location"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 transition-all duration-300 hover:bg-gold hover:border-gold group"
              aria-label="Get directions"
            >
              <MapPin className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
              <span className="text-[9px] tracking-widest uppercase text-gold/70 group-hover:text-charcoal transition-colors duration-300">Location</span>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-dock-whatsapp"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 transition-all duration-300 hover:bg-gold hover:border-gold group"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gold group-hover:fill-charcoal transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-[9px] tracking-widest uppercase text-gold/70 group-hover:text-charcoal transition-colors duration-300">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-[#0a0a0a] min-h-screen overflow-x-hidden"
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ReviewsSection />
      <LocationSection />
      <Footer />
      <FloatingDock />
    </motion.div>
  );
}
