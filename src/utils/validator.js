export const handleDateValidator = (_, dateStrings) => {
  const currentDate = new Date();
  const selectedDate = new Date(dateStrings);
  const minDate = new Date("1920-01-01");

  if (
    selectedDate instanceof Date &&
    !isNaN(selectedDate) &&
    selectedDate >= minDate &&
    selectedDate <= currentDate
  ) {
    return Promise.resolve();
  }

  return Promise.reject(
    "Please enter a date of birth between 1920 and the current date."
  );
};


