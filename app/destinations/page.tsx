"use client";
import { useMemo, useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import SearchBar from "@/components/SearchBar";
import { destinations, regions } from "@/lib/data";

export default function DestinationsPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesRegion = region === "All" || d.region === region;
      const t = q.trim().toLowerCase();
      const matchesQ =
        !t ||
        d.title.toLowerCase().includes(t) ||
        d.country.toLowerCase().includes(t) ||
        d.description.toLowerCase().includes(t);
      return matchesRegion && matchesQ;
    });
  }, [q, region]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold">Explore Destinations</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Browse, search, and filter our curated travel guides from around the world.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1"><SearchBar value={q} onChange={setQ} placeholder="Search destinations…" /></div>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium transition " +
                (region === r
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800")
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-slate-500">No destinations match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => <DestinationCard key={d.id} destination={d} />)}
        </div>
      )}
    </div>
  );
}
