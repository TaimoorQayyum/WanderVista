export const metadata = { title: "FAQ — WanderVista" };

const faqs = [
  { q: "Is WanderVista free to use?", a: "Yes — all Pakistan destination guides are free for educational and personal use." },
  { q: "What destinations are covered?", a: "Hunza Valley, Lahore, Swat Valley, Skardu, Karachi, and Fairy Meadows — all within Pakistan." },
  { q: "How can I use the travel assistant?", a: "Ask about destinations, budgets, best seasons, and local highlights. The assistant gives travel guidance for the destinations featured on the site." },
  { q: "How do I choose a budget-friendly trip?", a: "For budget travel, start with Lahore, Swat Valley, and Karachi. Use the destination cards to compare price range, duration, and region." },
  { q: "When is the best time to visit Hunza?", a: "Hunza is best visited between April and October, when roads are open, weather is mild, and local scenery is at its peak." },
  { q: "Can I get help planning multiple destinations?", a: "Yes. Ask the travel assistant to compare trips or use the Contact page for planning advice across cities in Pakistan." },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Answers about WanderVista and Pakistan travel.</p>
      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="card cursor-pointer">
            <summary className="list-none font-semibold">{f.q}</summary>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
