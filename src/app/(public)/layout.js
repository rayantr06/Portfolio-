import AuthBootstrap from "@/components/auth/AuthBootstrap";
import StoreProvider from "@/store/provider";

export default function PublicLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(8,145,178,0.18),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 py-12 sm:px-6">
      <StoreProvider>
        <AuthBootstrap />
        <div className="w-full max-w-xl">{children}</div>
      </StoreProvider>
    </div>
  );
}
