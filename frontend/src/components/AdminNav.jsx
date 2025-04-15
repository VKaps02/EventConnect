import { Link, useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <div className="flex space-x-4">
        <Link to="/admin/events" className="hover:underline">
          Events
        </Link>
        <Link to="/admin/add-event" className="hover:underline">
          Add Event
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
