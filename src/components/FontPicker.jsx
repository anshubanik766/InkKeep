// src/components/FontPicker.jsx
import React from "react";

/**
 * Returns a small font selector. The app applies the chosen font
 * class to the textarea (we use Tailwind font utility names).
 *
 * You can add Google Fonts to index.html and add matching classes/definitions if you want more variety.
 */

const FONT_OPTIONS = [
  { label: "Sans (Default)", value: "font-sans" },
  { label: "Serif", value: "font-serif" },
  { label: "Mono", value: "font-mono" },
  { label: "Cursive", value: "font-hand" }, // custom class below
];

export default function FontPicker({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border px-2 py-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
    >
      {FONT_OPTIONS.map((f) => (
        <option key={f.value} value={f.value}>{f.label}</option>
      ))}
    </select>
  );
}
