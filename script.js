// 1. Fetch hourly rain / precipitation forecast for the next 12 hours from Open-Meteo
const latitude = 40.7128;   // Target latitude
const longitude = -74.0060; // Target longitude

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain,precipitation_probability&forecast_hours=12`;

async function checkRain() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // 2. Logic: Check if any of the next 12 hours have rain > 0 mm
    const rainHours = data?.hourly?.rain || [];
    const willRain = rainHours.some((rain) => rain > 0);

    // 3. Screen display
    const screenText = willRain ? "YES" : "NO";
    
    // Update HTML element on screen if present, otherwise log to console
    const displayElement = document.getElementById("display"); 
    if (displayElement) {
      displayElement.textContent = screenText;
    }

    console.log("Rain in next 12 hours?", screenText);
    return screenText;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

checkRain();
