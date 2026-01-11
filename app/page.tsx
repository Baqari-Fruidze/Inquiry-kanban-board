import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start ">
      <main className="min-w-3xl max-w-screen-2xl bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-6 shadow-2xl flex flex-col">
        <header>
          <Header />
        </header>
        <section>
          <span> aq iqneba filtraciis funqciebi</span>
        </section>
        <section></section>
      </main>
    </div>
  );
}
