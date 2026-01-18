import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 text-sm font-bold text-white shadow-sm">
        S
      </div>
      <span className="text-2xl font-bold tracking-tight text-slate-900">
        skool
      </span>
    </Link>
  );
}