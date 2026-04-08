/** @format */

"use client";

import { Slider } from "@/components/ui/slider";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

/* ----------------------------------------
   JSON DATA
-----------------------------------------*/
export const jobCategories = [
  { label: "Long-Form YouTube", count: "54" },
  { label: "Shorts/Reels/TikToks", count: "9+" },
  { label: "Thumbnails", count: "36+" },
  { label: "Ads/UGC", count: "28+" },
  { label: "Podcasts", count: "28+" },
  { label: "Weddings/Events", count: "28+" },
  { label: "Color & Audio", count: "28+" },
  { label: "Captions/Subtitles", count: "28+" },
];

export const platforms = [
  { label: "YouTube", count: "372+" },
  { label: "TikTok", count: "36+" },
  { label: "Instagram", count: "36+" },
  { label: "X (Twitter)", count: "36+" },
  { label: "Facebook", count: "36+" },
  { label: "Snapchat", count: "36+" },
];

export const deliveryTimes = [
  "Express 24H",
  "Up to 3 days",
  "Up to 7 days",
  "Anytime",
];

type propType = {
  isMobile?: boolean;
  handleMenu?: () => void;
};

/* ----------------------------------------
   Checkbox Component
-----------------------------------------*/
type CheckboxProps = {
  label: string;
  count?: string;
  defaultChecked?: boolean;
};

function CheckboxRow({ label, count, defaultChecked }: CheckboxProps) {
  return (
    <label className='flex items-center justify-between cursor-pointer'>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          defaultChecked={defaultChecked}
          className='w-5 h-5 accent-black cursor-pointer'
        />
        <span className='text-[#333] text-[16px]'>{label}</span>
      </div>

      {count && (
        <span className='w-10 text-center py-1 rounded-md bg-red-100 text-red-500 text-sm font-medium'>
          {count}
        </span>
      )}
    </label>
  );
}

