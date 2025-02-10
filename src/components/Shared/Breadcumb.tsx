import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface IProps {
  page: string;
}

const Breadcumb = ({ page }: IProps) => {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <Link
          className="transition-all text-white/50 hover:text-white"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <ChevronRight className="text-white/50" />
      </li>
      <li>{page}</li>
    </ul>
  );
};

export default Breadcumb;
