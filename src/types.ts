
interface CommonJourneyProps {
    id: string;
    date: string;
    passangerName: string;
    pax: number;
    pickupLocation: string;
    dropoffLocation: string;
    note?: string;
}

export interface FullDayJourney extends CommonJourneyProps {
    serviceType: "FULL_DAY";
    destinations: { id: string; location: string }[];
}
export interface NonFullDayJourney extends CommonJourneyProps {
    serviceType: "CHECK_IN" | "CHECK_OUT" | "TRANSFER";
}

export type Journey = FullDayJourney | NonFullDayJourney;

export type ColorTheme = "BLUE" | "GREEN";
