# Weather Forecast

A user-friendly weather forecast website that provides real-time and future weather updates for locations worldwide. This project utilizes modern web development tools and APIs to deliver accurate and dynamic weather data.

## <a href="https://weather-forecast-dave.vercel.app/" target="_blank" rel="noopener noreferrer">Live</a>

---

## Version Comparison

| V1                                                                                                                                                                   | V2                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://raw.githubusercontent.com/BuffDave/Weather-Forecast/main/docs/screenshots/v1.png"><img src="docs/screenshots/v1.png" alt="Weather Forecast V1"></a> | <a href="https://raw.githubusercontent.com/BuffDave/Weather-Forecast/main/docs/screenshots/v2.png"><img src="docs/screenshots/v2.png" alt="Weather Forecast V2"></a> |

---

## What Changed in V2

### Design

- Cleaner, more modern design for a better look and feel.
- Better mobile and tablet responsiveness.
- Improved header/menu with quick Portfolio and GitHub access.
- Enhanced feedback form design and clearer form status messages.

### Performance

- Faster and lighter performance by removing heavy effects.
- Better SEO setup for improved search visibility.

### Security

- Added extra security settings for safer deployment.

### Bug Fixes

- Fixed feedback form not working.

---

## Features

- **Current Weather**: View up-to-date temperature, humidity, wind speed, and more.
- **5-Day Forecast**: Check detailed weather predictions for the next five days.
- **Search Locations**: Easily search for cities or locations around the world.
- **Responsive Design**: Optimized for use on desktop, tablet, and mobile devices.
- **Dynamic Weather Icons**: Interactive icons and visuals that reflect real-time conditions.

---

## Tech Stack

- **Frontend**: HTML, SCSS, JavaScript, Vite
- **API/Service**: OpenWeather API
- **Styling**: Bootstrap
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1) Clone the Repository

```bash
git clone https://github.com/BuffDave/Weather-Forecast.git
```

### 2) Go to the Project Folder

```bash
cd Weather-Forecast
```

### 3) Install Dependencies

```bash
npm install
```

### 4) Create Environment File

**Get Your OpenWeather API Key**

1. Go to [OpenWeather](https://openweathermap.org/).
2. Create an account or sign in.
3. Open your account menu and go to **My API keys**.
4. Copy your API key (it may take a few minutes to become active).

**Add Environment Variables**

Create a `.env.local` file in the project root:

```env
VITE_API_URL=https://api.openweathermap.org
VITE_API_KEY=your_openweather_api_key
```

### 5) Run Locally

```bash
npm run dev
```

### 6) Build for Production

```bash
npm run build
npm run preview
```

---

## Known Limitations

- API keys are currently used in a client-side app and can be visible in browser network requests.
- Weather data depends on OpenWeather availability.
- Free-tier OpenWeather limits may affect availability during high traffic.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: arinodavejoshua@gmail.com
