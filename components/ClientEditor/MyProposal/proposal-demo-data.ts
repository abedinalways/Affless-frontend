import { JobStatus } from "@/lib/job-status";

export interface ProposalRow {
  id: string;
  service: string;
  thumbnail: string;
  total: number;
  dueOn: Date;
  status: "in_progress" | "in_revision" | "delivered" | "completed" | "cancelled" | "late" | "pending";
  customer: string;
  deliveryDate: Date;
  price: number;
  orderId: string;
  category?: string;
  platform?: string;
  duration?: number;
  videoLength?: number;
  timeLeft?: {
    days: number;
    hours: number;
    minutes: number;
  };
}

export const PROPOSAL_DEMO_DATA: ProposalRow[] = [
  {
    id: "1",
    thumbnail: "/images/mnagejob2.jpg",
    service: "YouTube vlog edit with subtitles and transitions",
    total: 55,
    dueOn: new Date("2026-03-09"),
    status: "in_progress",
    customer: "Alex Johnson",
    deliveryDate: new Date("2026-03-09"),
    price: 55,
    orderId: "ORD-1001",
    timeLeft: { days: 1, hours: 2, minutes: 3 }
  },
  {
    id: "2",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Instagram reel cutdown from long-form podcast",
    total: 55,
    dueOn: new Date("2026-03-07"),
    status: "pending",
    customer: "Emma Smith",
    deliveryDate: new Date("2026-03-07"),
    price: 55,
    orderId: "ORD-1002",
    timeLeft: { days: 0, hours: 0, minutes: 0 }
  },
  {
    id: "3",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Corporate interview cleanup and color correction",
    total: 60,
    dueOn: new Date("2026-03-10"),
    status: "in_revision",
    customer: "Noah Davis",
    deliveryDate: new Date("2026-03-10"),
    price: 60,
    orderId: "ORD-1003",
    timeLeft: { days: 2, hours: 5, minutes: 10 }
  },
  {
    id: "4",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Short ad edit with motion graphics and CTA",
    total: 70,
    dueOn: new Date("2026-03-01"),
    status: "late",
    customer: "Olivia Wilson",
    deliveryDate: new Date("2026-03-01"),
    price: 70,
    orderId: "ORD-1004",
    timeLeft: { days: -2, hours: -3, minutes: -15 }
  },
  {
    id: "5",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Wedding highlight film with cinematic grading",
    total: 80,
    dueOn: new Date("2026-03-11"),
    status: "delivered",
    customer: "Liam Brown",
    deliveryDate: new Date("2026-03-11"),
    price: 80,
    orderId: "ORD-1005",
      timeLeft: { days: 4, hours: 12, minutes: 0 }
  },
  {
    id: "6",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Course module screencast edits with callouts",
    total: 55,
    dueOn: new Date("2026-03-06"),
    status: "completed",
    customer: "Sophia Miller",
    deliveryDate: new Date("2026-03-06"),
    price: 55,
    orderId: "ORD-1006",
    timeLeft: { days: 0, hours: 0, minutes: 0 }
  },
  {
    id: "7",
    thumbnail: "/images/mnagejob2.jpg",
    service: "TikTok pack of 5 clips with hooks and captions",
    total: 55,
    dueOn: new Date("2026-03-08"),
    status: "cancelled",
    customer: "James Taylor",
    deliveryDate: new Date("2026-03-08"),
    price: 55,
    orderId: "ORD-1007",
    timeLeft: { days: 0, hours: 0, minutes: 0 }
  },
  {
    id: "8",
    thumbnail: "/images/mnagejob2.jpg",
    service: "Gameplay montage with sound design sync",
    total: 90,
    dueOn: new Date("2026-03-13"),
    status: "pending",
    customer: "Ava Anderson",
    deliveryDate: new Date("2026-03-13"),
    price: 90,
    orderId: "ORD-1008",
    timeLeft: { days: 0, hours: 0, minutes: 0 }
  },
];
