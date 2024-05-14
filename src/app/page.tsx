import { Suspense } from "react";
import App from "./_app";
import { Logo } from "./logo";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <h1 className="text-4xl font-bold text-center">Wonderland Checker</h1>
      </div>
      <h2 className="text-lg">Loading...</h2>
    </div>
  );
};
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
}
