/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";

export default function QueryTPage() {
  const [customers, setCustomers] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    // Function to fetch customers based on selected date range
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "/highlyValuedCust?from=" + from + "&to=" + to
        );
        setCustomers(response.data);
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error fetching customers:", error);
      }
    };

    // Fetch customers when either 'from' or 'to' values change
    if (from && to) {
      fetchCustomers();
    }
  }, [from, to]);

  return (
    <div>
      <AccountNav />
      <div className="text-left text-xl">Highly valued customer</div>
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
      <div className="mt-4">
        {customers.length > 0 &&
          customers.map((customer) => (
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl my-5">
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {customer.UserName}</h2>
                <p className="text-sm mt-2">{customer.UserEmail}</p>
                <h2 className="text-xl ">
                  {" "}
                  TotalBooking : ₹{customer.TotalBookingValue}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
