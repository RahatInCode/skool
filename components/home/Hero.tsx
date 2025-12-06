import Image from "next/image";

// components/home/Hero.tsx
export default function Hero() {
  return (
    <section className=" bg-slate-50">
      <div>
        <Image
          src="/assets/fallback_banner_image_udlite.webp"
          alt="Hero Image"
          width={1920}
          height={600}
          className="w-full object-cover"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Learn new skills online with top educators
        </h1>
        <p className="max-w-2xl text-lg text-slate-700">
          Join millions of learners from around the world already learning on
          Skool. Find the right instructor for you.
        </p>
        <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">
          Get Started
        </button>
       </div>
    </section>
  );
}