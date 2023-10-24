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

  useEffect(() => {
    // Fetch the initial list of places and hotels when the component mounts
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get("/getAllPlaces").then(({ data }) => {
      setPlaces(data);
    });
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Make an API call to fetch hotels based on the selected place
    if (selectedValue) {
      axios.get("/hotelNames?name=" + selectedValue).then(({ data }) => {
        setHotels(data);
      });
    } else {
      // If no place is selected, clear the hotels
      setHotels([]);
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="text-center text-xl">
        Places with revenue more than 1 lakh
      </div>
      <div>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Places </option>
          {places.map((place) => (
            <option key={place.address} value={place.address}>
              {place.address}
            </option>
          ))}
        </select>
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
