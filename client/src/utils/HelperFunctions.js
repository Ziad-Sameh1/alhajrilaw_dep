export function asyncTimeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function NodeJSDateToJS(date) {
  try {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return { year: year, month: month, day: day };
  } catch (err) {
    console.log(err);
  }
  return { year: -1, month: -1, day: -1 };
}

export function formatDateString(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Define arrays for days and months for formatting
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Get day, date, month, and year
  const day = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Get hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM/PM and adjust hours
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the formatted date string
  const formattedDate = `${day}, ${dayOfMonth} ${month} ${year} ${hours}:${formattedMinutes}${ampm}`;

  return formattedDate;
}