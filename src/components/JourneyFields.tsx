import type { Journey } from "@/types";
import { ColorTheme } from "@/types";
import { capitalizeEveryWord } from "@/utils";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createId } from "@paralleldrive/cuid2";
import Input from "./Input";
import _ from "lodash";

interface JourneyFieldsProps {
    spaceBetween: "SMALL" | "LARGE";
    colorTheme: ColorTheme;
    journey: Journey;
    onJourneyChange: (newJourney: Journey) => void;
}

export default function JourneyFields({
    spaceBetween,
    colorTheme,
    journey,
    onJourneyChange,
}: JourneyFieldsProps) {
    function changeDestinationLocation(id: string, newLocation: string) {
        if (journey.serviceType !== "FULL_DAY") return;

        onJourneyChange({
            ...journey,
            destinations: journey.destinations.map((destination) =>
                destination.id === id
                    ? {
                          ...destination,
                          location: newLocation,
                      }
                    : destination
            ),
        });
    }

    function deleteDestination(id: string) {
        if (journey.serviceType !== "FULL_DAY") return;

        onJourneyChange({
            ...journey,
            destinations: journey.destinations.filter(
                (destination) => destination.id !== id
            ),
        });
    }

    function createBlankDestination() {
        if (journey.serviceType !== "FULL_DAY") return;

        onJourneyChange({
            ...journey,
            destinations: [
                ...journey.destinations,
                { id: createId(), location: "" },
            ],
        });
    }

    return (
        <div className={spaceBetween === "SMALL" ? "space-y-2" : "space-y-3"}>
            <div>
                <label>Name</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.passangerName}
                    onChange={(evt) =>
                        onJourneyChange({
                            ...journey,
                            passangerName: capitalizeEveryWord(
                                evt.target.value
                            ),
                        })
                    }
                    autoFocus
                    required
                />
            </div>
            <div
                className={`flex ${
                    spaceBetween === "SMALL" ? "gap-x-2" : "gap-x-3"
                }`}
            >
                <div className="w-1/2">
                    <label>Number of passangers</label>
                    <Input
                        colorTheme={colorTheme}
                        type="number"
                        min="1"
                        value={journey.pax <= 0 ? "" : journey.pax}
                        onChange={(evt) =>
                            onJourneyChange({
                                ...journey,
                                pax:
                                    evt.target.value !== ""
                                        ? Number(evt.target.value)
                                        : 0,
                            })
                        }
                        required
                    />
                </div>
                <div className="w-1/2">
                    <label>Date</label>
                    <Input
                        colorTheme={colorTheme}
                        type="date"
                        value={journey.date}
                        onChange={(evt) =>
                            onJourneyChange({
                                ...journey,
                                date: evt.target.value,
                            })
                        }
                        required
                    />
                </div>
            </div>

            <div>
                <label>Pickup location</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.pickupLocation}
                    onChange={(evt) =>
                        onJourneyChange({
                            ...journey,
                            pickupLocation: capitalizeEveryWord(
                                evt.target.value
                            ),
                        })
                    }
                    required
                />
            </div>

            {journey.serviceType === "FULL_DAY" && (
                <div>
                    <label>Route</label>
                    <div className="space-y-2">
                        {journey.destinations.map((destination, idx) => (
                            <DestinationField
                                key={destination.id}
                                location={destination.location}
                                indexStartFromFirst={idx + 1}
                                onChange={(newLocation) =>
                                    changeDestinationLocation(
                                        destination.id,
                                        newLocation
                                    )
                                }
                                onDelete={() =>
                                    deleteDestination(destination.id)
                                }
                                colorTheme={colorTheme}
                            />
                        ))}
                    </div>

                    <button
                        className="p-2 mt-2 ml-auto mr-0 block border border-slate-300 rounded-md"
                        onClick={createBlankDestination}
                        type="button"
                    >
                        <PlusIcon className="h-5 w-5 text-green-400" />
                    </button>
                </div>
            )}

            <div>
                <label>Drop-off location</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.dropoffLocation}
                    onChange={(evt) =>
                        onJourneyChange({
                            ...journey,
                            dropoffLocation: capitalizeEveryWord(
                                evt.target.value
                            ),
                        })
                    }
                    required
                />
            </div>
            <div>
                <label>Note (Optional)</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.note}
                    onChange={(evt) =>
                        onJourneyChange({
                            ...journey,
                            note: _.upperFirst(evt.target.value),
                        })
                    }
                />
            </div>
        </div>
    );
}

type DestinationFieldProps = {
    colorTheme: ColorTheme;
    location: string;
    indexStartFromFirst: number;
    onChange: (location: string) => void;
    onDelete: () => void;
};

export function DestinationField({
    location,
    indexStartFromFirst,
    colorTheme,
    onChange,
    onDelete,
}: DestinationFieldProps) {
    return (
        <div className="flex items-center">
            <div className="w-6">{indexStartFromFirst}.</div>
            <div className="grow">
                <Input
                    colorTheme={colorTheme}
                    required
                    value={location}
                    onChange={(evt) =>
                        onChange(capitalizeEveryWord(evt.target.value))
                    }
                    autoFocus
                />
            </div>

            <button
                className="p-2 ml-2 border border-slate-300 rounded-md"
                type="button"
                onClick={onDelete}
            >
                <XMarkIcon className="h-5 w-5 text-red-400" />
            </button>
        </div>
    );
}
