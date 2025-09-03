import { Metadata } from "next";

const metadata: Metadata = {
  title: "Live Account - Afterprime",
  description: "This is Afterprime Live Account page",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
  },
};

export default function LiveAccountPage() {
  return <div>Live Account Page</div>;
}
