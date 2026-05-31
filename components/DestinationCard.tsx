import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, DollarSign } from "lucide-react";
import type { Destination } from "@/lib/data";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination.id}`} className="card group block overflow-hidden p-0">
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            {destination.region}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{destination.priceRange}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold">{destination.title}, {destination.country}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {destination.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><Clock size={12} />{destination.duration}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={12} />{destination.country}</span>
          <span className="inline-flex items-center gap-1"><DollarSign size={12} />{destination.priceRange}</span>
        </div>
      </div>
    </Link>
  );
}
