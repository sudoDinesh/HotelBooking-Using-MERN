/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function QueryfPage() {
  const [hotels, setHotels] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [places, setPlaces] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Create a function to fetch hotels based on selected place, from, and to
  const fetchHotels = () => {
    if (selectedOption && from && to) {
      axios
        .get(`/hotelNames?name=${selectedOption}&from=${from}&to=${to}`)
        .then(({ data }) => {
          setHotels(data);
        });
    }
  };

  // Use useEffect to watch for changes in selectedOption, from, and to
  useEffect(() => {
    fetchHotels(); // Initial fetch
  }, [selectedOption, from, to]);

  useEffect(() => {
    // Fetch the initial list of places when the component mounts
    axios.get("/getAllPlaces").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <div>
      <AccountNav />
      <div className="text-center text-xl">
        Places with revenue more than 1 lakh
      </div>
      <div className="flex py-6">
        <div className="py-6">
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Places </option>
            {places.map((place) => (
              <option key={place.address} value={place.address}>
                {place.address}
              </option>
            ))}
          </select>
        </div>
        <div className="flex py-3 px-0">
          <div className="py-3 px-4">
            <label>From:</label>
            <input
              type="date"
              value={from}
              onChange={(ev) => setFrom(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>To:</label>
            <input
              type="date"
              value={to}
              onChange={(ev) => setTo(ev.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {hotels.length > 0 &&
          hotels.map((hotel) => (
            <Link
              to={"/place/" + hotel.placeInfo._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl my-5"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={hotel.placeInfo} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {hotel.placeInfo.title}</h2>
                <p className="text-sm mt-2">{hotel.placeInfo.description}</p>
                <h2 className="text-xl "> Revenue : ₹{hotel.totalRevenue}</h2>
              </div>
            </Link>
          ))}
        {hotels.length == 0 && (
          <div className="text-center text-xl py-8">No result</div>
        )}
      </div>
    </div>
  );
}
