import { Globe, Cpu, Layers, Sparkles } from "lucide-react";

export const metadata = { title: "About — WanderVista" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">About <span className="gradient-text">WanderVista</span></h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        WanderVista is a Pakistan travel &amp; tourism platform built to help explorers discover
        the country&apos;s most beautiful destinations and plan memorable journeys across Pakistan.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          WanderVista exists to make Pakistani travel easy and inspiring. We gather the best local
          destinations, seasonal tips, and route ideas so travelers can explore Hunza, Lahore,
          Skardu, Karachi, Swat, and Fairy Meadows with confidence.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Why WanderVista?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Globe, title: "Curated travel stories", text: "Authentic Pakistan destination highlights, best times to visit, and local must-sees." },
            { icon: Layers, title: "Smart trip planning", text: "Find trips by region, budget, duration, and destination mood." },
            { icon: Cpu, title: "Easy-to-use guides", text: "Simple explanations and actionable tips for first-time and repeat travelers." },
            { icon: Sparkles, title: "Friendly travel support", text: "A quick chat assistant and contact help you plan the next Pakistan adventure." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card">
              <Icon className="text-brand-500" />
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Project Information</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          WanderVista is designed for travelers who want fast access to Pakistan's best destinations,
          local highlights, and thoughtful planning advice in one place.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Destination guides for Hunza, Lahore, Swat, Skardu, Karachi, and Fairy Meadows</li>
          <li>Practical travel tips for season, budget, and regional highlights</li>
          <li>Search and explore destinations by region, pace, and price</li>
          <li>Quick contact and chat support for planning your next Pakistan trip</li>
        </ul>
      </section>
    </div>
  );
}
