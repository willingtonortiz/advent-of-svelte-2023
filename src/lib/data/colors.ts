export const COLORS = [
  "white",
  "red-500",
  "orange-500",
  "yellow-500",
  "green-500",
  "teal-500",
  "sky-500",
  "blue-500",
  "gray-500",
  "indigo-500",
  "purple-500",
  "fuchsia-500",
  "pink-500",
];

// Html colors
export function getRandomColor() {
  const colors = [
    "#A93226",
    "#B03A2E",
    "#76448A",
    "#6C3483",
    "#1F618D",
    "#2874A6",
    "#148F77",
    "#117A65",
    "#1E8449",
    "#239B56",
    "#B7950B",
    "#B9770E",
    "#AF601A",
    "#A04000",
    "#283747",
    "#212F3D",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
