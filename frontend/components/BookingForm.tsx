import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const availableSlots = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const BookingForm: React.FC = () => {
  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    guests: 1,
    name: "",
    contact: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    try {
      const response = await axios.post(
        "https://restaurant-booking-pog8.onrender.com/api/bookings",
        form
      );
      setForm({
        date: new Date(),
        time: "",
        guests: 1,
        name: "",
        contact: "",
      });
      router.push({
        pathname: "/booking-summary",
        query: {
          date: response.data.booking.date,
          time: response.data.booking.time,
          guests: response.data.booking.guests,
          name: response.data.booking.name,
          contact: response.data.booking.contact,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Unknown error occurred."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Date</label>
          <ReactDatePicker
            selected={form.date}
            onChange={(date: Date | null) => {
              if (date) {
                setForm({ ...form, date });
              }
            }}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Time</label>
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            className="p-2 border rounded w-full"
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Number of Guests</label>
          <input
            type="number"
            value={form.guests}
            onChange={(e) =>
              setForm({ ...form, guests: parseInt(e.target.value, 10) })
            }
            required
            min="1"
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Contact</label>
          <input
            type="text"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
