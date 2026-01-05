import Navbar from '@/components/Navbar/NavBar';
import Dock from '@/components/dock/Dock';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <Navbar />

      {/* Hero simple */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Bienvenida a VITA
        </h1>
        <p className="max-w-xl text-white/70">
          Empieza tu experiencia con una interfaz moderna, rápida y clara.
        </p>
      </section>

       <Dock />
    </main>
  );
}
