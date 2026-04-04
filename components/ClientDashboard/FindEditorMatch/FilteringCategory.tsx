import React from 'react'

export default function FilteringCategory() {
  return (
    <div>
      <div className="w-full  bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-6">
  <div className="space-y-10">

    {/* Project Types */}
    <div>
      <h3 className="text-[26px] font-bold text-[#222] mb-5">Job Types</h3>
      <div className="space-y-5">

        {[
          { title: "Youtube Editing", count: "32+" },
          { title: "Marketing Video Editing", count: "36+" },
          { title: "Business Video Editing", count: "36+" },
          { title: "Music Video Editing", count: "555+" },
        ].map((item, i) => (
          <label key={i} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-md border border-[#BFBFBF] accent-[#FF4D4F]"
              />
              <span className="text-[16px] text-[#333]">{item.title}</span>
            </div>

            <span className="min-w-[54px] h-8 flex items-center justify-center text-[14px] font-medium rounded-md bg-[#FFF1F0] text-[#FF4D4F]">
              {item.count}
            </span>
          </label>
        ))}

      </div>
    </div>

    {/* Skill Level */}
    <div>
      <h3 className="text-[26px] font-bold text-[#222] mb-5">Skill Level</h3>
      <div className="space-y-5">

        {[
          { title: "Beginner", count: "372+" },
          { title: "Intermediate", count: "36+" },
          { title: "Expert", count: "36+" },
        ].map((item, i) => (
          <label key={i} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-md border border-[#BFBFBF] accent-[#FF4D4F]"
              />
              <span className="text-[16px] text-[#333]">{item.title}</span>
            </div>

            <span className="min-w-[54px] h-8 flex items-center justify-center text-[14px] font-medium rounded-md bg-[#FFF1F0] text-[#FF4D4F]">
              {item.count}
            </span>
          </label>
        ))}

      </div>
    </div>

    {/* Price */}
    <div>
      <h3 className="text-[26px] font-bold text-[#222] mb-5">Price</h3>

      <label className="flex items-center gap-3 mb-5 cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md border border-[#BFBFBF] accent-[#FF4D4F]"
        />
        <span className="text-[16px] text-[#333]">Any Price</span>
      </label>

      <div className="flex gap-4">
        <input
          placeholder="Min"
          className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[15px] outline-none bg-[#FAFAFA]"
        />
        <input
          placeholder="Max"
          className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[15px] outline-none bg-[#FAFAFA]"
        />
      </div>
    </div>

    {/* Project Duration */}
    <div>
      <h3 className="text-[26px] font-bold text-[#222] mb-5">Job Duration</h3>
      <div className="space-y-5">

        {["Express 24H", "Up to 3 days", "Up to 7 days", "Anytime"].map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded-md border border-[#BFBFBF] accent-[#FF4D4F]"
            />
            <span className="text-[16px] text-[#333]">{item}</span>
          </label>
        ))}

      </div>
    </div>

    {/* Button */}
    <button className="w-full h-12 rounded-lg bg-[#FF4D4F] text-white text-[16px] font-medium hover:opacity-90 transition">
      Find Another Match
    </button>

  </div>
</div>

    </div>
  )
}
