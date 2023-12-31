"use client";

import JourneysList from "@/components/JourneysList";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
     const [isClient, setIsClient] = useState(false);

     useEffect(() => {
         setIsClient(true);
     }, []);

    if (!isClient) return null;
    
    return (
        <>
            <header className="shadow-md mb-4 flex items-center justify-between z-20 top-0 backdrop-blur-xl bg-white/30 p-4 sticky inset-x-0">
                <h1 className="text-lg font-bold">DriverBook</h1>
                <Link
                    className="flex transition px-3 py-2 items-center gap-1 rounded-md text-slate-200 hover:bg-blue-600 hover:text-slate-100 bg-blue-500"
                    href="/form"
                >
                    <span className="font-semibold">Add</span>
                    <SquaresPlusIcon className="w-6 h-6" />
                </Link>
            </header>

            <main className="max-w-2xl mx-auto">
                <JourneysList />
            </main>
        </>
    );
}
