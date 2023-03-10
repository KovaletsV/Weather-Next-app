import Head from "next/head";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("Dubai");
    const [loading, setLoading] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&appid=${process.env.NEXT_APP_WEATHER_KEY}`;

    // useEffect(() => {
    //     axios
    //         .get(url)
    //         .then(res => {
    //             res.json();
    //         })
    //         .then(json => setWeather(json));
    // }, []);
    const gettingWeather = e => {
        e.preventDefault();
        setLoading(true);
        axios.get(url).then(response => {
            console.log(response.data);
            setWeather(response.data);
        });
        setCity("");
        setLoading(false);
    };
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Head>
                    <title>Weather Next App</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/* Overlay */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
                <Image
                    alt="bg"
                    src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    layout="fill"
                    className="object-cover"
                />

                <div className="relative flex justify-between items-center max-w-[400px] w-full m-auto pt-4 px-4 text-white z-10">
                    <form
                        onSubmit={gettingWeather}
                        className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
                    >
                        <div>
                            <input
                                onChange={e => setCity(e.target.value)}
                                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                                type="text"
                                placeholder="Search city"
                            />
                            <button onClick={gettingWeather}>Search...</button>
                        </div>
                    </form>
                </div>
                {weather.main && <Weather data={weather} />}
            </>
        );
    }
}
