import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="gradient-text text-lg font-bold">WanderVista</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Your AI-powered travel companion for discovering Pakistan&apos;s best destinations.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/destinations" className="hover:underline">Destinations</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
          <div className="mt-3 flex gap-3 text-slate-600 dark:text-slate-400">
            <a href="#" aria-label="GitHub"><Github size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="mailto:hello@wandervista.pk" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </div>
      <p className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} WanderVista. Built for educational purposes.
      </p>
    </footer>
  );
}
