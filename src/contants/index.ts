import {
  Bolt,
  BookOpen,
  Coins,
  Cross,
  Film,
  Heart,
  HeartIcon,
  History,
  Home,
  LayoutGrid,
  Moon,
  PersonStanding,
  Trophy,
  UserRound,
} from "lucide-react";

export const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    name: "Home",
    icon: Home,
    pathname: "/",
  },
  {
    name: "Daily Challenges",
    icon: Trophy,
    pathname: "/daily-challenges",
  },
  {
    name: "Likes",
    icon: Heart,
    pathname: "/likes-videos",
  },
  {
    name: "Uploads",
    icon: Film,
    pathname: "/videos",
  },
  {
    name: "Profile",
    icon: UserRound,
    pathname: "/profile",
  },
  {
    name: "Credits",
    icon: Coins,
    pathname: "/pricing",
  },
  {
    name: "Settings",
    icon: Bolt,
    pathname: "/settings",
  },
];

export const TAGS: TagType[] = [
  {
    name: "All",
    icon: LayoutGrid,
  },
  {
    name: "History",
    icon: History,
  },
  {
    name: "Kid",
    icon: PersonStanding,
  },
  {
    name: "Couples",
    icon: HeartIcon,
  },
  {
    name: "Biographics",
    icon: BookOpen,
  },
  {
    name: "Bible",
    icon: Cross,
  },
  {
    name: "Bedtime",
    icon: Moon,
  },
];

export const TAGS_ITEMS: string[] = [
  "Comedy",
  "Adventure",
  "Fantasy",
  "Sci-Fi",
  "Kids",
  "Action",
  "Education",
  "Animals",
  "Fairy Tales",
  "Superheroes",
];

export const Orientation = {
  longVideos: "landscape",
  shortVideos: "portrait",
};

// subscriptions
export const monthlySubscriptions: SubscriptionType[] = [
  {
    id: 1,
    name: "basic",
    price: 19,
    credits: 100,
    priceId: "price_1QwArgH3L9RCLevZckH8RQkd",
  },
  {
    id: 2,
    name: "standard",
    price: 34,
    credits: 200,
    priceId: "price_1QwAs9H3L9RCLevZGeEok6g7",
  },
  {
    id: 1,
    name: "popular",
    price: 59,
    credits: 300,
    priceId: "price_1QwAsYH3L9RCLevZlKNSedtE",
  },
];

export const yearlySubscriptions: SubscriptionType[] = [
  {
    id: 1,
    name: "basic",
    price: 190,
    credits: 100,
    priceId: "price_1QwG6kH3L9RCLevZfFT10ZMI",
  },
  {
    id: 2,
    name: "standard",
    price: 340,
    credits: 200,
    priceId: "price_1QwGV4H3L9RCLevZ0OMu6Z6q",
  },
  {
    id: 1,
    name: "popular",
    price: 590,
    credits: 300,
    priceId: "price_1QwGVlH3L9RCLevZ93mADI9I",
  },
];
