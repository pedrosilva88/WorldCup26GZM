import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import RegisterSection from "@/components/RegisterSection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LeaderboardSection />
      <RegisterSection />
      <footer className="border-t border-wc-blue-mid/30 mt-16 py-8 text-center text-xs text-wc-white/20">
        <p>Mundial 2026 · Bolão GZM · Apenas para uso entre amigos</p>
      </footer>
    </main>
  );
}
