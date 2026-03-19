import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div>
          <p>No data found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-yellow-500 px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <Dashboard data={data} />
    </div>
  );
}