import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/${id}").then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";
  return (
    <div className="mt-8">
      <h1>{place.title}</h1>
    </div>
  );
}
