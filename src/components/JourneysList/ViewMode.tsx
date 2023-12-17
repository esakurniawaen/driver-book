import { Journey } from "@/types";
import { Mode } from "./Card";
import _ from "lodash";
import { ReactNode } from "react";
import { useJourneyStore } from "@/useJourneyStore";

type ViewModeProps = {
    journey: Journey;
    onModeChange: (nextMode: Mode) => void;
};

export default function ViewMode({ journey, onModeChange }: ViewModeProps) {
    const deleteJourney = useJourneyStore((state) => state.deleteJourney);

    function handleDelete() {
        const isContinue = window.confirm(
            "Are you sure want to delete this item?"
        );
        if (!isContinue) return;

        deleteJourney(journey.id);
    }

    return (
        <article className="py-4 px-5 rounded-lg shadow bg-slate-100">
            <div className="flex px-1 mb-3 justify-between items-center">
                <h3 className="font-bold text-slate-700 text-2xl">
                    {_.upperFirst(_.lowerCase(journey.serviceType))}
                </h3>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDelete}
                        className="text-red-400 transition hover:text-red-500"
                    >
                        Delete
                    </button>
                    <button
                        className="bg-slate-200 transition rounded text-slate-700 hover:bg-slate-300 hover:text-slate-800 py-0.5 px-2"
                        onClick={() => onModeChange("EDIT")}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <ul className="gap-2 grid">
                <h4 className="sr-only">Details</h4>
                <Detail>
                    <span className="text-slate-500">Name:</span>{" "}
                    {journey.passangerName}
                </Detail>
                <Detail>
                    <span className="text-slate-500">Number of pax:</span>{" "}
                    {journey.pax}
                </Detail>
                <Detail>
                    <span className="text-slate-500">From:</span>{" "}
                    {journey.pickupLocation}
                </Detail>
                {journey.serviceType === "FULL_DAY" && (
                    <Detail>
                        <span className="text-slate-500">Route:</span>
                        <ul className="list-decimal rounded divide-y divide-slate-200 border border-slate-200 list-inside">
                            {journey.destinations.map((destination) => (
                                <li className="py-1 px-2" key={destination.id}>
                                    {destination.location}
                                </li>
                            ))}
                        </ul>
                    </Detail>
                )}
                <Detail>
                    <span className="text-slate-500">To:</span>{" "}
                    {journey.dropoffLocation}
                </Detail>
                {journey.note && (
                    <Detail>
                        <span className="block text-center text-lg border-b pb-2 text-slate-500 border-slate-300">
                            Note
                        </span>
                        <span className="block pt-2">{journey.note}</span>
                    </Detail>
                )}
            </ul>
        </article>
    );
}

function Detail({ children }: { children: ReactNode }) {
    return (
        <li className="py-2 px-3 text-slate-700 rounded-md border border-slate-300">
            {children}
        </li>
    );
}
