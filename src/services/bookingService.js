// // src/services/bookingService.js
// // Drop this file in your React frontend and import where needed

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// /**
//  * Submit a new booking
//  * @param {Object} formData  — fields from your HeroSection form
//  * @returns {Object}         — { success, booking_id, message }
//  */
// export async function createBooking(formData) {
//   const res = await fetch(`${API_BASE}/bookings`, {
//     method:  "POST",
//     headers: { "Content-Type": "application/json" },
//     body:    JSON.stringify(formData),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     const msg = data?.errors?.[0]?.msg || data?.message || "Booking failed.";
//     throw new Error(msg);
//   }

//   return data;
// }

// /**
//  * Fetch a single booking by UUID (for confirmation page)
//  */
// export async function getBooking(bookingId) {
//   const res  = await fetch(`${API_BASE}/bookings/${bookingId}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message);
//   return data;
// }



//testing




// src/services/bookingService.js

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_BASE = import.meta.env.VITE_API_URL || "https://pune-driver-backend-1.onrender.com/api";

/**
 * Submit a new booking
 * Maps frontend form fields → backend field names
 */
export async function createBooking(formData) {
  // Build payload — map frontend field names to backend field names
  const payload = {
    full_name:     formData.full_name,
    email:         formData.email,
    phone:         formData.phone,
    // Support both old field name (pickup_city) and Google Maps field (pickup_address)
    pickup_city:   formData.pickup_city    || formData.pickup_address || "",
    drop_location: formData.drop_location  || formData.drop_address   || "",
    pickup_date:   formData.pickup_date,
    pickup_time:   formData.pickup_time,
    service_type:  formData.service_type,
    vehicle_type:  formData.vehicle_type,
    special_notes: formData.special_notes  || "",
    promo_code:    formData.promo_code     || "",
  };

  console.log("📦 Sending booking payload:", payload);

  const res  = await fetch(`${API_BASE}/bookings`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    // Show the first validation error message to the user
    const msg = data?.errors?.[0]?.msg || data?.message || "Booking submission failed.";
    console.error("❌ Booking error:", data);
    throw new Error(msg);
  }

  return data;
}

/**
 * Fetch a single booking by UUID
 */
export async function getBooking(bookingId) {
  const res  = await fetch(`${API_BASE}/bookings/${bookingId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}