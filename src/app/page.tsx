import Home from "./home/HomePage";

export default function RootPage() {
  // just reuse the HomePage component that already fetches the WP homepage
  return <Home />;
}
