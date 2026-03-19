import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ ADD

  const handleUpload = async () => {
    if (!file) return alert("Upload a file");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://threat-lens-0urk.onrender.com/predict",
        formData
      );

      // 🔥 REPLACE THIS LINE
      // setData(res.data);

      navigate("/dashboard", { state: res.data }); // ✅ NEW

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="
    bg-gradient-to-br from-[#020617]/90 to-[#020617]/70
    backdrop-blur-md border border-gray-700
    p-5 rounded-2xl
    shadow-[0_10px_40px_rgba(0,0,0,0.9)]
    hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]
    transition
    flex flex-col gap-4
  ">

    {/* 🔥 TOP ROW */}
    <div className="flex items-center justify-between gap-4">

      <div className="flex items-center gap-4">

        {/* FILE INPUT */}
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* CUSTOM BUTTON */}
        <label
          htmlFor="fileUpload"
          className="
            px-4 py-2 rounded-lg cursor-pointer
            bg-[#0f172a] border border-gray-600
            text-gray-300 text-sm
            hover:border-yellow-400 hover:text-white
            transition
          "
        >
          Choose File
        </label>

        {/* FILE NAME */}
        <span className="text-gray-400 text-sm truncate max-w-[200px]">
          {file ? file.name : "No file selected"}
        </span>

      </div>

      {/* ANALYZE BUTTON */}
      <button
        onClick={handleUpload}
        className="
          px-6 py-2 rounded-lg font-medium
          bg-gradient-to-r from-yellow-400 to-orange-500
          text-black
          hover:scale-105 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]
          transition
        "
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

    </div>

    {/* 🔥 BOTTOM ROW (NEW) */}
    <div className="flex justify-between items-center text-sm">

      <p className="text-gray-400">
        Upload CSV in required format
      </p>

      <a
        href="/sample.csv"
        download
        className="
          text-yellow-400 hover:text-yellow-300
          underline underline-offset-4
          transition
        "
      >
        Download Sample CSV
      </a>

    </div>

  </div>
);
}
