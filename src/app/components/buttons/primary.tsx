import Link from "next/link";
import clsx from "clsx";

type color = "bg-red-400" | "bg-black" | "bg-white";

interface Props {
  href: string;
  color: color;
  children: React.ReactNode;
}

export default function PrimaryButton({ href, color, children }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-slate-900 font-bold hover:bg-slate-200 hover:text-black transition-all duration-300",
        color
      )}
    >
      {children}
    </Link>
  );
}
