import type { FullDayJourney, Journey, NonFullDayJourney } from "@/types";
import { capitalizeEveryWord } from "@/utils";
import _ from "lodash";
import DestinationField from "./DestinationField";
import Input from "../Input";
import { ColorTheme } from "@/types";

interface JourneyFieldsProps {
    spaceBetween: "SMALL" | "LARGE";
    colorTheme: ColorTheme
    journey: Journey;
    onEachJourneyFieldChange: <
        K extends
            | "passangerName"
            | "date"
            | "pax"
            | "pickupLocation"
            | "dropoffLocation"
            | "note"
            | "id"
            | "serviceType"
    >(
        key: K,
        value: (FullDayJourney | NonFullDayJourney)[K]
    ) => void;
    onAllJourneyFieldsChange: (
        newJourney: FullDayJourney | NonFullDayJourney
    ) => void;
}

export default function JourneyForm({
    spaceBetween,
    colorTheme,
    journey,
    onAllJourneyFieldsChange,
    onEachJourneyFieldChange,
}: JourneyFieldsProps) {
    return (
        <div className={spaceBetween === "SMALL" ? "space-y-2" : "space-y-3"}>
            <div>
                <label>Name</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.passangerName}
                    onChange={(evt) =>
                        onEachJourneyFieldChange(
                            "passangerName",
                            capitalizeEveryWord(evt.target.value)
                        )
                    }
                    autoFocus
                    required
                />
            </div>
            <div
                className={`flex ${spaceBetween === "SMALL" ? "gap-x-2" : "gap-x-3"}`}
            >
                <div className="w-1/2">
                    <label>Number of passangers</label>
                    <Input
                        colorTheme={colorTheme}
                        type="number"
                        min="1"
                        value={journey.pax <= 0 ? "" : journey.pax}
                        onChange={(evt) =>
                            onEachJourneyFieldChange(
                                "pax",
                                evt.target.value !== ""
                                    ? Number(evt.target.value)
                                    : 0
                            )
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
                            onEachJourneyFieldChange("date", evt.target.value)
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
                        onEachJourneyFieldChange(
                            "pickupLocation",
                            capitalizeEveryWord(evt.target.value)
                        )
                    }
                    required
                />
            </div>

            {journey.serviceType === "FULL_DAY" && (
                <DestinationField
                    colorTheme={colorTheme}
                    destinations={journey.destinations}
                    onDestinationsChange={(destinations) =>
                        onAllJourneyFieldsChange({ ...journey, destinations })
                    }
                />
            )}

            <div>
                <label>Drop-off location</label>
                <Input
                    colorTheme={colorTheme}
                    value={journey.dropoffLocation}
                    onChange={(evt) =>
                        onEachJourneyFieldChange(
                            "dropoffLocation",
                            capitalizeEveryWord(evt.target.value)
                        )
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
                        onEachJourneyFieldChange(
                            "note",
                            _.upperFirst(evt.target.value)
                        )
                    }
                />
            </div>
        </div>
    );
}
