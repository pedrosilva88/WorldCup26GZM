import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeaderboardSection from "@/components/LeaderboardSection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LeaderboardSection />
      <footer className="border-t border-wc-blue-mid/30 mt-16 py-8 text-center text-xs text-wc-white/20">
        <p>Mundial 2026 · Bolão GZM</p>
      </footer>
    </main>
  );
}
