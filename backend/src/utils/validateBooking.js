const validateBooking = (data) => {
  const { date, time, guests, name, contact } = data;
  if (!date || !time || !guests || !name || !contact) {
    return "All fields are required.";
  }
  if (guests < 1 || guests > 20) {
    return "Number of guests must be between 1 and 20.";
  }
  return null;
};

export default validateBooking;
