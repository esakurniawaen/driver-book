import type { Journey } from "@/types";
import Header from "./Header";
import JourneyForm from "./JourneyForm/JourneyForm";
import JourneysList from "./JourneysList/JourneysList";

interface TabletLaptopAndDesktopPageProps {
    journeys: Journey[];
    onJourneySubmit: (toAddJourney: Journey) => void;
    onJourneyDelete: (journeyId: string) => void;
}

export default function TabletLaptopAndDesktopPage({
    journeys,
    onJourneySubmit,
    onJourneyDelete,
}: TabletLaptopAndDesktopPageProps) {
    return (
        <>
            <Header />
            <main className="flex items-start">
                <div className="sticky overflow-auto shadow pb-4 bg-slate-50 w-80 z-40 h-screen top-0 mt-4 left-0">
                    <JourneyForm onSubmit={onJourneySubmit} />
                </div>
                <div className="grow">
                    <JourneysList
                        onJourneyDelete={onJourneyDelete}
                        journeys={journeys}
                    />
                </div>
            </main>
        </>
    );
}
