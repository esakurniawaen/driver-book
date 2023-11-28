import type { FullDayJourney } from "@/atom";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { createId } from "@paralleldrive/cuid2";
import Input from "../Input";
import { capitalizeEveryWord } from "@/utils";

interface DestinationFieldProps {
    destinations: FullDayJourney["destinations"];
    onDestinationsChange: (
        updatedDestinations: FullDayJourney["destinations"]
    ) => void;
}

export default function DestinationField({
    destinations,
    onDestinationsChange,
}: DestinationFieldProps) {
    function changeLocation(destinationId: string, updatedLocation: string) {
        const updatedDestinations = destinations.map((destination) =>
            destination.id === destinationId
                ? {
                      ...destination,
                      location: updatedLocation,
                  }
                : destination
        );

        onDestinationsChange(updatedDestinations);
    }

    function addDestination() {
        const newDestination = {
            id: createId(),
            location: "",
        };

        onDestinationsChange([...destinations, newDestination]);
    }

    function deleteDestination(destinationId: string) {
        const updatedDestinations = destinations.filter(
            (destination) => destination.id !== destinationId
        );
        onDestinationsChange(updatedDestinations);
    }

    return (
        <div className="">
            <label>Route</label>

            <div className="space-y-2">
                {destinations.map((destination, idx) => (
                    <div className="flex items-center" key={idx}>
                        <div className="w-6">{idx + 1}.</div>
                        <div className="grow">
                            <Input
                                required
                                value={destination.location}
                                onChange={(evt) =>
                                    changeLocation(
                                        destination.id,
                                        capitalizeEveryWord(evt.target.value)
                                    )
                                }
                            />
                        </div>

                        <button
                            className="p-2 ml-2 border border-slate-300 rounded-md"
                            type="button"
                            onClick={() => deleteDestination(destination.id)}
                        >
                            <XMarkIcon className="h-5 w-5 text-red-400" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                className="p-2 mt-2 ml-auto mr-0 block border border-slate-300 rounded-md"
                onClick={addDestination}
                type="button"
            >
                <PlusIcon className="h-5 w-5 text-green-400" />
            </button>
        </div>
    );
}
