import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <h1 className="font-mono text-7xl font-extrabold tracking-widest text-white/20 mb-4 animate-pulse">
        404
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-8">
        Singularity reached · Page sucked into the event horizon
      </p>
      <Link
        href="/"
        className="px-6 py-3 border border-white/10 bg-white/5 hover:bg-white hover:text-black font-mono text-xs tracking-wider rounded-full transition-all duration-300"
      >
        ESCAPE GRAVITY WELL
      </Link>
    </div>
  );
}