/* ----------------------------------------
   FILTER SIDEBAR
-----------------------------------------*/
export default function FilterSidebar({ isMobile, handleMenu }: propType) {
  // ✅ HOOK MUST BE INSIDE COMPONENT
  const [priceRange, setPriceRange] = useState([]);
  const [anyPrice, setAnyPrice] = useState(true);
  const [anyDeliveryTime, setAnyDeliveryTime] = useState(true);
  const [deliveryTime, setDeliveryTime] = useState([25]);
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);
  const minDeliveryRef = useRef<HTMLInputElement | null>(null);
  const maxDeliveryRef = useRef<HTMLInputElement | null>(null);

  const handleNumericInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    input.value = input.value.replace(/\D+/g, "");
  };

  const handleCurrencyBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const numericValue = input.value.replace(/\D+/g, "");

    if (!numericValue) {
      input.value = "";
      return;
    }
    console.log("Numeric value:", Number(numericValue));
    if (Number(numericValue) < 2) {
      input.value = `$2`;
    } else {
      input.value = `$${numericValue}`;
    }
  };

  const handleDayBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const numericValue = input.value.replace(/\D+/g, "");

    if (!numericValue) {
      input.value = "";
      return;
    }

    input.value = `${numericValue} days`;
  };

  return (
    <div
      className={`w-[320px] sm:w-[400px] md:w-[320px]  border p-6 bg-white shadow-sm ${isMobile
        ? "h-full max-h-screen overflow-y-auto"
        : "rounded-[20px] h-fit"
        }`}
      // style={{ maxHeight: 'calc(100vh - 65px)' }}
      onClick={(e) => e.stopPropagation()}>
      {/* Job Category */}
      <div className='flex items-start justify-between'>
        <h2 className='text-[#333] font-semibold text-xl mb-4'>Job Category</h2>
        <button
          type='button'
          disabled={!isMobile}
          className={`p-1 text-xl rounded-full hover:bg-red-50 cursor-pointer ${isMobile ? "block" : "hidden"
            }`}
          onClick={handleMenu}>
          <IoClose />
        </button>
      </div>
      <div className='flex flex-col gap-4 mb-8'>
        {jobCategories.map((item, idx) => (
          <CheckboxRow key={idx} {...item} />
        ))}
      </div>
      {/* defaultChecked={idx === 0} */}
      {/* Platform */}
      <h2 className='text-[#333] font-semibold text-xl mb-4'>Platform</h2>
      <div className='flex flex-col gap-4 mb-8'>
        {platforms.map((item, idx) => (
          <CheckboxRow key={idx} {...item} />
        ))}
      </div>

      {/* Price Range */}
      {/* <div className='w-full flex flex-col items-center gap-3 mb-8'>
        <div className='w-full flex justify-between px-2 text-gray-500 text-sm font-medium'>
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>

        <Slider
          defaultValue={[5, 35]}
          max={100}
          min={0}
          step={1}
          value={range}
          onValueChange={setRange}
          className='w-full'
        />
      </div> */}

      {/* Delivery Time */}
      <div className=''>
        {/* {deliveryTimes.map((d, idx) => (
          <CheckboxRow key={idx} label={d} />
        ))} */}
        {/* Price Section */}
        <h2 className='text-[#333] font-semibold text-xl mb-4'>Price</h2>

        {/* Any Price Checkbox */}
        <label className='flex items-center gap-3 mb-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={anyPrice}
            onChange={() => {
              const nextValue = !anyPrice;
              setAnyPrice(nextValue);
              setPriceRange([]);
              if (nextValue) {
                if (minPriceRef.current) minPriceRef.current.value = "";
                if (maxPriceRef.current) maxPriceRef.current.value = "";
              }
            }}
            className='w-5 h-5 accent-black cursor-pointer'
          />
          <span className='text-[#333] text-[16px]'>
            Any Price
          </span>
        </label>

        {/* Min Max Inputs */}
        <div className='flex gap-3 items-center'>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Min'
              inputMode='numeric'
              pattern="[0-9]*"
              disabled={anyPrice}
              ref={minPriceRef}
              onInput={handleNumericInput}
              onBlur={handleCurrencyBlur}
              className='border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700'
            />
            {anyPrice && (
              <div
                className='absolute inset-0 cursor-pointer'
                onClick={() => setAnyPrice(false)}
              />
            )}
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Max'
              inputMode='numeric'
              pattern="[0-9]*"
              disabled={anyPrice}
              ref={maxPriceRef}
              onInput={handleNumericInput}
              onBlur={handleCurrencyBlur}
              className='border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700'
            />
            {anyPrice && (
              <div
                className='absolute inset-0 cursor-pointer'
                onClick={() => {
                  setAnyPrice(false)
                  minPriceRef.current?.focus();
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className='pt-8'>
        {/* {deliveryTimes.map((d, idx) => (
          <CheckboxRow key={idx} label={d} />
        ))} */}
        {/* Delivery Time Section */}
        <h2 className='text-[#333] font-semibold text-xl mb-4'>
          Delivery Time
        </h2>

        {/* Any Delivery Time Checkbox */}
        <label className='flex items-center gap-3 mb-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={anyDeliveryTime}
            onChange={() => {
              const nextValue = !anyDeliveryTime;
              setAnyDeliveryTime(nextValue);
              if (nextValue) {
                setDeliveryTime([0]);
              } else {
                setDeliveryTime([10]);
              }
            }}
            className='w-5 h-5 accent-black cursor-pointer'
          />
          <span className='text-[#333] text-[16px]'>
            Any Delivery Time
          </span>
        </label>

        {/* Delivery Time Slider */}
        <div className='w-full flex flex-col items-center gap-3 mb-4'>
          <div className='w-full flex justify-center px-2 text-gray-700 text-base font-medium'>
            <span>{deliveryTime[0]} {deliveryTime[0] === 1 ? 'day' : 'days'}</span>
          </div>

          <div className='relative w-full'>
            <Slider
              max={50}
              min={1}
              step={1}
              value={deliveryTime}
              onClick={() => setAnyDeliveryTime(false)}
              onValueChange={(value) => {
                setDeliveryTime(value);
                if (anyDeliveryTime) {
                  setAnyDeliveryTime(false);
                }
              }}
              // disabled={anyDeliveryTime}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
