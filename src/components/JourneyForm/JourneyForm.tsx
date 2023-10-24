import type { FullDayJourney, Journey, NonFullDayJourney } from "@/types";
import { createId } from "@paralleldrive/cuid2";
import { FormEvent, useState } from "react";
import DestinationField from "./DestinationField";
import FormField from "./FormField";
import ServiceTypeField from "./ServiceTypeField";
import { capitalizeEveryWord } from "@/utils";

interface JourneyFormProps {
    onSubmit: (toAddJourney: Journey) => void;
}

type ServiceType =
    | FullDayJourney["serviceType"]
    | NonFullDayJourney["serviceType"];

export default function JourneyForm({ onSubmit }: JourneyFormProps) {
    const [serviceType, setServiceType] = useState<ServiceType>("CHECK_IN");
    const [passangerName, setPassangerName] = useState("");
    const [pax, setPax] = useState<string>("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [destinations, setDestinations] = useState<
        FullDayJourney["destinations"]
    >([{ id: createId(), location: "" }]);
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [date, setDate] = useState<string>("");

    function resetForm() {
        setServiceType("CHECK_IN");
        setPassangerName("");
        setPax("");
        setPickupLocation("");
        setDestinations([
            {
                id: createId(),
                location: "",
            },
        ]);
        setDropoffLocation("");
        setDate("");
    }

    function handleJourneySubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        if (serviceType === "FULL_DAY") {
            onSubmit({
                id: createId(),
                serviceType,
                passangerName,
                pax: Number(pax),
                pickupLocation,
                destinations,
                dropoffLocation,
                date: date as string,
            });
        } else {
            onSubmit({
                id: createId(),
                serviceType,
                passangerName,
                pax: Number(pax),
                pickupLocation,
                dropoffLocation,
                date: date as string,
            });
        }
        resetForm();
    }

    return (
        <form className="w-full h-full" onSubmit={handleJourneySubmit}>
            <ServiceTypeField
                serviceType={serviceType}
                onServiceTypeChange={setServiceType}
            />

            <div className="px-4 pb-3 space-y-3">
                <FormField
                    label="Name"
                    value={passangerName}
                    onValueChange={(value) =>
                        setPassangerName(capitalizeEveryWord(value))
                    }
                />

                <FormField
                    label="Pax"
                    type="number"
                    min="1"
                    value={pax}
                    onValueChange={setPax}
                />
                <FormField
                    label="Pickup Location"
                    value={pickupLocation}
                    onValueChange={(value) =>
                        setPickupLocation(capitalizeEveryWord(value))
                    }
                />

                {serviceType === "FULL_DAY" && (
                    <DestinationField
                        destinations={destinations}
                        onDestinationsChange={setDestinations}
                    />
                )}

                <FormField
                    label="Drop-off Location"
                    value={dropoffLocation}
                    onValueChange={(value) =>
                        setDropoffLocation(capitalizeEveryWord(value))
                    }
                />
                <FormField
                    label="Date"
                    type="date"
                    value={date}
                    onValueChange={setDate}
                />

                <button
                    type="submit"
                    className="bg-sky-400 hover:bg-sky-500 hover:text-slate-200 text-slate-50 rounded-md py-2 w-full"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
