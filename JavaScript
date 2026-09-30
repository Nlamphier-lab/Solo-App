// 1. Fetch hourly rain / precipitation forecast for the next 12 hours from Open-Meteo
const latitude = 40.7128;   // Replace with target latitude
const longitude = -74.0060; // Replace with target longitude

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain,precipitation_probability&forecast_hours=12`;

async function checkRain() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // 2. Logic: Check if any of the next 12 hours have rain > 0 mm (or precipitation_probability > 0%)
    const rainHours = data.hourly.rain; // Array of rain volume (mm) per hour
    const willRain = rainHours.some((rain) => rain > 0);

    // 3. Screen display
    const screenText = willRain ? "YES" : "NO";
    console.log(screenText);
    return screenText;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

checkRain();
