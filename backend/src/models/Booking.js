import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store date as a string (YYYY-MM-DD)
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
});

// Add a unique index to prevent duplicate bookings
bookingSchema.index({ date: 1, time: 1 }, { unique: true });

export const Booking = mongoose.model("Booking", bookingSchema);
