/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";

export default function QuerySPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [places, setPlaces] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    // Fetch the initial list of places and customers when the component mounts
    fetchPlaces();
  }, []);

  useEffect(() => {
    // Whenever selectedOption, from, or to change, fetch customers
    fetchCustomers();
  }, [selectedOption, from, to]);

  const fetchPlaces = () => {
    axios.get("/getAllPlaces").then(({ data }) => {
      setPlaces(data);
    });
  };

  const fetchCustomers = () => {
    // Make an API call to fetch customers based on the selected place, from, and to
    if (selectedOption && from && to) {
      axios
        .get(
          "/custNames?name=" + selectedOption + "&from=" + from + "&to=" + to
        )
        .then(({ data }) => {
          setCustomers(data);
        });
    } else {
      // If no place is selected or from/to is missing, clear the customers
      setCustomers([]);
    }
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <div>
      <AccountNav />
      <div className="text-center text-xl">
        Customers who booked certain place more than 1 lakh
      </div>
      <div className="flex py-6">
        <div className="py-6">
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="">Places</option>
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
        {customers.length > 0 &&
          customers.map((customer) => (
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl my-5">
              <div className="flex w-32 h-32 bg-gray-300 grow-0 ">
                <PlaceImg place={customer.bookings[0].placeInfo} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {customer.bookings[0].name}</h2>
                <p className="textl">{customer.userInfo.email}</p>
                <h2 className="text-xl mt-2">
                  {" "}
                  Place : {customer.bookings[0].placeInfo.title}
                </h2>
                <p className="text-l">₹{customer.totalPrice}</p>
              </div>
            </div>
          ))}
        {customers.length === 0 && (
          <div className="text-center text-xl py-8">No result</div>
        )}
      </div>
    </div>
  );
}
