import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, Car, Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-bg.jpg";
import { createBooking } from "@/services/bookingService";

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Verified Drivers" },
  { value: "50+", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
];

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  pickup_city: "",
  drop_location: "",
  pickup_date: "",
  pickup_time: "",
  service_type: "",
  vehicle_type: "",
  special_notes: "",
  promo_code: "",
};

const HeroSection = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    setError("");

    // Basic client-side guard
    const required = ["full_name", "email", "phone", "pickup_city", "pickup_date", "pickup_time", "service_type", "vehicle_type"];
    const missing = required.filter((k) => !form[k]);
    if (missing.length) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await createBooking(form);
      setBookingId(res.booking_id);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professional driver with car in Pune" className="w-full h-full object-cover scale-105" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(216,100%,12%)/0.92] via-[hsl(216,100%,18%)/0.85] to-[hsl(214,100%,20%)/0.85]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(216,100%,10%)/0.8] via-[hsl(216,100%,10%)/0.4] to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Copy ── */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm drop-shadow-md">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              #1 Driver Hire Service in Pune &amp; Mumbai
            </motion.span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white drop-shadow-lg leading-[1.1] mb-8 tracking-tight">
              Hire a Professional Driver —{" "}
              <span className="gradient-text-accent drop-shadow-md">Fast, Safe &amp; Reliable</span>
            </h1>

            <ul className="space-y-3.5 text-white/95 text-base md:text-lg mb-10 drop-shadow-md">
              {["24/7 Service Availability", "Verified & Trained Drivers", "Hourly, Daily & Monthly Options", "Pune, Mumbai & Outstation Routes"].map((item, i) => (
                <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 drop-shadow-sm" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-4">
              <Button variant="accent" size="lg" className="shadow-cta-glow text-base px-8" asChild>
                <a href="tel:+919876543210">📞 Call Now</a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">💬 WhatsApp Booking</a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/20 max-md:bg-[hsl(216,100%,10%)/0.6] max-md:backdrop-blur-md max-md:p-5 max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:-mx-4 max-md:px-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-2xl text-accent drop-shadow-sm">{s.value}</p>
                  <p className="text-white/80 font-medium text-sm mt-0.5 drop-shadow-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Booking Form ── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} id="booking">
            <div className="glass rounded-3xl p-7 md:p-9 shadow-card-hover border border-border/50">

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">Book a Driver</h3>
                  <p className="text-muted-foreground text-sm">Get an instant quote — no commitment</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9 text-green-600" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-foreground mb-1">Booking Received!</h4>
                    <p className="text-muted-foreground text-sm mb-3">We'll call you within 30 minutes to confirm.</p>
                    <p className="text-xs font-mono bg-muted px-3 py-1.5 rounded-lg inline-block text-foreground">
                      ID: {bookingId}
                    </p>
                    <div className="mt-6 flex gap-3 justify-center">
                      <Button variant="accent" size="sm" asChild>
                        <a href="tel:+919876543210">📞 Call Us</a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}>
                        New Booking
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.div key="form" className="space-y-4">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <Input name="full_name" value={form.full_name} onChange={handleChange}
                        placeholder="Full Name *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                      <Input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="Phone *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                    </div>

                    {/* Email */}
                    <Input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="Email Address *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />

                    {/* Pickup city */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input name="pickup_city" value={form.pickup_city} onChange={handleChange}
                        placeholder="Pickup City " className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                    </div>

                    {/* Drop location */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input name="drop_location" value={form.drop_location} onChange={handleChange}
                        placeholder="Drop Location " className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input name="pickup_date" type="date" value={form.pickup_date} onChange={handleChange}
                          className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input name="pickup_time" type="time" value={form.pickup_time} onChange={handleChange}
                          className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
                      </div>
                    </div>

                    {/* Service type */}
                    <Select value={form.service_type} onValueChange={(v) => handleSelect("service_type", v)}>
                      <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">
                        <SelectValue placeholder="Select Service Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly Driver</SelectItem>
                        <SelectItem value="daily">Daily Driver</SelectItem>
                        <SelectItem value="outstation">Outstation Driver</SelectItem>
                        <SelectItem value="monthly">Monthly Driver</SelectItem>
                        <SelectItem value="valet">Valet / Event</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Vehicle type */}
                    <Select value={form.vehicle_type} onValueChange={(v) => handleSelect("vehicle_type", v)}>
                      <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">
                        <SelectValue placeholder="Vehicle Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV / MUV</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Notes + promo */}
                    <Input name="special_notes" value={form.special_notes} onChange={handleChange}
                      placeholder="Special notes or promo code" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />

                    {/* Error */}
                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        ⚠️ {error}
                      </p>
                    )}

                    {/* Submit */}
                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full h-13 text-base font-bold shadow-cta-glow rounded-xl"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting…</>
                      ) : (
                        <>Get Instant Quote <ArrowRight className="w-5 h-5 ml-1" /></>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      ✓ Free cancellation · ✓ No hidden charges · ✓ Instant confirmation
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 50V80H0V40Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;