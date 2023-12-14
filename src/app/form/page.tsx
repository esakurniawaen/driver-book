"use client";

import JourneyForm from "@/components/JourneyForm";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function FormPage() {
    return (
        <>
            <header className="shadow-md backdrop-blur-xl bg-white/30 z-20 top-0 mb-4 bg-slate-50 pl-2 py-2 sticky inset-x-0">
                <Link
                    className="inline-block p-2 rounded-full transition hover:bg-slate-100 hover:text-slate-700 text-"
                    href="/"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
            </header>

            <main className="max-w-lg mx-auto">
                <JourneyForm />
            </main>
        </>
    );
}
