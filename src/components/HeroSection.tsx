// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { CalendarIcon, MapPin, Car, Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import heroImage from "@/assets/hero-bg.jpg";
// import { createBooking } from "@/services/bookingService";

// const stats = [
//   { value: "10,000+", label: "Happy Customers" },
//   { value: "500+", label: "Verified Drivers" },
//   { value: "50+", label: "Cities Covered" },
//   { value: "4.8★", label: "Average Rating" },
// ];

// const INITIAL_FORM = {
//   full_name: "",
//   email: "",
//   phone: "",
//   pickup_city: "",
//   drop_location: "",
//   pickup_date: "",
//   pickup_time: "",
//   service_type: "",
//   vehicle_type: "",
//   special_notes: "",
//   promo_code: "",
// };

// const HeroSection = () => {
//   const [form, setForm] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [bookingId, setBookingId] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSelect = (name, value) =>
//     setForm((prev) => ({ ...prev, [name]: value }));

//   const handleSubmit = async () => {
//     setError("");

//     // Basic client-side guard
//     const required = ["full_name", "email", "phone", "pickup_city", "pickup_date", "pickup_time", "service_type", "vehicle_type"];
//     const missing = required.filter((k) => !form[k]);
//     if (missing.length) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await createBooking(form);
//       setBookingId(res.booking_id);
//       setSubmitted(true);
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
//       {/* Background layers */}
//       <div className="absolute inset-0">
//         <img src={heroImage} alt="Professional driver with car in Pune" className="w-full h-full object-cover scale-105" loading="eager" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[hsl(216,100%,12%)/0.92] via-[hsl(216,100%,18%)/0.85] to-[hsl(214,100%,20%)/0.85]" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[hsl(216,100%,10%)/0.8] via-[hsl(216,100%,10%)/0.4] to-transparent" />
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
//         />
//       </div>

//       {/* Decorative blobs */}
//       <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

//       <div className="relative container mx-auto px-4 lg:px-8 pt-36 pb-16">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">

//           {/* ── Left: Copy ── */}
//           <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
//             <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
//               className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm drop-shadow-md">
//               <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
//               #1 Driver Hire Service in Pune &amp; Mumbai
//             </motion.span>

//             <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white drop-shadow-lg leading-[1.1] mb-8 tracking-tight">
//               Hire a Professional Driver —{" "}
//               <span className="gradient-text-accent drop-shadow-md">Fast, Safe &amp; Reliable</span>
//             </h1>

//             <ul className="space-y-3.5 text-white/95 text-base md:text-lg mb-10 drop-shadow-md">
//               {["24/7 Service Availability", "Verified & Trained Drivers", "Hourly, Daily & Monthly Options", "Pune, Mumbai & Outstation Routes"].map((item, i) => (
//                 <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-3 font-medium">
//                   <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 drop-shadow-sm" />
//                   {item}
//                 </motion.li>
//               ))}
//             </ul>

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-4">
//               <Button variant="accent" size="lg" className="shadow-cta-glow text-base px-8" asChild>
//                 <a href="tel:+919876543210">📞 Call Now</a>
//               </Button>
//               <Button variant="heroOutline" size="lg" className="text-base px-8" asChild>
//                 <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">💬 WhatsApp Booking</a>
//               </Button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
//               className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/20 max-md:bg-[hsl(216,100%,10%)/0.6] max-md:backdrop-blur-md max-md:p-5 max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:-mx-4 max-md:px-6">
//               {stats.map((s) => (
//                 <div key={s.label}>
//                   <p className="font-display font-bold text-2xl text-accent drop-shadow-sm">{s.value}</p>
//                   <p className="text-white/80 font-medium text-sm mt-0.5 drop-shadow-sm">{s.label}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* ── Right: Booking Form ── */}
//           <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} id="booking">
//             <div className="glass rounded-3xl p-7 md:p-9 shadow-card-hover border border-border/50">

