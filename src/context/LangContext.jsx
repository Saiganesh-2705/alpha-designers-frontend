import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Tamil strings are keyed by the English text. t("English") returns Tamil when selected
// and a translation exists - otherwise the English text. Add more pairs any time.
const TA = {
  Home: "முகப்பு", About: "எங்களைப் பற்றி", Services: "சேவைகள்", Projects: "திட்டங்கள்", "Contact Us": "தொடர்பு",
  "Free Quote": "இலவச மதிப்பீடு", Call: "அழைக்க", WhatsApp: "வாட்ஸ்அப்", "Get a Quote": "மதிப்பீடு பெறுக",
  "Design & build studio, Mannargudi": "மன்னார்குடி வடிவமைப்பு & கட்டுமான நிறுவனம்",
  "Design it.": "வடிவமைப்போம்.", "Build it.": "கட்டுவோம்.", "Love it.": "மகிழுங்கள்.",
  "From the first sketch to the final handover, one team designs, builds and finishes your space - with fixed quotes and on-time delivery.":
    "முதல் வரைபடம் முதல் இறுதி ஒப்படைப்பு வரை, ஒரே குழு உங்கள் இடத்தை வடிவமைத்து, கட்டி, முடித்துத் தருகிறது - நிலையான மதிப்பீடு, சரியான நேரத்தில் டெலிவரி.",
  "We specialise in": "எங்கள் நிபுணத்துவம்",
  Homes: "வீடுகள்", Interiors: "உள் அலங்காரம்", Roofing: "கூரை வேலை", Villas: "வில்லாக்கள்",
  "Get free quote": "இலவச மதிப்பீடு பெறுக", "Try the Room Studio": "அறை ஸ்டுடியோவை முயற்சிக்க",
  "Free site visit": "இலவச தள ஆய்வு", "Fixed quote": "நிலையான மதிப்பீடு", "On-time handover": "சரியான நேர ஒப்படைப்பு",
  "How we build": "எப்படி கட்டுகிறோம்", "Watch your project rise, stage by stage.": "உங்கள் திட்டம் படிப்படியாக உயர்வதைப் பாருங்கள்.",
  Plan: "திட்டம்", Foundation: "அடித்தளம்", Structure: "கட்டமைப்பு", Roof: "கூரை", Interior: "உள் அலங்காரம்", Handover: "ஒப்படைப்பு",
  "Measure the plot, agree the design, fix the budget.": "நிலத்தை அளந்து, வடிவமைப்பை முடிவு செய்து, பட்ஜெட்டை நிர்ணயிக்கிறோம்.",
  "Excavation, footings and plinth - the strong base.": "அகழ்வு, அடித்தளம், பிளிந்த் - உறுதியான அடிப்படை.",
  "Columns, beams, walls and slabs go up.": "தூண்கள், உத்திரங்கள், சுவர்கள், தளங்கள் எழுகின்றன.",
  "Roof framing, sheets or slab, waterproofing.": "கூரை சட்டம், ஷீட் அல்லது தளம், நீர்ப்புகா பூச்சு.",
  "Flooring, false ceiling, kitchen, wardrobes, paint, lights.": "தரை, ஃபால்ஸ் சீலிங், சமையலறை, அலமாரிகள், பெயிண்ட், விளக்குகள்.",
  "Final checks, keys in your hand, warranty in writing.": "இறுதி சோதனை, சாவி உங்கள் கையில், உத்தரவாதம் எழுத்தில்.",
  "Room Studio": "அறை ஸ்டுடியோ", "Design your room in 10 seconds.": "10 விநாடிகளில் உங்கள் அறையை வடிவமைக்கவும்.",
  Walls: "சுவர்", Floor: "தரை", Sofa: "சோபா", Ceiling: "மேல்கூரை", Light: "வெளிச்சம்", Style: "பாணி",
  Day: "பகல்", Evening: "மாலை", Plain: "சாதாரணம்", "False ceiling": "ஃபால்ஸ் சீலிங்",
  Wood: "மரம்", Marble: "மார்பிள்", Tile: "டைல்ஸ்", Modern: "நவீனம்", Classic: "பாரம்பரியம்", Minimal: "எளிமை",
  "Send my design on WhatsApp": "என் வடிவமைப்பை வாட்ஸ்அப்பில் அனுப்பு",
  "Build Planner": "கட்டுமான திட்டமிடல்", "Know your budget before you call.": "அழைக்கும் முன் உங்கள் பட்ஜெட்டை அறியுங்கள்.",
  "Built-up area per floor": "ஒரு தளத்தின் கட்டிட பரப்பு", Floors: "தளங்கள்", Finish: "தரம்",
  Standard: "ஸ்டாண்டர்டு", Premium: "பிரீமியம்", Luxury: "லக்சரி", "Add-ons": "கூடுதல்",
  "Modular interiors": "மாடுலர் உள் அலங்காரம்", "Compound wall & gate": "காம்பவுண்ட் சுவர் & கேட்", "Roof waterproofing": "கூரை நீர்ப்புகா பூச்சு",
  "Estimated budget": "தோராய பட்ஜெட்", "Approx. time": "தோராய காலம்", months: "மாதங்கள்",
  "Where the money goes": "பணம் எங்கே செல்கிறது", "Get exact quote": "சரியான மதிப்பீடு பெறுக",
  "Start your project": "உங்கள் திட்டத்தைத் தொடங்குங்கள்", "Tell us in 6 quick taps. No forms.": "6 எளிய தேர்வுகளில் சொல்லுங்கள். படிவம் இல்லை.",
};

const LangContext = createContext({ lang: "en", setLang: () => {}, t: (s) => s });
export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("alpha_lang") || "en"; } catch { return "en"; }
  });
  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem("alpha_lang", l); } catch { /* ignore */ }
  }, []);
  useEffect(() => { document.documentElement.lang = lang === "ta" ? "ta" : "en"; }, [lang]);
  const t = useCallback((s) => (lang === "ta" && TA[s]) || s, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
