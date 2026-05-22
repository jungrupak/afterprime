import Button from "@/components/ui/Button";

export default function VsSymbolNotFound() {
  return (
    <section>
      <div className="ap_container">
        <div className="text-center px-6 py-30">
          <h1 className="h1-size mt-30">Comparison Not Available</h1>
          <p className="paragraph mt-4 mb-10 opacity-70">
            This broker or symbol combination is not currently tracked. Check
            back or view all broker comparisons.
          </p>
          <Button varient="primary-ghost" size="regular" href="/vs/">
            Back to Comparisons
          </Button>
        </div>
      </div>
    </section>
  );
}
