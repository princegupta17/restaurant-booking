import { Booking } from "../models/Booking.js";
import validateBooking from "../utils/validateBooking.js";

const createBooking = async (req, res) => {
  const error = validateBooking(req.body);
  if (error) return res.status(400).json({ message: error });

  const { date, time, guests, name, contact } = req.body;
  try {
    // Ensure date is in the correct format (only YYYY-MM-DD)
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Check if a booking already exists for the same date and time
    const existingBooking = await Booking.findOne({
      date: formattedDate,
      time,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked." });
    }

    // Create and save the new booking
    const booking = new Booking({
      date: formattedDate,
      time,
      guests,
      name,
      contact,
    });
    await booking.save();

    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Rest of the code remains unchanged
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};

export { createBooking, getBookings, deleteBooking };
