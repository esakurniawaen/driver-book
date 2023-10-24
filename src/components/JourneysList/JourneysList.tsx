import type { Journey } from "@/types";
import { groupBy } from "@/utils";
import Card from "./Card";

interface JourneysListProps {
    journeys: Journey[];
    onJourneyDelete: (journeyId: string) => void;
}

type GroupedJourneysByDate = {
    [date: string]: Journey[];
};

export default function JourneysList({ journeys, onJourneyDelete }: JourneysListProps) {
    const groupedByDate: GroupedJourneysByDate = groupBy(journeys, "date");
    const sortedDate = Object.keys(groupedByDate).sort();

    return (
        <div className="mx-4 mb-4 mt-4 space-y-8">
            {sortedDate.map((date) => (
                <div className="" key={date}>
                    <h2 className="mb-2 ml-1">
                        {new Date(date).toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </h2>
                    <div className="grid gap-4">
                        {groupedByDate[date].map((journey) => (
                            <Card
                                key={journey.id}
                                journey={journey}
                                onDelete={() => onJourneyDelete(journey.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
