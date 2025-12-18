import { useState } from "react";
import apiService from "@/ApiService";


export default function MouseComparator() {
  const [mouse1, setMouse1] = useState("");
  const [mouse2, setMouse2] = useState("");
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<string>("");

  function formatComparison(text: string) {
    return text.split("\n").map((line, index) => {
      // Section headings (1. 2. 3.)
      if (/^\d+\./.test(line)) {
        return (
          <h2 key={index} className="text-lg font-semibold mt-6">
            {line}
          </h2>
        );
      }

      // Sub headings like "Mouse A", "Mouse B"
      if (line.startsWith("Mouse")) {
        return (
          <h3 key={index} className="font-medium mt-4">
            {line}
          </h3>
        );
      }

      // Bullet points
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 list-disc">
            {line.replace("- ", "")}
          </li>
        );
      }

      // Normal text
      return (
        <p key={index} className="mt-1 text-sm text-gray-700">
          {line}
        </p>
      );
    });
  }


  async function compareMice() {
    if (!mouse1 || !mouse2) return;
    setLoading(true);
    await apiService.compareMice(mouse1, mouse2).then((result: any) => {
      setComparisonResult(result);
    });
    setLoading(false);
  }
  (mouse2: any) => mouse2.id === setMouse2;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-6 max-w-5xl mx-auto space-y-6 -mr-8">
      <h1 className="text-3xl font-semibold text-center">
        Gaming Components Comparator
      </h1>

      <div className="flex flex-col items-center gap-6"/>

      <div className="flex flex-col md:flex-row items-center justify-center gap-5 ">
        <input
          className="w-80 px-5 py-3 border rounded-2xl shadow-sm text-sm
               focus:outline-none focus:ring-2 focus:ring-black/30
               placeholder-gray-400 transition"
          placeholder="Enter Mouse 1"
          value={mouse1}
          onChange={(e) => setMouse1(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center gap-6"/>

       <div className="flex flex-col md:flex-row items-center justify-center gap-5 ">  
        <button
          onClick={compareMice}
          disabled={!mouse1 || !mouse2}
          className={`px-6 py-3 rounded-2xl font-medium transition
        ${
          !mouse1 || !mouse2
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-black text-white hover:scale-105 active:scale-95"
        }`}
        >
          Compare
        </button>
        </div>
         <div className="gap-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5">  
        <input
          className="w-72 px-4 py-3 border rounded-2xl shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-black/20
                 transition"
          placeholder="Enter Mouse 2"
          value={mouse2}
          onChange={(e) => setMouse2(e.target.value)}
        />
        
      </div>
      <div className="title-section">
        <div className="mt-6 p-4 border rounded-xl bg-gray-50 whitespace-pre-wrap">
          {loading && "Comparing mice..."}
          {!loading && comparisonResult && formatComparison(comparisonResult)}
          {!loading && !comparisonResult && "For Results, Enter two gaming mice to compare."}
        </div>
      </div>
    </div>
  </div>  
  );
}
