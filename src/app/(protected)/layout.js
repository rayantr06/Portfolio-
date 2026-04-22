import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef4f7]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
