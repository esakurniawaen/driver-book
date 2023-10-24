import type { Journey } from "@/types";
import Item from "./Item";

interface CardProps {
    journey: Journey;
    onDelete: () => void;
}

export default function Card({ journey, onDelete }: CardProps) {
    function handleDelete() {
        const isContinue = window.confirm(
            "Are you sure want to delete this item?"
        );
        if (isContinue) {
            onDelete();
        }
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
            className="py-3 px-5 text-slate-700 rounded-lg shadow bg-slate-100"
        >
            <div className="flex px-1 mb-3 justify-between items-center">
                <h3 className="font-semibold text-xl">{toDisplayServiceType()}</h3>
                <button onClick={handleDelete} className="text-red-400">
                    Delete
                </button>
            </div>

            <ul className="gap-2 grid">
                <h4 className="sr-only">Details</h4>
                <Item>Name: {journey.passangerName}</Item>
                <Item>
                    Pax: {journey.pax}
                    {journey.pax > 1 ? " persons" : " person"}
                </Item>
                <Item>From: {journey.pickupLocation}</Item>
                {journey.serviceType === "FULL_DAY" && (
                    <Item>
                        <span>Route:</span>
                        <ul className="list-decimal rounded divide-y divide-slate-200 border border-slate-200 list-inside">
                            {journey.destinations.map((destination) => (
                                <li className="py-1 px-2" key={destination.id}>
                                    {destination.location}
                                </li>
                            ))}
                        </ul>
                    </Item>
                )}
                <Item>To: {journey.dropoffLocation}</Item>
            </ul>
        </div>
    );
}
