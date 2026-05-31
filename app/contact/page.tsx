"use client";
import { useState } from "react";
import { Mail, Github, Twitter, Linkedin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-bold">Get in <span className="gradient-text">touch</span></h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Trip ideas, feedback, or collaboration — we&apos;d love to hear from fellow travelers.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="card space-y-4"
        >
          {sent ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 size={36} className="text-emerald-500" />
              <p className="mt-3 font-semibold">Message sent!</p>
              <p className="text-sm text-slate-500">We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Name</label>
                <input required className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" required className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={5} placeholder="Tell us about your dream destination…" className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                Send <Send size={14} />
              </button>
            </>
          )}
        </form>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold">Email us</h3>
            <a href="mailto:hello@wandervista.pk" className="mt-2 inline-flex items-center gap-2 text-brand-600 hover:underline">
              <Mail size={16} /> hello@wandervista.pk
            </a>
          </div>
          <div className="card">
            <h3 className="font-semibold">Call us</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">+92 300 123 4567</p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Visit us</h3>
            <p className="mt-2 max-w-sm text-slate-600 dark:text-slate-400">
              Office 12, Clifton Towers, Karachi, Pakistan
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Our location</h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <iframe
                title="WanderVista office location"
                src="https://www.google.com/maps?q=Clifton+Towers,+Karachi&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
