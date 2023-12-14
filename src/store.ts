import { create } from "zustand";
import { Journey } from "./types";

interface JourneyState {
    journeys: Journey[];
    addJourney: (newJourney: Journey) => void;
    deleteJourney: (journeyId: string) => void;
    updateJourney: (updatedJourney: Journey) => void;
}

export const useJourneyStore = create<JourneyState>()((set) => ({
    journeys: [
        {
            serviceType: "CHECK_IN",
            id: "1",
            passangerName: "First World",
            date: "2023-12-13",
            pax: 2,
            pickupLocation: "Airport",
            dropoffLocation: "Padmasari",
        },
        {
            serviceType: "TRANSFER",
            id: "2",
            passangerName: "Second World",
            date: "2023-12-14",
            pax: 2,
            pickupLocation: "Mercure",
            dropoffLocation: "Harbor",
        },
        {
            serviceType: "FULL_DAY",
            id: "3",
            passangerName: "Third World",
            date: "2023-12-15",
            destinations: [
                { id: "1", location: "Pasar Ubud" },
                { id: "2", location: "Uluwatu" },
            ],
            pax: 1,
            pickupLocation: "Pujuk Pujuk Lovina",
            dropoffLocation: "Kuta",
        },
    ],
    addJourney: (newJourney) =>
        set((state) => ({ journeys: [...state.journeys, newJourney] })),
    deleteJourney: (journeyId) =>
        set((state) => ({
            journeys: state.journeys.filter(
                (journey) => journey.id !== journeyId
            ),
        })),
    updateJourney: (updatedJourney) =>
        set((state) => ({
            journeys: state.journeys.map((journey) =>
                journey.id === updatedJourney.id ? updatedJourney : journey
            ),
        })),
}));

