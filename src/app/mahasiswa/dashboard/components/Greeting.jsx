"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCoffee } from "react-icons/fa";

export default function Greeting({ nama }) {
  const [displayedText, setDisplayedText] = useState("");
  const [icon, setIcon] = useState(() => FaCoffee);
  const [typingComplete, setTypingComplete] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11)
      return { text: "Selamat Pagi", icon: FaCoffee, color: "text-orange-500" };
    if (hour < 15)
      return { text: "Selamat Siang", icon: FaSun, color: "text-yellow-500" };
    if (hour < 18)
      return { text: "Selamat Sore", icon: FaSun, color: "text-orange-400" };
    return { text: "Selamat Malam", icon: FaMoon, color: "text-blue-400" };
  };

  const greeting = getGreeting();

  // ambil max 2 kata nama
  const parts = nama?.trim().split(" ") || [];
  const shortName =
    parts.length >= 2 ? `${parts[0]} ${parts[1]}` : parts[0] || "Teman";

  const fullText = `${greeting.text}, ${shortName}`;

  useEffect(() => {
    setIcon(() => greeting.icon);
    setDisplayedText("");
    setTypingComplete(false);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [nama]);

  const IconComponent = icon ?? FaCoffee;

  return (
    <div className="mb-3">
      {/* GREETING */}
      <h1
        className="
          text-base sm:text-lg md:text-xl
          font-semibold text-gray-800
          flex items-center gap-2
          leading-snug
          break-words
        "
      >
        <span className="block">{displayedText}</span>

        {/* Cursor & Icon */}
        <span className="flex items-center gap-1 shrink-0">
          {!typingComplete && (
            <span className="hidden sm:inline-block w-1 h-4 bg-blue-500 animate-pulse" />
          )}

          {typingComplete && (
            <IconComponent
              className={`text-base sm:text-lg ${greeting.color}`}
            />
          )}
        </span>
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-500 text-xs sm:text-sm mt-1">
        Yuk tingkatkan partisipasi dan raih lebih banyak poin!
      </p>
    </div>
  );
}
