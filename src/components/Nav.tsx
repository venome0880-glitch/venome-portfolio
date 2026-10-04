import { useEffect, useState } from "react";
import { Code2, MapPin, Thermometer } from "lucide-react";

const Nav = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [temperatureUnavailable, setTemperatureUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const updateTemperature = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current=temperature_2m&timezone=Asia%2FDhaka",
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Weather request failed with status ${response.status}`);
        }

        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("current" in data) ||
          typeof data.current !== "object" ||
          data.current === null ||
          !("temperature_2m" in data.current) ||
          typeof data.current.temperature_2m !== "number" ||
          !Number.isFinite(data.current.temperature_2m)
        ) {
          throw new Error("Weather response did not contain a valid temperature");
        }

        setTemperature(data.current.temperature_2m);
        setTemperatureUnavailable(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Unable to load Dhaka temperature:", error);
        setTemperatureUnavailable(true);
      }
    };

    void updateTemperature();
    const intervalId = window.setInterval(() => void updateTemperature(), 15 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const links = [
    { href: "#about", label: "about" },
    { href: "#work", label: "work" },
    { href: "#stack", label: "stack" },
    { href: "#contact", label: "contact" },
  ];
  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-2 sm:px-4">
      <nav className="glass flex items-center gap-3 rounded-full px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-sm font-semibold">
          <Code2 className="h-4 w-4 text-accent" />
          <span className="tracking-widest">VENOME</span>
        </a>
        <ul className="hidden items-center gap-1 px-2 font-mono text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-secondary hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center gap-1.5 rounded-full bg-secondary px-2 py-1.5 font-mono text-xs text-muted-foreground sm:gap-2 sm:px-3"
          title="Current temperature in Dhaka, Bangladesh"
          aria-label={`Dhaka, Bangladesh: ${
            temperatureUnavailable
              ? "temperature unavailable"
              : temperature === null
                ? "loading temperature"
                : `${Math.round(temperature)} degrees Celsius`
          }`}
          aria-live="polite"
        >
          <MapPin className="h-3 w-3 shrink-0 text-accent" />
          <span className="hidden min-[380px]:inline">Bangladesh</span>
          <Thermometer className="h-3 w-3 shrink-0 text-accent" />
          <span className="tabular-nums">
            {temperatureUnavailable
              ? "--°C"
              : temperature === null
                ? "…"
                : `${Math.round(temperature)}°C`}
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground md:flex">
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
