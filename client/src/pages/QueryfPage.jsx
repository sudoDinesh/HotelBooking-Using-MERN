/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function QueryfPage() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios.get("/hotelNames").then(({ data }) => {
      setHotels(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center text-xl">
        Places with revenue more than 1 lakhs
      </div>
      <div className="mt-4">
        {hotels.length > 0 &&
          hotels.map((hotel) => (
            <Link
              to={"/account/places/" + hotel.placeInfo._id}
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
      </div>
    </div>
  );
}
