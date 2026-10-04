import { Code2 } from "lucide-react";

const Nav = () => {
  const links = [
    { href: "#about", label: "about" },
    { href: "#work", label: "work" },
    { href: "#stack", label: "stack" },
    { href: "#contact", label: "contact" },
  ];
  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4">
      <nav className="glass flex items-center gap-3 rounded-full px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <a href="#top" className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-sm font-semibold">
          <Code2 className="h-4 w-4 text-accent" />
          <span className="tracking-widest">VENOME</span>
        </a>
        <ul className="hidden items-center gap-1 px-2 font-mono text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-secondary hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          available
        </div>
      </nav>
    </header>
  );
};

export default Nav;
