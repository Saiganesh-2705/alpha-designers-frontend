import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "../context/LangContext";
import { contactAPI } from "../services/api";
import { SITE, waLink, telLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const STEPS = [
  { key: "type", q: "Hi! I'm Alpha's assistant. What are you planning?", opts: ["New home", "Interior design", "Roofing work", "Renovation"] },
  { key: "place", q: "Nice. Where is the site?", opts: ["Mannargudi town", "Nearby villages", "Other district"] },
  { key: "size", q: "Roughly how big is it?", opts: ["Below 800 sq ft", "800 - 1,500 sq ft", "1,500 - 3,000 sq ft", "3,000+ sq ft"] },
  { key: "when", q: "When would you like to start?", opts: ["This month", "In 1-3 months", "Just exploring"] },
  { key: "name", q: "Almost done. What's your name?", input: "text", ph: "Your name" },
  { key: "phone", q: "And your mobile number, so we can call you?", input: "tel", ph: "10-digit mobile number" },
];
const phoneOk = (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s+-]|^91/g, ""));

/** Conversational enquiry: a short chat instead of a long form. */
const ProjectChat = () => {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [log, setLog] = useState([{ from: "bot", text: STEPS[0].q }]);
  const [ans, setAns] = useState({});
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState("chat"); // chat | sending | done | fail
  const box = useRef(null);

  useEffect(() => { if (box.current) box.current.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" }); }, [log, typing, state]);

  const next = (key, value) => {
    const a = { ...ans, [key]: value };
    setAns(a);
    setLog((l) => [...l, { from: "me", text: value }]);
    setVal(""); setErr("");
    const n = step + 1;
    if (n >= STEPS.length) return send(a);
    setTyping(true);
    setTimeout(() => { setTyping(false); setStep(n); setLog((l) => [...l, { from: "bot", text: STEPS[n].q }]); }, 650);
  };

  const send = async (a) => {
    setState("sending"); setTyping(true);
    try {
      await contactAPI.submit({
        name: a.name, phone: a.phone, email: "", projectType: a.type,
        message: `Chat enquiry - ${a.type}; site: ${a.place}; size: ${a.size}; start: ${a.when}`, source: "chat",
      });
      setTyping(false); setState("done");
      setLog((l) => [...l, { from: "bot", text: `Thank you, ${a.name}! We've got your details and will call you shortly.` }]);
    } catch {
      setTyping(false); setState("fail");
      setLog((l) => [...l, { from: "bot", text: "Sorry, that didn't go through. Please tap WhatsApp or Call and we'll sort it right away." }]);
    }
  };

  const submitInput = (e) => {
    e.preventDefault();
    const cur = STEPS[step];
    if (cur.key === "name" && val.trim().length < 2) return setErr("Please enter your name.");
    if (cur.key === "phone" && !phoneOk(val)) return setErr("Enter a valid 10-digit mobile number.");
    next(cur.key, val.trim());
  };

  const cur = STEPS[step];
  const summary = `Hi Alpha Designers, I'm ${ans.name || ""}. I need: ${ans.type}; site: ${ans.place}; size: ${ans.size}; start: ${ans.when}.`;

  return (
    <section className="py-20 md:py-28 bg-sand relative overflow-hidden">
      <div className="absolute inset-0 grid-bg-light" />
      <div className="relative container-px grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <Reveal>
          <p className="eyebrow">{t("Start your project")}</p>
          <h2 className="section-title mt-3 text-ink">{t("Tell us in 6 quick taps. No forms.")}</h2>
          <p className="text-stone mt-5 max-w-md">We reply within minutes - open every day, all day. Prefer to talk?</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={telLink()} className="btn-dark">Call {SITE.phones[0]}</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-bold hover:brightness-110 transition"><WaIcon size={16} /> WhatsApp</a>
          </div>
        </Reveal>

        <Reveal delay={120} variant="zoom">
          <div className="rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(21,24,27,0.18)] border border-line overflow-hidden max-w-xl w-full lg:ml-auto">
            <div className="bg-ink text-white px-5 py-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber text-ink grid place-items-center font-display font-extrabold text-xl">&alpha;</span>
              <div className="leading-tight"><p className="font-bold text-sm">Alpha Assistant</p><p className="text-[11px] text-emerald-300 flex items-center gap-1.5"><i className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> online</p></div>
              <div className="ml-auto flex gap-1">{STEPS.map((_, i) => <i key={i} className={`w-5 h-1 rounded-full ${i <= step ? "bg-amber" : "bg-white/20"}`} />)}</div>
            </div>
            <div ref={box} className="h-[22rem] overflow-y-auto px-4 py-5 space-y-3 bg-sand/60">
              {log.map((m, i) => (
                <div key={i} className={`flex animate-bubble ${m.from === "me" ? "justify-end" : ""}`}>
                  <p className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed ${m.from === "me" ? "bg-amber text-ink font-semibold rounded-2xl rounded-br-md" : "bg-white border border-line rounded-2xl rounded-bl-md"}`}>{m.text}</p>
                </div>
              ))}
              {typing && <div className="flex"><p className="typing bg-white border border-line rounded-2xl rounded-bl-md px-4 py-3 flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-stone" /><span className="w-1.5 h-1.5 rounded-full bg-stone" /><span className="w-1.5 h-1.5 rounded-full bg-stone" /></p></div>}
            </div>

            <div className="p-4 border-t border-line bg-white min-h-[5rem]">
              {state === "chat" && !typing && cur.opts && (
                <div className="flex flex-wrap gap-2">{cur.opts.map((o) => <button key={o} onClick={() => next(cur.key, o)} className="px-4 py-2 rounded-full border border-ink/20 text-sm font-semibold hover:bg-ink hover:text-white hover:border-ink transition-colors">{o}</button>)}</div>
              )}
              {state === "chat" && !typing && cur.input && (
                <form onSubmit={submitInput} className="flex gap-2">
                  <input autoFocus type={cur.input} inputMode={cur.input === "tel" ? "numeric" : undefined} value={val} onChange={(e) => { setVal(e.target.value); setErr(""); }} placeholder={cur.ph} className="flex-1 rounded-full border border-ink/20 px-5 py-3 text-sm outline-none focus:border-amber" />
                  <button className="w-12 h-12 rounded-full bg-ink text-white grid place-items-center hover:bg-amber hover:text-ink transition-colors" aria-label="Send">&rarr;</button>
                </form>
              )}
              {err && <p className="text-xs text-red-600 mt-2 pl-2">{err}</p>}
              {(state === "done" || state === "fail") && (
                <div className="flex flex-wrap gap-2">
                  <a href={waLink(summary)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-bold"><WaIcon size={16} /> Continue on WhatsApp</a>
                  <a href={telLink()} className="btn-dark !py-2.5">Call now</a>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectChat;
