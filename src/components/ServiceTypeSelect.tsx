import { FullDayJourney, Journey, NonFullDayJourney } from "@/types";
import { ColorTheme } from "@/types";
import { ChangeEvent } from "react";
import clsx from "clsx";

type ServiceTypeSelectProps = {
    size: "MEDIUM" | "LARGE";
    colorTheme: ColorTheme;
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
};

export default function ServiceTypeSelect({
    size,
    colorTheme,
    journey,
    onEachJourneyFieldChange,
    onAllJourneyFieldsChange,
}: ServiceTypeSelectProps) {
    function handleServiceTypeChange(evt: ChangeEvent<HTMLSelectElement>) {
        const nextType = evt.target.value as Journey["serviceType"];

        if (journey.serviceType === "FULL_DAY") {
            if (nextType === "FULL_DAY") return;
            const { serviceType, destinations, ...rest } = journey;
            onAllJourneyFieldsChange({ serviceType: nextType, ...rest });
        } else {
            if (nextType !== "FULL_DAY") {
                onEachJourneyFieldChange("serviceType", nextType);
            } else {
                const { serviceType, ...rest } = journey;
                onAllJourneyFieldsChange({
                    serviceType: nextType,
                    destinations: [],
                    ...rest,
                });
            }
        }
    }

    return (
        <select
            className={clsx(
                "py-1.5 border outline-none rounded-lg px-3 border-slate-300 transition",
                {
                    "font-semibold text-lg": size === "MEDIUM",
                    "font-bold text-xl": size === "LARGE",
                    "focus:border-blue-500": colorTheme === "BLUE",
                    "focus:border-emerald-500": colorTheme === "GREEN",
                }
            )}
            value={journey.serviceType}
            onChange={handleServiceTypeChange}
        >
            <option value="CHECK_IN">Check in</option>
            <option value="CHECK_OUT">Check out</option>
            <option value="TRANSFER">Transfer</option>
            <option value="FULL_DAY">Full day</option>
        </select>
    );
}