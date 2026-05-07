import { useState } from "react";
import { 
  Wifi, Dumbbell, Car, Shield, Tv, Utensils, Wind, Battery, 
  Sparkles, Coffee, Snowflake, Mic, Book, Music, Heart, 
  ShoppingBag, Droplets, Sun, Moon, Zap, CheckCircle, XCircle 
} from "lucide-react";

function Amenities() {
  // Pre-loaded common PG amenities
  const [amenities, setAmenities] = useState([
    { id: 1, name: "WiFi", icon: "Wifi", checked: true, category: "basic" },
    { id: 2, name: "24/7 Power Backup", icon: "Battery", checked: true, category: "basic" },
    { id: 3, name: "Air Conditioning", icon: "Wind", checked: false, category: "basic" },
    { id: 4, name: "Geyser", icon: "Droplets", checked: true, category: "basic" },
    { id: 5, name: "Gym", icon: "Dumbbell", checked: false, category: "premium" },
    { id: 6, name: "Parking", icon: "Car", checked: true, category: "premium" },
    { id: 7, name: "CCTV Security", icon: "Shield", checked: true, category: "security" },
    { id: 8, name: "Common TV", icon: "Tv", checked: false, category: "entertainment" },
    { id: 9, name: "Tiffin Service", icon: "Utensils", checked: false, category: "dining" },
    { id: 10, name: "Tea/Coffee Machine", icon: "Coffee", checked: false, category: "dining" },
  ]);

  const [newAmenity, setNewAmenity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggested amenities for quick add
  const suggestions = [
    { name: "Study Room", icon: "Book", category: "basic" },
    { name: "Meditation Area", icon: "Heart", category: "basic" },
    { name: "Rooftop Access", icon: "Sun", category: "premium" },
    { name: "Laundry Service", icon: "Zap", category: "premium" },
    { name: "Visitor Lounge", icon: "Coffee", category: "premium" },
    { name: "Indoor Games", icon: "Music", category: "entertainment" },
    { name: "Music Room", icon: "Music", category: "entertainment" },
    { name: "Water Purifier", icon: "Droplets", category: "basic" },
    { name: "Refrigerator", icon: "Snowflake", category: "basic" },
    { name: "Microwave", icon: "Mic", category: "dining" },
  ];

  const iconMap = {
    Wifi, Dumbbell, Car, Shield, Tv, Utensils, Wind, Battery, 
    Sparkles, Coffee, Snowflake, Mic, Book, Music, Heart, 
    ShoppingBag, Droplets, Sun, Moon, Zap
  };

  const categories = {
    basic: { name: "Basic Amenities", color: "border-blue-200 bg-blue-50" },
    premium: { name: "Premium Facilities", color: "border-purple-200 bg-purple-50" },
    security: { name: "Security Features", color: "border-green-200 bg-green-50" },
    entertainment: { name: "Entertainment", color: "border-pink-200 bg-pink-50" },
    dining: { name: "Dining Services", color: "border-orange-200 bg-orange-50" }
  };

  const handleToggle = (id) => {
    setAmenities(amenities.map(amenity => 
      amenity.id === id ? { ...amenity, checked: !amenity.checked } : amenity
    ));
  };

  const handleAdd = () => {
    if (!newAmenity.trim()) {
      alert("Please enter an amenity name");
      return;
    }

    // Check if amenity already exists
    if (amenities.some(a => a.name.toLowerCase() === newAmenity.toLowerCase())) {
      alert("This amenity already exists!");
      return;
    }

    const newId = Math.max(...amenities.map(a => a.id), 0) + 1;
    
    // Auto-assign icon based on category
    let defaultIcon = "Sparkles";
    if (selectedCategory === "basic") defaultIcon = "Wifi";
    if (selectedCategory === "premium") defaultIcon = "Sparkles";
    if (selectedCategory === "security") defaultIcon = "Shield";
    if (selectedCategory === "entertainment") defaultIcon = "Tv";
    if (selectedCategory === "dining") defaultIcon = "Utensils";

    setAmenities([...amenities, {
      id: newId,
      name: newAmenity,
      icon: defaultIcon,
      checked: true,
      category: selectedCategory
    }]);
    
    setNewAmenity("");
    setShowSuggestions(false);
  };

  const handleAddSuggestion = (suggestion) => {
    // Check if already exists
    if (amenities.some(a => a.name === suggestion.name)) {
      alert(`${suggestion.name} already exists!`);
      return;
    }

    const newId = Math.max(...amenities.map(a => a.id), 0) + 1;
    setAmenities([...amenities, {
      id: newId,
      name: suggestion.name,
      icon: suggestion.icon,
      checked: true,
      category: suggestion.category
    }]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this amenity?")) {
      setAmenities(amenities.filter(amenity => amenity.id !== id));
    }
  };

  const handleSelectAll = () => {
    setAmenities(amenities.map(amenity => ({ ...amenity, checked: true })));
  };

  const handleDeselectAll = () => {
    setAmenities(amenities.map(amenity => ({ ...amenity, checked: false })));
  };

  const checkedCount = amenities.filter(a => a.checked).length;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Amenities</h1>
        <p className="text-gray-500 mt-1">Select the facilities available at your PG</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Amenities</p>
          <p className="text-2xl font-bold text-gray-800">{amenities.length}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Selected</p>
          <p className="text-2xl font-bold text-green-600">{checkedCount}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex gap-2">
            <button 
              onClick={handleSelectAll}
              className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Select All
            </button>
            <button 
              onClick={handleDeselectAll}
              className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Add New Amenity - Fixed */}
      <div className="border border-gray-200 rounded-xl p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add New Amenity</label>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g., Swimming Pool, Rooftop Garden, Study Room..."
            value={newAmenity}
            onChange={(e) => {
              setNewAmenity(e.target.value);
              if (e.target.value.length > 2) setShowSuggestions(true);
              else setShowSuggestions(false);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
          >
            <option value="basic">Basic Amenities</option>
            <option value="premium">Premium Facilities</option>
            <option value="security">Security Features</option>
            <option value="entertainment">Entertainment</option>
            <option value="dining">Dining Services</option>
          </select>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center"
          >
           Add Amenity
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && newAmenity.length > 0 && (
          <div className="mt-3 border border-gray-200 rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto">
            {suggestions
              .filter(s => s.name.toLowerCase().includes(newAmenity.toLowerCase()))
              .map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNewAmenity(suggestion.name);
                    setSelectedCategory(suggestion.category);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-400">✨</span>
                  <span>{suggestion.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{suggestion.category}</span>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Quick Add Suggestions */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-3">✨ Quick add popular amenities:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 8).map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleAddSuggestion(suggestion)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              + {suggestion.name}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities List - Category Wise */}
      <div className="space-y-6">
        {Object.entries(categories).map(([catKey, cat]) => {
          const catAmenities = amenities.filter(a => a.category === catKey);
          if (catAmenities.length === 0) return null;
          
          return (
            <div key={catKey} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className={`px-4 py-3 ${cat.color} border-b`}>
                <h2 className="font-semibold text-gray-800">{cat.name}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {catAmenities.map((amenity) => {
                  const IconComponent = iconMap[amenity.icon] || Sparkles;
                  
                  return (
                    <div key={amenity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={amenity.checked}
                            onChange={() => handleToggle(amenity.id)}
                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                          />
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className={`${amenity.checked ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                              {amenity.name}
                            </span>
                          </div>
                        </label>
                      </div>
                      <button
                        onClick={() => handleDelete(amenity.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end gap-3">
        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Amenities;