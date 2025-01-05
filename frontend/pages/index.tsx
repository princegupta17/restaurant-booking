import BookingForm from "../components/BookingForm";
import CalendarView from "../components/CalendarView";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Restaurant Booking System
      </h1>
      <div className="max-w-4xl mx-auto">
        <BookingForm />
        <CalendarView />
      </div>
    </div>
  );
}
