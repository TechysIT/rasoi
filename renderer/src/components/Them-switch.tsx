"use client";
import { useEffect, useState } from "react";

const themes = [
  { name: "Default", theme: "default", color: "#f97316", border: "#ffedd5" },
  { name: "Blue", theme: "blue", color: "#0052cc", border: "#e7f1fe" },
  { name: "Green", theme: "green", color: "#1b9377", border: "#e8f7e9" },
  { name: "Golden", theme: "golden", color: "#d5aa2a", border: "#faf3d1" },
  { name: "Purple", theme: "purple", color: "#734fdc ", border: "#f3e8ff" },
  { name: "Black", theme: "black", color: "#222222", border: "#f3f4f6" },
  { name: "Red", theme: "red", color: "#b0034e ", border: "#fee2e2" },
];

export default function ThemeSwitcher() {
  const [selectedTheme, setSelectedTheme] = useState("default");

  useEffect(() => {
    document.documentElement.classList.remove(
      "blue-theme",
      "green-theme",
      "golden-theme",
      "purple-theme",
      "black-theme",
      "red-theme"
    );
    if (selectedTheme !== "default") {
      document.documentElement.classList.add(`${selectedTheme}-theme`);
    }
  }, [selectedTheme]);

  return (
    <div className="flex justify-between items-center p-4">
      <span className="font-medium">Theme Color</span>
      <div className="flex items-center gap-5">
        {themes.map(({ name, theme, color, border }) => (
          <div
            key={theme}
            className={`h-4 w-4 rounded-full cursor-pointer transition-all duration-200 ${
              selectedTheme === theme
                ? "ring-2 ring-offset-2 h-5 w-5 border-4"
                : ""
            }`}
            style={{
              backgroundColor: color,
              borderColor: selectedTheme === theme ? border : "transparent",
              boxShadow: selectedTheme === theme ? `0 0 4px ${color}` : "none",
            }}
            onClick={() => setSelectedTheme(theme)}
            aria-label={`Set theme to ${name}`}
          />
        ))}
      </div>
    </div>
  );
}
