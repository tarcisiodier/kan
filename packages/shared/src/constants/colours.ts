export const colours: { name: string; code: string }[] = [
  { name: "Teal", code: "#0d9488" },
  { name: "Emerald", code: "#059669" },
  { name: "Green", code: "#65a30d" },
  { name: "Cyan", code: "#0891b2" },
  { name: "Sky", code: "#0284c7" },
  { name: "Blue", code: "#2563eb" },
  { name: "Indigo", code: "#4f46e5" },
  { name: "Violet", code: "#7c3aed" },
  { name: "Purple", code: "#9333ea" },
  { name: "Fuchsia", code: "#c026d3" },
  { name: "Pink", code: "#db2777" },
  { name: "Rose", code: "#e11d48" },
  { name: "Red", code: "#dc2626" },
  { name: "Orange", code: "#ea580c" },
  { name: "Amber", code: "#d97706" },
  { name: "Yellow", code: "#ca8a04" },
  { name: "Gray", code: "#4b5563" },
] as const;

export type Colour = (typeof colours)[number];
