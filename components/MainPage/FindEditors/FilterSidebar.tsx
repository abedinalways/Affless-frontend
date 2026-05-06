/** @format */

"use client";

import { Slider } from "@/components/ui/slider";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

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
  priceLabel?: string;
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
export default function FilterSidebar({ isMobile, handleMenu, priceLabel }: propType) {
  // ✅ HOOK MUST BE INSIDE COMPONENT
  const [priceRange, setPriceRange] = useState([]);
  const [anyPrice, setAnyPrice] = useState(true);
  const [anyDeliveryTime, setAnyDeliveryTime] = useState(true);
  const [deliveryTime, setDeliveryTime] = useState([0]);
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);
  const minDeliveryRef = useRef<HTMLInputElement | null>(null);
  const maxDeliveryRef = useRef<HTMLInputElement | null>(null);
  const [priceError, setPriceError] = useState("");

  const handleNumericInput = (event: React.FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    // Remove all characters except digits and decimal point
    let cleaned = value.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    // Prevent multiple leading zeros? Optional.
    event.currentTarget.value = cleaned;
  };

  const handleCurrencyBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    // Extract number string: allow optional decimal part
    let match = value.match(/^(\d*\.?\d*)/);
    let numericStr = match ? match[1] : '';
    if (!numericStr) {
      // Empty or invalid
      event.currentTarget.value = '';
      setPriceError('');
      return;
    }
    // Parse as float
    let num = parseFloat(numericStr);
    if (isNaN(num)) {
      event.currentTarget.value = '';
      setPriceError('');
      return;
    }
    // Enforce minimum 2
    if (num < 2) {
      setPriceError('The minimum pricing is $2.00.');
      event.currentTarget.value = '$2.00';
      return;
    }
    // Format to two decimals
    let formatted = '$' + num.toFixed(2);
    event.currentTarget.value = formatted;

    // Validate min/max as before
    const getNumeric = (ref: React.RefObject<HTMLInputElement | null>) => {
      if (!ref?.current) return 0;
      let val = ref.current.value;
      let m = val.match(/\d+(?:\.\d+)?/);
      return m ? parseFloat(m[0]) : 0;
    };
    const minVal = getNumeric(minPriceRef);
    const maxVal = getNumeric(maxPriceRef);
    if (minVal && maxVal && maxVal < minVal) {
      setPriceError("Maximum price can't be less than the minimum price.");
      // Optionally clear or revert
    } else {
      setPriceError("");
    }
  };


  const handlePriceFocus = (ref: React.RefObject<HTMLInputElement>) => {
    setAnyPrice(false);
    if (ref.current) {
      let raw = ref.current.value.replace(/[^0-9.]/g, '');
      ref.current.value = raw;
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
      <div className='pt-8'>
        <h2 className='text-[#333] font-semibold text-xl mb-4'>{priceLabel ? priceLabel : "Price"}</h2>

        {/* Any Price Checkbox */}
        <label className='flex items-center gap-3 mb-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={anyPrice}
            onChange={() => {
              const nextValue = !anyPrice;
              setAnyPrice(nextValue);
              if (nextValue) {
                if (minPriceRef.current) minPriceRef.current.value = '';
                if (maxPriceRef.current) maxPriceRef.current.value = '';
                setPriceError('');
              }
            }}
            className='w-5 h-5 accent-black cursor-pointer'
          />
          <span className='text-[#333] text-[16px]'>Any {priceLabel ? priceLabel : "Price"}</span>
        </label>

        {/* Min & Max Inputs */}
        <div className='flex gap-3 items-center'>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Min'
              inputMode='numeric'
              ref={minPriceRef}
              // disabled={anyPrice}
              onInput={handleNumericInput}
              onBlur={handleCurrencyBlur}
              onFocus={(e) => {
                setAnyPrice(false);
                let raw = e.target.value.replace(/[^0-9.]/g, '');
                e.target.value = raw;
              }}
              className={`border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700 ${anyPrice ? 'cursor-pointer bg-gray-100' : ''
                }`}
            />
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Max'
              inputMode='numeric'
              ref={maxPriceRef}
              onInput={handleNumericInput}
              onBlur={handleCurrencyBlur}
              onFocus={(e) => {
                setAnyPrice(false);
                let raw = e.target.value.replace(/[^0-9.]/g, '');
                e.target.value = raw;
              }}
              className={`border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700 ${anyPrice ? 'cursor-pointer bg-gray-100' : ''
                }`}
            />
          </div>
        </div>

        {priceError && (
          <div className={`text-red-500 ${priceError === 'The minimum pricing is $2.00.' ? 'text-sm pt-1' : 'text-[10px]'
            } mt-1`}>
            {priceError}
          </div>
        )}
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
                setDeliveryTime([0]);
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
            <span>Within {deliveryTime[0]} {deliveryTime[0] === 1 ? 'day' : 'days'}</span>
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
