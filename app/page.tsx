import Link from "next/link";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { destinations, testimonials } from "@/lib/data";
import { ArrowRight, Globe, Bot, Compass } from "lucide-react";

export default function HomePage() {
  const featured = destinations.slice(0, 3);
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">Hand-picked places to inspire your next adventure.</p>
          </div>
          <Link href="/destinations" className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:underline sm:inline-flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => <DestinationCard key={d.id} destination={d} />)}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {[
            { icon: Globe, title: "Pakistan Guides", text: "Expert travel guides for 6 destinations across Gilgit-Baltistan, Punjab, KPK, and Sindh." },
            { icon: Bot, title: "Travel Assistant", text: "Ask our travel chatbot anything — it retrieves Pakistan destination content to answer you." },
            { icon: Compass, title: "Plan with Confidence", text: "Filter by region, budget, and duration to find your perfect trip." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card">
              <Icon className="text-brand-500" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">What travelers say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card">
              <blockquote className="text-slate-700 dark:text-slate-300">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-slate-500"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="gradient-bg">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to explore Pakistan?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            From Hunza&apos;s peaks to Karachi&apos;s coast — start planning your trip today.
          </p>
          <Link href="/destinations" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
            Browse Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
