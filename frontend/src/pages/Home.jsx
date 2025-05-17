import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.warning("Please login first.", { position: "top-right" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    toast.success("Logged out successfully!", { position: "top-right" });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/agents/add-agent",
        agent
      );
      if (res.data.success) {
        toast.success(res.data.message, { position: "top-right" });
        setAgent({ name: "", email: "", mobile: "", password: "" });
      } else {
        toast.error(res.data.message, { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error adding agent.", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="absolute top-4 right-36">
        <button
          onClick={() => navigate("/agents")}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-md transition duration-200"
        >
          All Agents
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the Home Page
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Add Agent</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={agent.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={agent.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile with Country Code"
          value={agent.mobile}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={agent.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Add Agent
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Home;