//               {/* Header */}
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
//                   <Car className="w-5 h-5 text-primary-foreground" />
//                 </div>
//                 <div>
//                   <h3 className="font-display font-bold text-xl text-foreground">Book a Driver</h3>
//                   <p className="text-muted-foreground text-sm">Get an instant quote — no commitment</p>
//                 </div>
//               </div>

//               <AnimatePresence mode="wait">
//                 {/* ── Success state ── */}
//                 {submitted ? (
//                   <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
//                     <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
//                       <CheckCircle2 className="w-9 h-9 text-green-600" />
//                     </div>
//                     <h4 className="font-display font-bold text-lg text-foreground mb-1">Booking Received!</h4>
//                     <p className="text-muted-foreground text-sm mb-3">We'll call you within 30 minutes to confirm.</p>
//                     <p className="text-xs font-mono bg-muted px-3 py-1.5 rounded-lg inline-block text-foreground">
//                       ID: {bookingId}
//                     </p>
//                     <div className="mt-6 flex gap-3 justify-center">
//                       <Button variant="accent" size="sm" asChild>
//                         <a href="tel:+919876543210">📞 Call Us</a>
//                       </Button>
//                       <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}>
//                         New Booking
//                       </Button>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   /* ── Form state ── */
//                   <motion.div key="form" className="space-y-4">
//                     {/* Name + Phone */}
//                     <div className="grid grid-cols-2 gap-3">
//                       <Input name="full_name" value={form.full_name} onChange={handleChange}
//                         placeholder="Full Name *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                       <Input name="phone" value={form.phone} onChange={handleChange}
//                         placeholder="Phone *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                     </div>

//                     {/* Email */}
//                     <Input name="email" type="email" value={form.email} onChange={handleChange}
//                       placeholder="Email Address *" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />

//                     {/* Pickup city */}
//                     <div className="relative">
//                       <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                       <Input name="pickup_city" value={form.pickup_city} onChange={handleChange}
//                         placeholder="Pickup City " className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                     </div>

//                     {/* Drop location */}
//                     <div className="relative">
//                       <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                       <Input name="drop_location" value={form.drop_location} onChange={handleChange}
//                         placeholder="Drop Location " className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                     </div>

//                     {/* Date + Time */}
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="relative">
//                         <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                         <Input name="pickup_date" type="date" value={form.pickup_date} onChange={handleChange}
//                           className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                       </div>
//                       <div className="relative">
//                         <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                         <Input name="pickup_time" type="time" value={form.pickup_time} onChange={handleChange}
//                           className="pl-11 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />
//                       </div>
//                     </div>

//                     {/* Service type */}
//                     <Select value={form.service_type} onValueChange={(v) => handleSelect("service_type", v)}>
//                       <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">
//                         <SelectValue placeholder="Select Service Type *" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="hourly">Hourly Driver</SelectItem>
//                         <SelectItem value="daily">Daily Driver</SelectItem>
//                         <SelectItem value="outstation">Outstation Driver</SelectItem>
//                         <SelectItem value="monthly">Monthly Driver</SelectItem>
//                         <SelectItem value="valet">Valet / Event</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     {/* Vehicle type */}
//                     <Select value={form.vehicle_type} onValueChange={(v) => handleSelect("vehicle_type", v)}>
//                       <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/60">
//                         <SelectValue placeholder="Vehicle Type *" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="hatchback">Hatchback</SelectItem>
//                         <SelectItem value="sedan">Sedan</SelectItem>
//                         <SelectItem value="suv">SUV / MUV</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     {/* Notes + promo */}
//                     <Input name="special_notes" value={form.special_notes} onChange={handleChange}
//                       placeholder="Special notes or promo code" className="h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-card" />

//                     {/* Error */}
//                     {error && (
//                       <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//                         ⚠️ {error}
//                       </p>
//                     )}

