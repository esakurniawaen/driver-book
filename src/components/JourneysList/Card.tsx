import Detail from "./Detail";
import { useAtom } from "jotai";
import { journeysAtom, type Journey } from "@/atom";

interface CardProps {
    journey: Journey;
}

export default function Card({ journey }: CardProps) {
    const [journeys, setJourneys] = useAtom(journeysAtom);

    function handleDelete() {
        const isContinue = window.confirm(
            "Are you sure want to delete this item?"
        );
        if (!isContinue) return;

        setJourneys(journeys.filter(({ id }) => id !== journey.id));
    }

    function handleEdit() {
        window.alert('The "Edit" feature will coming soon.');
    }

    function toDisplayServiceType() {
        if (journey.serviceType === "CHECK_IN") return "Check in";
        if (journey.serviceType === "CHECK_OUT") return "Check out";
        if (journey.serviceType === "TRANSFER") return "Transfer";
        return "Full day";
    }

    return (
        <div
            key={journey.id}
            className="py-3 px-5 rounded-lg shadow bg-slate-100"
        >
            <div className="flex px-1 mb-3 justify-between items-center">
                <h3 className="font-bold text-slate-700 text-2xl">
                    {toDisplayServiceType()}
                </h3>
                <div className="flex items-center gap-3">
                    <button onClick={handleDelete} className="text-red-400">
                        Delete
                    </button>
                    <button className="bg-slate-200 rounded text-slate-700 hover:bg-slate-300 hover:text-slate-800 py-0.5 px-2" onClick={handleEdit}>Edit</button>
                </div>
            </div>

            <ul className="gap-2 grid">
                <h4 className="sr-only">Details</h4>
                <Detail>
                    <span className="text-slate-500">Name:</span>{" "}
                    {journey.passangerName}
                </Detail>
                <Detail>
                    <span className="text-slate-500">Pax:</span> {journey.pax}
                    {journey.pax > 1 ? " persons" : " person"}
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
        </div>
    );
}
