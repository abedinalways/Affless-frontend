"use client";

import { useState } from "react";
import Image from "next/image";

export default function EditorJobDetails() {
  const [tab, setTab] = useState<"details" | "job" | "earning">("details");

  const jobs = [
    { id: 1, client: "Arlene McCoy", service: "Sound recorded", price: "$400", status: "Late" },
    { id: 2, client: "Jasper Kline", service: "Sound design", price: "$750", status: "Active" },
    { id: 3, client: "Sophie Turner", service: "Voice over", price: "$300", status: "Delivered" },
  ];

  return (
    <div className="p-6 space-y-6">

dsfsdf
    </div>
  
  );
}
