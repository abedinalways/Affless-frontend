import { ExposureTier, Order } from "@/app/type"

export const exposureTiers: ExposureTier[] = [
  {
    label: "≤ 1 hour",
    exposure: "10.3×",
    quickMatch: "+500%",
    zone: "benefit",
    minHours: 0,
    maxHours: 1,
  },
  {
    label: "1–2 hours",
    exposure: "6.5×",
    quickMatch: "+300%",
    zone: "benefit",
    minHours: 1,
    maxHours: 2,
  },
  {
    label: "2–4 hours",
    exposure: "4.0×",
    quickMatch: "+200%",
    zone: "benefit",
    minHours: 2,
    maxHours: 4,
  },
  {
    label: "4–8 hours",
    exposure: "2.5×",
    quickMatch: "+120%",
    zone: "benefit",
    minHours: 4,
    maxHours: 8,
  },
  {
    label: "8–12 hours",
    exposure: "1.8×",
    quickMatch: "+75%",
    zone: "benefit",
    minHours: 8,
    maxHours: 12,
  },
  {
    label: "12–18 hours",
    exposure: "1.3×",
    quickMatch: "+35%",
    zone: "benefit",
    minHours: 12,
    maxHours: 18,
  },
  {
    label: "18–23 hours",
    exposure: "1.05×",
    quickMatch: "+10%",
    zone: "benefit",
    minHours: 18,
    maxHours: 23,
  },
  {
    label: "24 hours",
    exposure: "0.99×",
    quickMatch: "Neutral",
    zone: "neutral",
    minHours: 24,
    maxHours: 24,
  },
  {
    label: "25–30 hours",
    exposure: "0.85×",
    quickMatch: "−10%",
    zone: "penalty",
    minHours: 25,
    maxHours: 30,
  },
  {
    label: "30–36 hours",
    exposure: "0.70×",
    quickMatch: "−25%",
    zone: "penalty",
    minHours: 30,
    maxHours: 36,
  },
  {
    label: "36–42 hours",
    exposure: "0.55×",
    quickMatch: "−40%",
    zone: "penalty",
    minHours: 36,
    maxHours: 42,
  },
  {
    label: "42–48 hours",
    exposure: "0.40×",
    quickMatch: "−60%",
    zone: "penalty",
    minHours: 42,
    maxHours: 48,
  },
];



export const orders: Order[] = [
  {
    id: 1,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "pending",
  },
  {
    id: 2,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "in_progress",
  },
  {
    id: 3,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "cancelled",
  },
  {
    id: 4,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "completed",
  },
  {
    id: 5,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "delivered",
  },
  {
    id: 6,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "cancelled",
  },
  {
    id: 7,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "delivered",
  },
  {
    id: 8,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "pending",
  },
];


export const browseJobData = [
  {
    id: 1,
    img: "/images/Marvin1.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Guy Hawkins",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Thumbnails",
    platform: "YouTube",
    deliveryTime: "3 Days",
    budget: "50",
  },
  {
    id: 2,
    img: "/images/Marvin2.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "John Designer",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Shorts/Reels/TikToks",
    platform: "TikTok",
    deliveryTime: "5 Days",
    budget: "100",
  },
  {
    id: 3,
    img: "/images/Marvin3.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Sarah Editor",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Shorts/Reels/TikToks",
    platform: "Facebook",
    deliveryTime: "7 Days",
    budget: "100",
  },
  {
    id: 4,
    img: "/images/Marvin4.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "John Designer",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Ads/UGC",
    platform: "Snapchat",
    deliveryTime: "3 Days",
    budget: "500",
  },
  {
    id: 5,
    img: "/images/Marvin1.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Emma Video",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Captions/Subtitles",
    platform: "X (Twitter)",
    deliveryTime: "5 Days",
    budget: "900",
  },
  {
    id: 6,
    img: "/images/Marvin2.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Emma Video",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Long-Form YouTube",
    platform: "YouTube",
    deliveryTime: "7 Days",
    budget: "250",
  },
];


export const browsejobbids = [
  {
    id: "1",
    name: "Devon Lane",
    avatar: "/images/devon.png",
    time: "2 hours ago",
    description:
      "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
  },
  {
    id: "2",
    name: "Jerome Bell",
    avatar: "/images/jerome.png",
    time: "2 hours ago",
    description:
      "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
  },
  {
    id: "3",
    name: "John Doe",
    avatar: "/images/jerome.png",
    time: "1 day ago",
    description:
      "I will handle your project professionally. You will get unlimited revisions and fast response.",
  },
];


export const conversationDirectory = [
  {
    id: "1",
    name: "John Designer",
    profileId: "john_designer",
    country: "United States",
    memberSince: "08/02/2024", // 8th Feb 2024
  },
  {
    id: "2",
    name: "Sarah Editor",
    profileId: "sarah_editor",
    country: "United Kingdom",
    memberSince: "09/10/2025", // 9th Oct 2025
  },
  {
    id: "3",
    name: "Mike Graphic",
    profileId: "mike_graphic",
    country: "Canada",
    memberSince: "01/01/2025", // 1st Jan 2025
  },
  {
    id: "4",
    name: "Emma Video",
    profileId: "emma_video",
    country: "Australia",
    memberSince: "11/15/2023", // 15th Nov 2023 (US format for clarity)
  },
];