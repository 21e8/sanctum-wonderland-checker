"use client";
import Image from "next/image";
import { Logo } from "./logo";
import { useCallback, useEffect, useState } from "react";
import { PETS } from "./pets";
import { useRouter, useSearchParams } from "next/navigation";
type SanctumResponse = {
  totalExp: number;
  globalRank: number;
  referralLevel: number;
  referralExp: number;
  referralCode: string;
  nReferred: number;
  referrer: string;
  pets: {
    mint: string;
    level: number;
    levelExp: number;
    expPerEpoch: number;
  }[];
  lastRecordedEpoch: number;
  createdAt: number;
};

export default function App() {
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState<SanctumResponse | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const getInfo = useCallback(
    async (address: string) => {
      setError("");
      setLoading(true);
      try {
        const json: SanctumResponse = await (
          await fetch(
            `https://wonderland-api2.ngrok.dev/s1/user/full?pk=${address}`
          )
        ).json();
        setInfo(json);
        router.push(`/?address=${address}`);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    },
    [router]
  );
  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      getInfo(address);
    }
  }, [getInfo, searchParams]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <h1 className="text-4xl font-bold text-center">Wonderland Checker</h1>
      </div>
      <label htmlFor="address-input"></label>
      <div className="flex flex-col gap-4">
        <input
          id="address-input"
          type="text"
          value={address}
          placeholder="Enter your address"
          onChange={(e) => {
            setError("");
            setAddress(e.target.value);
          }}
          className="w-96 h-12 p-4 border border-gray-300 rounded-lg text-black"
        />
        <button
          onClick={() => getInfo(address)}
          className="w-96 px-4 py-3 bg-blue-500 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Check"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {info && (
        <>
          <h2 className="text-2xl font-bold text-center">Stats</h2>
          <div className="grid grid-cols-2 gap-4 border border-white px-3 py-2 rounded-lg">
            <div>Created at:</div>
            <div>{new Date(info.createdAt).toLocaleString()}</div>
            <div>Last Recorded Epoch:</div>
            <div>{info.lastRecordedEpoch}</div>
            <div>Global Rank:</div>
            <div>{info.globalRank}</div>
            <div>Total Exp:</div>
            <div>{info.totalExp}</div>
            <div>Referral Code:</div>
            <div>{info.referralCode}</div>
            <div>Referral Level:</div>
            <div>{info.referralLevel}</div>
            <div>Referral Exp:</div>
            <div>{info.referralExp}</div>
            <div># Referred:</div>
            <div>{info.nReferred}</div>
            <div>Referrer:</div>
            <div>{info.referrer}</div>
          </div>
          <h2 className="text-2xl font-bold text-center">Pets</h2>
          <div className="grid grid-cols-2 gap-4 border border-white rounded-lg">
            {info.pets.map((pet) => {
              const { image, name } = PETS.find((p) => p.mint === pet.mint)!;
              return (
                <div className="px-3 py-2" key={pet.mint}>
                  <h4 className="col-span-2 text-center text-xl my-2">
                    {name}
                  </h4>
                  <div className="flex flex-row items-center justify-center mb-2">
                    <Image
                      src={image}
                      width={196}
                      height={196}
                      alt="Sanctum Pet"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 mx-6">
                      <span>Level</span>{" "}
                      <span className="text-right">{pet.level}</span>
                      <span>Level Exp</span>
                      <span className="text-right">{pet.levelExp}</span>
                      <span>Exp/Epoch</span>
                      <span className="text-right"> {pet.expPerEpoch}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
