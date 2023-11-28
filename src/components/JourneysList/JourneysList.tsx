import { journeysAtom, type Journey } from "@/atom";
import { groupBy } from "@/utils";
import Card from "./Card";
import { useAtomValue } from "jotai";

type GroupedJourneysByDate = {
    [date: string]: Journey[];
};

export default function JourneysList() {
    const journeys = useAtomValue(journeysAtom);
    const groupedByDate: GroupedJourneysByDate = groupBy(journeys, "date");
    const sortedDate = Object.keys(groupedByDate).sort();

    return (
        <div className="mx-4 grid gap-8">
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
                            <Card key={journey.id} journey={journey} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
