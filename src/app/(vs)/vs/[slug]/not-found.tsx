// app/not-found.tsx
import Button from "@/components/ui/Button";

export default function InstrumentNotFound() {
  return (
    <section>
      <div className="grainy_bg"></div>
      <div className="ap_container">
        <div className="text-center px-6">
          <h1
            className="text-[clamp(30px_,5vw_,120px)] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-30">
            This instrument is not available!
          </h1>
          <p className="mt-4 text-xl text-gray-400 mb-20">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button varient="primary-ghost" size="regular" href="/">
            Go Home
          </Button>
        </div>
      </div>
    </section>
  );
}