//                     {/* Submit */}
//                     <Button
//                       variant="accent"
//                       size="lg"
//                       className="w-full h-13 text-base font-bold shadow-cta-glow rounded-xl"
//                       onClick={handleSubmit}
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting…</>
//                       ) : (
//                         <>Get Instant Quote <ArrowRight className="w-5 h-5 ml-1" /></>
//                       )}
//                     </Button>

//                     <p className="text-center text-xs text-muted-foreground">
//                       ✓ Free cancellation · ✓ No hidden charges · ✓ Instant confirmation
//                     </p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Bottom wave separator */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
//           <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 50V80H0V40Z" fill="hsl(var(--background))" />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


//testing


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon, Car, Clock, CheckCircle2,
  ArrowRight, Loader2, Target, MapPin, ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import heroImage from "@/assets/hero-bg.jpg";
import heroImage from "@/assets/hero-driver.jpg";
import { createBooking } from "@/services/bookingService";

const GOOGLE_MAPS_LIBRARIES: ("places")[] = ["places"];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+",    label: "Verified Drivers"  },
  { value: "50+",     label: "Cities Covered"    },
  { value: "4.8★",   label: "Average Rating"     },
];

const INITIAL_FORM = {
  full_name:     "",
  email:         "",
  phone:         "",
  pickup_city:   "",   // matches backend field
  drop_location: "",   // matches backend field
  pickup_date:   format(new Date(), "yyyy-MM-dd"),
  pickup_time:   "",
  service_type:  "",
  vehicle_type:  "",
  special_notes: "",
  promo_code:    "",
};

