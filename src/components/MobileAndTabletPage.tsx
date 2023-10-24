import type { Journey } from "@/types";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Header from "./Header";
import TripForm from "./JourneyForm/JourneyForm";
import JourneysList from "./JourneysList/JourneysList";

interface MobileAndTabletPageProps {
    journeys: Journey[];
    onJourneySubmit: (toAddJourney: Journey) => void;
    onJourneyDelete: (journeyId: string) => void
}

export default function MobileAndTabletPage({
    journeys,
    onJourneySubmit,
    onJourneyDelete
}: MobileAndTabletPageProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    function handleJourneySubmit(toAddJourney: Journey) {
        setIsFormOpen(false);
        onJourneySubmit(toAddJourney);
    }

    return (
        <>
            <Header />
            <main>
                {isFormOpen ? (
                    <div className="fixed overflow-auto z-30 inset-0 bg-slate-50">
                        <div className="h-10 flex pl-4 items-center">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className=""
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <TripForm onSubmit={handleJourneySubmit} />
                    </div>
                ) : (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="p-3 fixed flex bg-slate-50 shadow-lg rounded-lg bottom-5 right-5"
                    >
                        <PencilSquareIcon className="h-6 w-6 text-sky-500" />
                    </button>
                )}

                <JourneysList journeys={journeys} onJourneyDelete={onJourneyDelete} />
            </main>
        </>
    );
}
