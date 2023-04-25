import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
import { useEffect } from "react";
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      });
  }, []);
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh_cn" : "en");
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>Weather - Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/10 z-[1]" />
        <Image src="/main1.avif" alt="" fill className="object-cover z-2" />
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                onChange={(ev) => setCity(ev.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                type="text"
                placeholder="Search City"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
          {/*<button onClick={toggleLanguage}>
            {language === "en" ? "中文" : "English"}
    </button>*/}
        </div>
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
