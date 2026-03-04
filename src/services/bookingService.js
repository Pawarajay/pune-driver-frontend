// src/services/bookingService.js
// Drop this file in your React frontend and import where needed

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Submit a new booking
 * @param {Object} formData  — fields from your HeroSection form
 * @returns {Object}         — { success, booking_id, message }
 */
export async function createBooking(formData) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = data?.errors?.[0]?.msg || data?.message || "Booking failed.";
    throw new Error(msg);
  }

  return data;
}

/**
 * Fetch a single booking by UUID (for confirmation page)
 */
export async function getBooking(bookingId) {
  const res  = await fetch(`${API_BASE}/bookings/${bookingId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}