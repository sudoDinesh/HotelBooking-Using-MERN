import { Link } from "react-router-dom";

export default function AnalyticsPage() {
  return (
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
  );
}
