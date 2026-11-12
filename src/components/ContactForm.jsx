import { useState } from "react";
import { contactAPI } from "../services/api";
import { waLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const initialForm = { name: "", email: "", phone: "", projectType: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    const digits = form.phone.replace(/[\s-]/g, "");
    if (!digits) e.phone = "Please enter your mobile number.";
    else if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Tell us a little about your project.";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const { data } = await contactAPI.submit({ ...form, source: "contact-page" });
      setStatus("success");
      setServerMessage(data.message || "Thanks — we'll be in touch soon.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-lg">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="text-sm text-stone">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-stone">
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="text-sm text-stone">
            Mobile number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="projectType" className="text-sm text-stone">
            Project type
          </label>
          <select
            id="projectType"
            value={form.projectType}
            onChange={handleChange("projectType")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          >
            <option value="">Select one</option>
            <option>Modular Kitchen</option>
            <option>Full Home Interior</option>
            <option>False Ceiling / Wardrobe</option>
            <option>Roofing Work</option>
            <option>Shed / Truss Work</option>
            <option>Waterproofing / Repair</option>
            <option>Office / Shop Interior</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-stone">
          Tell us about your project
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
        />
        {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
        <a
          href={waLink(`Hi Alpha Designers, I'm ${form.name || "interested"}. ${form.projectType ? `I need: ${form.projectType}. ` : ""}${form.message || ""}`.trim())}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-md text-sm font-semibold hover:brightness-110 transition"
        >
          <WaIcon size={18} /> Send on WhatsApp
        </a>
      </div>

      {status === "success" && (
        <p className="text-emerald-600 font-medium text-sm" role="status">
          {serverMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm" role="alert">
          {serverMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
