"use client";
import JourneysList from "@/components/JourneysList/JourneysList";
import { PencilSquareIcon, PlusIcon, PlusSmallIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMountedState } from "react-use";

export default function HomePage() {
    return (
        <>
            <header className="shadow-md mb-4 flex items-center justify-between z-20 top-0 backdrop-blur-xl bg-white/30 p-4 sticky inset-x-0">
                <h1 className="">JourneyDrive</h1>
                <Link
                    className="flex px-3 py-2 items-center gap-1 rounded-md text-slate-200 hover:bg-blue-600 hover:text-slate-100 bg-blue-500"
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
