"use client";
import LaptopAndDesktopPage from "@/components/LaptopAndDesktopPage";
import MobileAndTabletPage from "@/components/MobileAndTabletPage";
import { Journey } from "@/types";
import { useMediaQuery } from "react-responsive";
import { useIsClient, useLocalStorage } from "usehooks-ts";

export default function Home() {
    const [journeys, setJourneys] = useLocalStorage<Journey[]>("journeys", []);

    function addJourney(toAddJourney: Journey) {
        setJourneys([...journeys, toAddJourney]);
    }

    function deleteJourney(journeyId: string) {
        setJourneys(journeys.filter((journey) => journey.id !== journeyId));
    }

    const isClient = useIsClient();
    const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });

    if (!isClient) return null;

    if (isMobileOrTablet) {
        return (
            <MobileAndTabletPage
                journeys={journeys}
                onJourneySubmit={addJourney}
                onJourneyDelete={deleteJourney}
            />
        );
    } else {
        return (
            <LaptopAndDesktopPage
                journeys={journeys}
                onJourneySubmit={addJourney}
                onJourneyDelete={deleteJourney}
            />
        );
    }
}
