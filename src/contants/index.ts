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
    pathname: "/likes",
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
    pathname: "/credits",
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
