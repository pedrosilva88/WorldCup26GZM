import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import HomePalpitesSection from "@/components/HomePalpitesSection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Mobile: stacked. lg+: side by side */}
      <div className="lg:max-w-[1400px] lg:mx-auto lg:px-8 lg:flex lg:gap-10 lg:items-start">
        <div className="lg:w-[420px] lg:shrink-0">
          <LeaderboardSection />
        </div>
        <div className="lg:flex-1 lg:min-w-0">
          <HomePalpitesSection />
        </div>
      </div>

      <footer className="border-t border-white/6 mt-8 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-4 h-1 rounded-full bg-wc-gold opacity-50" />
          <div className="w-4 h-1 rounded-full bg-wc-green opacity-50" />
          <div className="w-4 h-1 rounded-full bg-wc-red opacity-50" />
        </div>
        <p className="text-xs text-wc-white/20 font-display tracking-widest">MUNDIAL 2026 · BOLÃO GZM</p>
      </footer>
    </main>
  );
}
