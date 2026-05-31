import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Calendar, DollarSign, ArrowLeft, CheckCircle2 } from "lucide-react";
import { destinations } from "@/lib/data";
import DestinationCard from "@/components/DestinationCard";

export function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const d = destinations.find((x) => x.id === params.id);
  return { title: d ? `${d.title}, ${d.country} — WanderVista` : "Destination" };
}

export default function DestinationDetail({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id);
  if (!destination) notFound();
  const related = destinations
    .filter((d) => d.id !== destination.id && d.region === destination.region)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/destinations" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        <ArrowLeft size={14} /> Back to destinations
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl relative h-72 w-full sm:h-96">
        <Image src={destination.image} alt={destination.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          {destination.region}
        </span>
      </div>
      <h1 className="mt-3 text-4xl font-bold">{destination.title}, {destination.country}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{destination.longDescription}</p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1"><Clock size={14} />{destination.duration}</span>
        <span className="inline-flex items-center gap-1"><MapPin size={14} />{destination.country}</span>
        <span className="inline-flex items-center gap-1"><Calendar size={14} />Best: {destination.bestTime}</span>
        <span className="inline-flex items-center gap-1"><DollarSign size={14} />{destination.priceRange}</span>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Trip Highlights</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {destination.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 size={16} className="mt-0.5 text-brand-500" /> {h}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <Link
          href="/contact"
          className="inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
        >
          Plan This Trip
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">More in {destination.region}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => <DestinationCard key={d.id} destination={d} />)}
          </div>
        </section>
      )}
    </div>
  );
}
