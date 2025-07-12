// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-[#712c4a57]", "text-[#ff006e]", "border-[#ff006faa]",
    "bg-[#ffd60a2a]", "text-[#ffd60a]", "border-[#ffd60abb]",
    "bg-[#06d6a02a]", "text-[#06d6a0]", "border-[#06d6a0bb]",
    "bg-[#4cc9f02a]", "text-[#4cc9f0]", "border-[#4cc9f0bb]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
