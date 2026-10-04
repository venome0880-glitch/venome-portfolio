import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Constellation from "@/components/Constellation";
import Typewriter from "@/components/Typewriter";
import DiscordProfile from "@/components/DiscordProfile";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Github,
  Send,
  Terminal,
  MousePointer2,
} from "lucide-react";

const DISCORD_ID = "1508400186622218250";

const projects = [
  {
    name: "NAKKHOTRO",
    status: "live" as const,
    blurb:
      "My Discord server NAKKHOTRO is a Bangladeshi community server for chilling, fun, gaming, and hanging out.",
    stack: ["DISCORD"],
    href: "https://discord.gg/nakkhotro",
    cta: "View Discord",
    featured: false,
  },
  {
    name: "NEON VOID",
    status: "live" as const,
    blurb: "Discover NEON VOID, my Discord bot in the Discord App Directory.",
    stack: ["DISCORD BOT"],
    href: "https://discord.com/discovery/applications/1468997990575378432",
    cta: "View on Discord",
    featured: true,
  },
];

const stats = [
  { value: "1+", label: "Years Exp." },
  { value: "16", label: "Years Old" },
  { value: "3+", label: "Projects" },
  { value: "6", label: "Clients" },
];

const stack = [
  {
    icon: Terminal,
    label: "Node.js",
    note: "daily driver",
  },
];

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hasEntered) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasEntered]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!elements?.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <div className="ambient-background" aria-hidden="true">
        {!reducedMotion && (
          <video
            className="ambient-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.pexels.com/videos/30975000/pexels-photo-30975000.jpeg"
          >
            <source
              src="https://videos.pexels.com/video-files/30975000/13241693_2160_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        )}
        <span className="ambient-video-overlay" />
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-orb ambient-orb-three" />
      </div>

      {!hasEntered && (
        <div
          className="entry-screen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="entry-title"
        >
          <div className="entry-content">
            <h1 id="entry-title" className="font-feminine text-shimmer">
              VENOME
            </h1>
            <button
              type="button"
              autoFocus
              className="entry-prompt"
              onClick={() => setHasEntered(true)}
            >
              [CLICK TO CONTINUE]
            </button>
          </div>
        </div>
      )}
      <div className="relative z-10">
        <Nav />

        {/* HERO */}
        <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">
          <Constellation />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center animate-fade-up">
          <div className="mb-8">
            <DiscordProfile userId={DISCORD_ID} />
          </div>

          <h1 className="font-feminine text-7xl tracking-[0.14em] md:text-9xl">
            <span className="text-shimmer">VENOME</span>
          </h1>

          <div className="mt-6 terminal-chip">
            <Typewriter />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground md:text-lg">
            Independent Discord bot builder crafting web products,
            community tools, and clean digital experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <a href="#work">
                See selected work
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-grad-border rounded-full bg-secondary/50 backdrop-blur"
            >
              <a href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Start a project
              </a>
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MousePointer2 className="h-3 w-3" />
            scroll to descend
          </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
        id="about"
        className="cursor-nav relative mx-auto max-w-6xl px-6 py-32"
      >
        <div data-reveal className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" />
          ABOUT ME
        </div>

        <div data-reveal className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Bio card */}
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card/60 p-8 shadow-[0_0_60px_-20px_hsl(var(--accent)/0.6)] backdrop-blur md:p-10">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Hey, I'm <span className="text-foreground">VENOME</span>.
            </h2>

            <p className="mt-6 text-muted-foreground">
              I'm a Discord bot builder. I love blending careful visual design
              with clean code — building brands, websites, and bots that feel
              polished down to the last detail.
            </p>

            <p className="mt-4 text-muted-foreground">
              Right now I'm focused on creating fast web experiences and custom
              tools for Discord communities — things that stay out of the way
              and just feel good to use.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_60px_-25px_hsl(var(--accent)/0.8)] md:p-8"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    {s.value}
                  </div>

                  <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* WORK */}
        <section
        id="work"
        className="cursor-nav relative mx-auto max-w-6xl px-6 py-32"
      >
        <div data-reveal className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent" />
          FEATURED WORK
        </div>

        <div data-reveal className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
              className={`group relative overflow-hidden rounded-2xl border bg-card/50 p-8 transition-all hover:bg-card ${
                p.featured
                  ? "border-accent/40 shadow-[0_0_60px_-25px_hsl(var(--accent)/0.8)]"
                  : "border-border"
              }`}
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                    {p.name}
                  </h3>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${
                      p.status === "live"
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-secondary/60 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        p.status === "live"
                          ? "bg-accent animate-pulse-glow"
                          : "bg-muted-foreground"
                      }`}
                    />

                    {p.status === "live" ? "LIVE" : "UPCOMING"}
                  </span>
                </div>

                <p className="mt-4 text-muted-foreground">{p.blurb}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8 inline-flex items-center gap-1.5 font-medium text-foreground">
                  {p.cta}

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
        </section>

        {/* STACK */}
        <section
        id="stack"
        className="cursor-nav relative mx-auto max-w-6xl px-6 py-32"
      >
        <div data-reveal className="flex items-center gap-3 font-mono text-sm text-accent">
          <span className="h-px w-8 bg-accent" />
          03 · stack
        </div>

        <h2 data-reveal className="mt-4 font-display text-4xl font-semibold md:text-5xl">
          Tools I reach for.
        </h2>

        <div data-reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {stack.map(({ icon: Icon, label, note }) => (
            <div
              key={label}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/40 p-5 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-accent">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <div className="font-medium">{label}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  {note}
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>

        {/* CONTACT */}
        <section
        id="contact"
        className="cursor-nav relative mx-auto max-w-4xl px-6 py-32"
      >
        <div data-reveal className="flex items-center gap-3 font-mono text-sm text-accent">
          <span className="h-px w-8 bg-accent" />
          04 · contact
        </div>

        <div data-reveal className="mt-6 overflow-hidden rounded-3xl border border-border bg-card/60 p-10 md:p-16">
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Got something{" "}
            <span className="text-gradient-brand">worth building?</span>
          </h2>

          <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
            I take on a small number of product and infrastructure projects.
            If you have something worth building, send me a message.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <a href="mailto:venome0880@gmail.com">
                venome0880@gmail.com
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-grad-border rounded-full bg-secondary/50"
            >
              <a
                href="https://github.com/venome0880-glitch"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <Github className="mr-2 h-4 w-4" />
                github.com/venome0880-glitch
              </a>
            </Button>
          </div>
        </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} VENOME · crafted in the dark
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
            system nominal
          </span>
        </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
