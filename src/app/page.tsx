import { Suspense } from "react";
import App from "./_app";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
}
