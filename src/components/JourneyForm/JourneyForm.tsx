import type { FullDayJourney, Journey } from "@/atom";
import { journeysAtom } from "@/atom";
import { capitalizeEveryWord, capitalizeFirstWord } from "@/utils";
import { createId } from "@paralleldrive/cuid2";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useMap } from "react-use";
import DestinationField from "./DestinationField";
import FormField from "./FormField";
import ServiceTypeField from "./ServiceTypeField";

const INITIAL_NEW_JOURNEY: Journey = {
    id: createId(),
    serviceType: "CHECK_IN",
    passangerName: "",
    pax: 0,
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    note: undefined,
};

export default function JourneyForm() {
    const router = useRouter();

    const [journeys, setJourneys] = useAtom(journeysAtom);

    const [newJourney, { set }] = useMap(INITIAL_NEW_JOURNEY);
    const [destinations, setDestinations] = useState<
        FullDayJourney["destinations"]
    >([]);

    function handleJourneySubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        if (newJourney.serviceType === "FULL_DAY") {
            setJourneys([{ ...newJourney, destinations }, ...journeys]);
        } else {
            setJourneys([newJourney, ...journeys]);
        }

        router.push("/");
    }

    return (
        <form onSubmit={handleJourneySubmit}>
            <ServiceTypeField
                serviceType={newJourney.serviceType}
                onServiceTypeChange={(newServiceType) =>
                    set("serviceType", newServiceType)
                }
            />

            <div className="px-4 space-y-3">
                <FormField
                    label="Name"
                    value={newJourney.passangerName}
                    onValueChange={(newPassangerName) =>
                        set(
                            "passangerName",
                            capitalizeEveryWord(newPassangerName)
                        )
                    }
                    required
                />
                <div className="flex gap-3">
                    <FormField
                        label="Pax"
                        type="number"
                        min="1"
                        value={newJourney.pax}
                        onValueChange={(newPax) => set("pax", newPax)}
                        required
                        defaultValue={"hello world"}
                    />
                    <FormField
                        label="Date"
                        type="date"
                        value={newJourney.date}
                        onValueChange={(newDate) => set("date", newDate)}
                        required
                    />
                </div>

                <FormField
                    label="Pickup Location"
                    value={newJourney.pickupLocation}
                    onValueChange={(newPickupLocation) =>
                        set(
                            "pickupLocation",
                            capitalizeEveryWord(newPickupLocation)
                        )
                    }
                    required
                />

                {newJourney.serviceType === "FULL_DAY" && (
                    <DestinationField
                        destinations={destinations}
                        onDestinationsChange={setDestinations}
                    />
                )}

                <FormField
                    label="Drop-off Location"
                    value={newJourney.dropoffLocation}
                    onValueChange={(newDropoffLocation) =>
                        set(
                            "dropoffLocation",
                            capitalizeEveryWord(newDropoffLocation)
                        )
                    }
                    required
                />

                <FormField
                    label="Note (Optional)"
                    value={newJourney.note ?? ""}
                    onValueChange={(newNote) =>
                        set("note", capitalizeFirstWord(newNote))
                    }
                />
            </div>
            <div className="mt-5 px-4">
                <button
                    type="submit"
                    className="text-slate-100 hover:bg-blue-500 hover:text-slate-50 bg-blue-400 rounded-md py-2 w-full"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
