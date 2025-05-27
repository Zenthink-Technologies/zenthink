import { useEffect, useState } from "react";

const TimeAndLocation = () => {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Start fetching both
    let fetchedTime = false;
    let fetchedLocation = false;

    // Update time every second
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
      fetchedTime = true;
      if (fetchedTime && fetchedLocation) setIsFetching(false);
    }, 1000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown";
            const country = data.address.country || "";
            setLocation(`${city}, ${country}`);
            fetchedLocation = true;
            if (fetchedTime && fetchedLocation) setIsFetching(false);
          } catch (error) {
            setLocation("Unable to fetch location");
            setIsFetching(false);
          }
        },
        () => {
          setLocation("Permission denied");
          setIsFetching(false);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setIsFetching(false);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-[17px] text-white/50 text-start leading-5">
      {isFetching ? (
        "Thinking..."
      ) : (
        <>
          Time <b className="font-sans font-semibold text-[13.5px]">{time}</b> —{" "}
          {location}
        </>
      )}
    </p>
  );
};

export default TimeAndLocation;
