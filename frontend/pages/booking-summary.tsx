import { useRouter } from "next/router";

export default function BookingSummary() {
  const router = useRouter();
  const { date, time, guests, name, contact } = router.query;
  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      <p>
        <strong>Date: {date}</strong>
      </p>
      <p>
        <strong>Time: {time}</strong>
      </p>
      <p>
        <strong>Guests: {guests}</strong>
      </p>
      <p>
        <strong>Name: {name}</strong>
      </p>
      <p>
        <strong>Contact: {contact}</strong>
      </p>
    </div>
  );
}
