import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1569744405519-ba6615346f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pakistan travel landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/65" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:py-32 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm">
            <Sparkles size={14} className="text-brand-300" />
            Local Pakistan travel guides for every trip
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Discover <span className="gradient-text">beautiful Pakistan</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-200 sm:text-lg">
            From Hunza peaks to Karachi coastlines, plan your next Pakistan escape with curated destination guides,
            seasonal advice, and a friendly travel assistant.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-500/20 transition hover:bg-brand-600"
            >
              Explore destinations <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-lg">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-200">What you can do</p>
          <h2 className="mt-3 text-2xl font-semibold">Find your next Pakistan journey</h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-400" />
              Explore 6 curated destinations with season and budget guidance.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-400" />
              Ask the travel assistant for local highlights and the best time to visit.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-400" />
              Compare budget, duration, and region in a single place.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