// ─────────────────────────────────────────────────────────────────────────────
//  TimePicker — popover with Hr / Min / AM-PM grid buttons
// ─────────────────────────────────────────────────────────────────────────────
interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const parse = (v: string) => {
    if (!v) return { h: "12", m: "00", ap: "AM" as "AM" | "PM" };
    const [hh, mm] = v.split(":");
    const h24 = parseInt(hh, 10);
    const ap: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return { h: String(h12), m: mm || "00", ap };
  };

  const { h: ih, m: im, ap: ia } = parse(value);
  const [hour,   setHour]   = useState(ih);
  const [minute, setMinute] = useState(im);
  const [ampm,   setAmpm]   = useState<"AM" | "PM">(ia);
  const [open,   setOpen]   = useState(false);

  const emit = (h: string, m: string, ap: "AM" | "PM") => {
    let h24 = parseInt(h, 10);
    if (ap === "AM" && h24 === 12) h24 = 0;
    if (ap === "PM" && h24 !== 12) h24 += 12;
    onChange(`${String(h24).padStart(2, "0")}:${m}`);
  };

  const onH = (v: string) => { setHour(v);   emit(v, minute, ampm); };
  const onM = (v: string) => { setMinute(v); emit(hour, v, ampm); };
  const onA = (v: "AM" | "PM") => { setAmpm(v); emit(hour, minute, v); };

  const display = value
    ? (() => { const { h, m, ap } = parse(value); return `${h.padStart(2,"0")}:${m} ${ap}`; })()
    : "Select time";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex-1 h-11 flex items-center justify-between px-0",
            "bg-transparent text-sm font-medium focus:outline-none",
            value ? "text-white" : "text-white/35"
          )}
        >
          <span>{display}</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0 z-[200] border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
        style={{ background: "#0d1b2e" }}
        align="start"
        sideOffset={6}
      >
        {/* Live preview */}
        <div className="px-4 pt-4 pb-3 border-b border-white/10">
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
            Pickup Time
          </p>
          <p className="text-white text-3xl font-bold font-mono tracking-widest leading-none">
            {hour.padStart(2, "0")}
            <span className="text-white/30 mx-1">:</span>
            {minute}
            <span className="text-accent text-xl ml-2">{ampm}</span>
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Hours 1–12 */}
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Hour</p>
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => onH(h)}
                  className={cn(
                    "h-9 rounded-lg text-sm font-semibold transition-all duration-100",
                    hour === h
                      ? "bg-accent text-white shadow-lg scale-105"
                      : "bg-white/5 text-white/60 hover:bg-white/15 hover:text-white"
                  )}
                >
                  {h.padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes */}
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Minute</p>
            <div className="grid grid-cols-6 gap-1.5">
              {["00","05","10","15","20","25","30","35","40","45","50","55"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onM(m)}
                  className={cn(
                    "h-9 rounded-lg text-sm font-semibold transition-all duration-100",
                    minute === m
                      ? "bg-accent text-white shadow-lg scale-105"
                      : "bg-white/5 text-white/60 hover:bg-white/15 hover:text-white"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* AM / PM */}
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Period</p>
            <div className="grid grid-cols-2 gap-2">
              {(["AM", "PM"] as const).map((ap) => (
                <button
                  key={ap}
                  type="button"
                  onClick={() => onA(ap)}
                  className={cn(
                    "h-10 rounded-xl text-sm font-bold tracking-wider transition-all duration-100",
                    ampm === ap
                      ? "bg-accent text-white shadow-lg"
                      : "bg-white/5 text-white/50 hover:bg-white/15 hover:text-white"
                  )}
                >
                  {ap}
                </button>
              ))}
            </div>
          </div>

          {/* Confirm */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full h-10 rounded-xl bg-accent/20 border border-accent/30
                       text-accent text-sm font-bold hover:bg-accent hover:text-white
                       transition-all duration-150"
          >
            Confirm ✓
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  LocationInput — Google Places Autocomplete with typed-text fallback
//  FIX: uses onPlaceChanged to capture selected suggestion AND
//       onChange to save whatever is typed (works offline too)
// ─────────────────────────────────────────────────────────────────────────────
interface LocationInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  isLoaded: boolean;
  className?: string;
}

const LocationInput = ({ value, onChange, placeholder, isLoaded, className }: LocationInputProps) => {
  const acRef  = useRef<google.maps.places.Autocomplete | null>(null);
  const inpRef = useRef<HTMLInputElement>(null);

  // Reset input text when form is cleared
  useEffect(() => {
    if (inpRef.current && value === "") inpRef.current.value = "";
  }, [value]);

  const onPlaceChanged = () => {
    if (!acRef.current) return;
    const place = acRef.current.getPlace();
    const addr  = place.formatted_address || place.name || inpRef.current?.value || "";
    onChange(addr);
    // Sync visible input text with resolved address
    if (inpRef.current) inpRef.current.value = addr;
  };

  const sharedCls = cn(
    "h-11 w-full bg-transparent border-0 outline-none ring-0 shadow-none",
    "text-sm text-white placeholder:text-white/40",
    className
  );

  if (!isLoaded) {
    return (
      <input
        ref={inpRef}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={sharedCls}
        autoComplete="off"
      />
    );
  }

  return (
    <Autocomplete
      onLoad={(ac) => { acRef.current = ac; }}
      onPlaceChanged={onPlaceChanged}
      options={{
        componentRestrictions: { country: "in" },
        fields: ["formatted_address", "name"],
        types: ["geocode", "establishment"],
      }}
    >
      <input
        ref={inpRef}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={sharedCls}
        autoComplete="off"
      />
    </Autocomplete>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  HeroSection
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [form,      setForm]      = useState(INITIAL_FORM);
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error,     setError]     = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    setError("");
    const required = ["full_name", "email", "phone", "pickup_city", "pickup_date", "pickup_time", "service_type", "vehicle_type"];
    const missing  = required.filter((k) => !form[k as keyof typeof form]);
    if (missing.length) { setError("Please fill in all required fields."); return; }

    setLoading(true);
    try {
      const res = await createBooking(form);
      setBookingId(res.booking_id);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "h-11 rounded-xl text-sm bg-white/10 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent/60";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0">

        {/* Desktop: hero photo */}
        <img
          src={heroImage}
          alt="Professional driver with car in Pune"
          className="hidden md:block w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Mobile: clean dark bg, no image */}
        <div className="md:hidden absolute inset-0 bg-[#050d1a]" />

        {/* Desktop overlay — strong on left so text reads, gentle on right so photo shows */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(3,8,20,0.97) 0%, rgba(3,8,20,0.90) 38%, rgba(4,10,26,0.55) 62%, rgba(6,14,36,0.15) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[rgba(3,8,20,0.80)] via-transparent to-transparent" />

        {/* Noise */}
        <div
          className="hidden md:block absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
        />
      </div>

      {/* Glows */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

      {/* ── CONTENT ── */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-20 md:pt-36 pb-16 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center">

          {/* Mobile: badge + headline */}
          <div className="order-1 lg:hidden mb-5">
            <motion.span
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-semibold mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              #1 Driver Hire Service · Pune &amp; Mumbai
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="font-display text-[1.65rem] font-extrabold text-white leading-[1.2] tracking-tight"
            >
              Hire a Professional Driver —{" "}
              <span className="text-accent">Fast, Safe &amp; Reliable</span>
            </motion.h1>
          </div>

          {/* ── FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            id="booking" className="order-2 lg:order-last"
          >
            <div className="rounded-3xl p-5 sm:p-6 md:p-8
                            bg-white/[0.06] backdrop-blur-xl
                            border border-white/[0.12] shadow-2xl shadow-black/40">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[1.05rem] text-white">Book a Driver</h3>
                  <p className="text-white/50 text-xs">Get an instant quote — no commitment</p>
                </div>
              </div>

              <AnimatePresence mode="wait">

                {submitted ? (
                  /* SUCCESS */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white mb-1">Booking Received!</h4>
                    <p className="text-white/60 text-sm mb-3">We'll contact you within 30 minutes to confirm.</p>
                    <p className="text-xs font-mono bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg inline-block text-white/80">
                      ID: {bookingId}
                    </p>
                    <div className="mt-5 flex gap-3 justify-center">
                      {/* "Call Us" button removed as requested */}
                      <Button
                        variant="outline" size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                      >
                        New Booking
                      </Button>
                    </div>
                  </motion.div>

                ) : (

                  /* FORM */
                  <motion.div key="form" className="space-y-2.5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <Input name="full_name" value={form.full_name} onChange={handleChange}
                        placeholder="Full Name *" className={inputCls} />
                      <Input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="Phone *" className={inputCls} />
                    </div>

                    <Input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="Email Address *" className={inputCls} />

                    {/* Location — Google Autocomplete */}
                    <div className="rounded-2xl bg-white/10 border border-white/15 overflow-visible divide-y divide-white/10">
                      <div className="flex items-center px-3 gap-2">
                        <Target className="w-4 h-4 text-accent flex-shrink-0" />
                        <LocationInput
                          value={form.pickup_city}
                          onChange={(val) => setForm((prev) => ({ ...prev, pickup_city: val }))}
                          placeholder="Pickup location *"
                          isLoaded={isLoaded}
                        />
                      </div>
                      <div className="flex items-center px-3 gap-2">
                        <MapPin className="w-4 h-4 text-white/40 flex-shrink-0" />
                        <LocationInput
                          value={form.drop_location}
                          onChange={(val) => setForm((prev) => ({ ...prev, drop_location: val }))}
                          placeholder="Drop location "
                          isLoaded={isLoaded}
                        />
                      </div>
                    </div>

                    {/* Date + Time — unified card */}
                    <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] overflow-visible divide-y divide-white/[0.08]">

                      {/* Date */}
                      <div className="flex items-center gap-2 px-3">
                        <CalendarIcon className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider w-10 flex-shrink-0">
                          Date
                        </span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                "flex-1 h-11 flex items-center justify-between text-sm font-medium bg-transparent focus:outline-none",
                                form.pickup_date ? "text-white" : "text-white/35"
                              )}
                            >
                              <span>
                                {form.pickup_date
                                  ? format(new Date(form.pickup_date + "T00:00:00"), "EEE, MMM d yyyy")
                                  : "Select date"}
                              </span>
                              <ChevronDown className="w-3.5 h-3.5 text-white/30" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 z-[200]" align="start">
                            <Calendar
                              mode="single"
                              selected={form.pickup_date ? new Date(form.pickup_date + "T00:00:00") : undefined}
                              onSelect={(date) => date && handleSelect("pickup_date", format(date, "yyyy-MM-dd"))}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                              className="rounded-xl border shadow-xl"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2 px-3">
                        <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider w-10 flex-shrink-0">
                          Time
                        </span>
                        <TimePicker
                          value={form.pickup_time}
                          onChange={(val) => setForm((prev) => ({ ...prev, pickup_time: val }))}
                        />
                      </div>
                    </div>

                    {/* Service + Vehicle */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <Select value={form.service_type} onValueChange={(v) => handleSelect("service_type", v)}>
                        <SelectTrigger className="h-11 rounded-xl text-sm bg-white/10 border-white/15 text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Service Type *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly Driver</SelectItem>
                          <SelectItem value="daily">Daily Driver</SelectItem>
                          <SelectItem value="outstation">Outstation</SelectItem>
                          <SelectItem value="monthly">Monthly Driver</SelectItem>
                          <SelectItem value="valet">Valet / Event</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={form.vehicle_type} onValueChange={(v) => handleSelect("vehicle_type", v)}>
                        <SelectTrigger className="h-11 rounded-xl text-sm bg-white/10 border-white/15 text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Vehicle *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV / MUV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Input
                      name="special_notes" value={form.special_notes} onChange={handleChange}
                      placeholder="Special notes or promo code" className={inputCls}
                    />

                    {error && (
                      <p className="text-xs text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-3 py-2">
                        ⚠️ {error}
                      </p>
                    )}

                    <Button
                      variant="accent" size="lg"
                      className="w-full h-12 text-base font-bold shadow-cta-glow rounded-xl mt-1"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading
                        ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting…</>
                        : <>Get Instant Quote <ArrowRight className="w-5 h-5 ml-1" /></>
                      }
                    </Button>

                    <p className="text-center text-[11px] text-white/35 flex flex-wrap justify-center gap-x-3">
                      <span>✓ Free cancellation</span>
                      <span>✓ No hidden charges</span>
                      <span>✓ Instant confirmation</span>
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── HERO COPY (desktop left / mobile below) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-3 lg:order-first mt-8 lg:mt-0"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="hidden lg:inline-flex items-center gap-2 bg-accent/15 border border-accent/25 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              #1 Driver Hire Service in Pune &amp; Mumbai
            </motion.span>

            <h1 className="hidden lg:block font-display text-4xl md:text-5xl lg:text-[3.4rem]
                           font-extrabold text-white drop-shadow-lg leading-[1.1] mb-8 tracking-tight">
              Hire a Professional Driver —{" "}
              <span className="gradient-text-accent drop-shadow-md">Fast, Safe &amp; Reliable</span>
            </h1>

            <ul className="space-y-3 text-white/90 text-[0.95rem] md:text-lg mb-8">
              {["24/7 Service Availability","Verified & Trained Drivers","Hourly, Daily & Monthly Options","Pune, Mumbai & Outstation Routes"].map((item, i) => (
                <motion.li key={item}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Button variant="accent" size="lg" className="shadow-cta-glow text-base px-8" asChild>
                <a href="tel:+919876543210">📞 Call Now</a>
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp Booking
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/15
                         bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none
                         px-5 md:px-0 py-5 md:py-0 rounded-2xl md:rounded-none -mx-1 md:mx-0"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-2xl text-accent drop-shadow-sm">{s.value}</p>
                  <p className="text-white/70 font-medium text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 50V80H0V40Z" fill="hsl(var(--background))" />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;