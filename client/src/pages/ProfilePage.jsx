import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "loading.....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
          <div className="flex gap-4 justify-center mt-10">
            <Link to={"/account/query1"}>
              <button className="primary">q1</button>
            </Link>
            <Link to={"/account/query2"}>
              <button className="primary">q2</button>
            </Link>
            <Link to={"/account/query3"}>
              <button className="primary">q3</button>
            </Link>
          </div>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
