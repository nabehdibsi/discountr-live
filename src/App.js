import React, { useState, useEffect } from "react";

const mockData = [
  { name: "Sushi Zen", cuisine: "Japanese", platform: "Uber Eats", discount: 12, link: "https://ubereats.com/sushizen", distance: 0.5 },
  { name: "Mama Mia Pizza", cuisine: "Italian", platform: "Grubhub", discount: 5, link: "https://grubhub.com/mamamia", distance: 1.2 },
  { name: "Taco Fiesta", cuisine: "Mexican", platform: "DoorDash", discount: 8, link: "https://doordash.com/tacofiesta", distance: 0.8 },
  { name: "Curry House", cuisine: "Indian", platform: "Restaurant App", discount: 10, link: "https://curryhouse.com/deals", distance: 1.5 },
  { name: "Green Bowl", cuisine: "Vegetarian", platform: "Uber Eats", discount: 6, link: "https://ubereats.com/greenbowl", distance: 0.4 }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [filtered, setFiltered] = useState(mockData);
  const [saved, setSaved] = useState([]);
  const [tab, setTab] = useState("home");

  useEffect(() => {
    let result = [...mockData];

    if (search) {
      result = result.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (cuisine !== "All") {
      result = result.filter((r) => r.cuisine === cuisine);
    }
    if (platform !== "All") {
      result = result.filter((r) => r.platform === platform);
    }
    if (sortBy === "savings") {
      result.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "distance") {
      result.sort((a, b) => a.distance - b.distance);
    }

    setFiltered(result);
  }, [search, cuisine, platform, sortBy]);

  const toggleSave = (item) => {
    setSaved((prev) =>
      prev.find((s) => s.name === item.name) ? prev.filter((s) => s.name !== item.name) : [...prev, item]
    );
  };

  const getPlatformBg = (platform) => {
    switch (platform) {
      case "Uber Eats":
        return "bg-gradient-to-r from-green-200 via-green-100 to-white";
      case "Grubhub":
        return "bg-gradient-to-r from-pink-200 via-pink-100 to-white";
      case "DoorDash":
        return "bg-gradient-to-r from-red-200 via-red-100 to-white";
      case "Restaurant App":
        return "bg-gradient-to-r from-yellow-200 via-yellow-100 to-white";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1740&q=80')] bg-cover bg-fixed bg-center p-4">
      <div className="backdrop-blur-md bg-white/70 min-h-screen p-4 rounded-xl">
        <header className="bg-white shadow p-4 mb-8 sticky top-0 z-10 flex justify-between items-center rounded-md">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">Discountr</h1>
          <button
            onClick={() => setTab(tab === "home" ? "account" : "home")}
            className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          >
            {tab === "home" ? "Account" : "Back to Deals"}
          </button>
        </header>

        {tab === "home" ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] mb-8">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurants..."
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              >
                <option value="All">All Cuisines</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              >
                <option value="All">All Platforms</option>
                <option value="Uber Eats">Uber Eats</option>
                <option value="Grubhub">Grubhub</option>
                <option value="DoorDash">DoorDash</option>
                <option value="Restaurant App">Restaurant App</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              >
                <option value="None">Sort by</option>
                <option value="savings">Highest Savings</option>
                <option value="distance">Closest Distance</option>
              </select>
            </div>

            <div className="grid gap-6">
              {filtered.map((r, index) => (
                <div
                  key={index}
                  className={`rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition-all ${getPlatformBg(r.platform)}`}
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{r.name}</h2>
                    <p className="text-gray-500 text-sm">
                      {r.cuisine} • {r.platform} • {r.distance} mi away
                    </p>
                    <p className="text-green-600 font-bold mt-1">Save ${r.discount}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View Deal
                    </a>
                    <button
                      onClick={() => toggleSave(r)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {saved.find((s) => s.name === r.name) ? "Unsave" : "Save"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Saved Discounts</h2>
            {saved.length === 0 ? (
              <p className="text-gray-500">No discounts saved yet.</p>
            ) : (
              <div className="grid gap-6">
                {saved.map((r, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">{r.name}</h2>
                      <p className="text-gray-500 text-sm">
                        {r.cuisine} • {r.platform} • {r.distance} mi away
                      </p>
                      <p className="text-green-600 font-bold mt-1">Save ${r.discount}</p>
                    </div>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View Deal
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}