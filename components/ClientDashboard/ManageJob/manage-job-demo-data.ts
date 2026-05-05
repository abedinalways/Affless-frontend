import type { JobStatus } from "@/lib/job-status";

export interface JobRow {
  id: string;
  service: string;
  thumbnail: string;
  total: number;
  dueOn: Date;
  status: JobStatus;
  customer: string;
  deliveryDate: Date;
  price: number;
  orderId: string;
  category?: string;
  platform?: string;
  duration?: number;
  videoLength?: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
  }
}

export const ALL_JOBS: JobRow[] = [
  {
    id: "1",
    service: "YouTube long-form edit with multicam sync",
    thumbnail: "/images/mnagejob1.jpg",
    total: 654,
    dueOn: new Date("2025-06-21"),
    status: "completed",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-12-14T07:24:00"),
    price: 654,
    orderId: "#EM78373A0",
    category: "long-form videos",
    platform: "YouTube",
    duration: 5,
    videoLength: 4,
    timeLeft: {
      days: 0,
      hours: 0,
      minutes: 0
    }
  },
  {
    id: "2",
    service: "TikTok reel series with hooks and captions",
    thumbnail: "/images/mnagejob2.jpg",
    total: 743,
    dueOn: new Date("2026-04-21"),
    status: "in_revision",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2026-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A1",
    category: "Shorts/Reels/TikToks",
    platform: "TikTok",
    duration: 3,
    videoLength: 39,
    timeLeft: {
      days: 3,
      hours: 5,
      minutes: 34
    }
  },
  {
    id: "3",
    service: "Instagram interview cut with subtitles",
    thumbnail: "/images/mnagejob3.jpg",
    total: 512,
    dueOn: new Date("2025-06-21"),
    status: "pending",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A2",
    category: "caption/subtitles",
    platform: "Instagram",
    duration: 4,
    timeLeft: {
      days: 10,
      hours: 0,
      minutes: 5
    }
  },
  {
    id: "4",
    service: "Facebook product teaser with motion graphics",
    thumbnail: "/images/mnagejob1.jpg",
    total: 654,
    dueOn: new Date("2026-02-10"),
    status: "in_progress",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-11-06T07:24:00"),
    price: 654,
    orderId: "#EM78373A3",
    category: "long-form videos",
    platform: "Facebook",
    duration: 5,
    videoLength: 2,
    timeLeft: {
      days: 21,
      hours: 23,
      minutes: 10
    }
  },
  {
    id: "5",
    service: "X ad creative edit for campaign launch",
    thumbnail: "/images/mnagejob2.jpg",
    total: 743,
    dueOn: new Date("2025-06-21"),
    status: "delivered",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2025-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A4",
    category: "thumbnails",
    platform: "X (Twitter)",
    duration: 5,
    timeLeft: {
      days: 5,
      hours: 13,
      minutes: 0
    }
  },
  {
    id: "6",
    service: "YouTube UGC ad versioning and audio mix",
    thumbnail: "/images/mnagejob3.jpg",
    total: 512,
    dueOn: new Date("2025-06-21"),
    status: "late",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A5",
    category: "ads/UGC",
    platform: "YouTube",
    duration: 2,
    videoLength: 1,
    timeLeft: {
      days: -2,
      hours: 0,
      minutes: 0
    }
  },
  {
    id: "7",
    service: "Podcast episode repurpose into social clips",
    thumbnail: "/images/mnagejob1.jpg",
    total: 654,
    dueOn: new Date("2025-06-21"),
    status: "canceled",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-11-06T07:24:00"),
    price: 654,
    orderId: "#EM78373A6",
    category: "podcasts",
    platform: "YouTube",
    duration: 6,
    videoLength: 20,
    timeLeft: {
      days: 0,
      hours: 0,
      minutes: 0
    }
  },
  {
    id: "8",
    service: "YouTube thumbnail package for 10 episodes",
    thumbnail: "/images/mnagejob2.jpg",
    total: 743,
    dueOn: new Date("2025-06-21"),
    status: "delivered",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2025-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A7",
    category: "thumbnails",
    platform: "YouTube",
    duration: 7,
    timeLeft: {
      days: 2,
      hours: 19,
      minutes: 25
    }
  },
  {
    id: "9",
    service: "YouTube tutorial edit with chapter markers",
    thumbnail: "/images/mnagejob3.jpg",
    total: 512,
    dueOn: new Date("2025-06-21"),
    status: "in_progress",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A8",
    category: "caption/subtitles",
    platform: "YouTube",
    duration: 4,
    timeLeft: {
      days: 16,
      hours: 16,
      minutes: 16
    }
  },
];