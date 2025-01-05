import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface Booking {
  _id: string;
  date: string;
  time: string;
  name: string;
}

export default function CalendarView() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    axios
      .get("https://restaurant-booking-pog8.onrender.com/api/bookings")
      .then((response) => {
        setBookings(response.data);
      });
  }, [bookings]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>
      <ul className="space-y-2">
        {bookings.map((booking) => (
          <li key={booking._id} className="p-2 border rounded">
            {format(new Date(booking.date), "yyyy-MM-dd")}, {booking.time} -{" "}
            {booking.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
