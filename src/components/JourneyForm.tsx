import type { Journey } from "@/types";
import { useJourneyStore } from "@/store";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useMap } from "react-use";
import JourneyFields from "./JourneyFields/JourneyFields";
import ServiceTypeSelect from "./ServiceTypeSelect";

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

    const addJourney = useJourneyStore((state) => state.addJourney);
    const [newJourney, { set: setEachField, setAll: setAllFields }] =
        useMap(INITIAL_NEW_JOURNEY);

    function handleJourneySubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        addJourney(newJourney);
        router.push("/");
    }

    return (
        <form onSubmit={handleJourneySubmit}>
            <div className="flex shadow-sm rounded-xl p-4 mb-3 bg-slate-100 justify-between items-center">
                <label className="text-lg text-slate-700 font-semibold">
                    Service type
                </label>
                <ServiceTypeSelect
                    size="MEDIUM"
                    colorTheme="BLUE"
                    journey={newJourney}
                    onEachJourneyFieldChange={setEachField}
                    onAllJourneyFieldsChange={setAllFields}
                />
            </div>

            <div className="px-4">
                <JourneyFields
                    spaceBetween="LARGE"
                    colorTheme="BLUE"
                    journey={newJourney}
                    onEachJourneyFieldChange={setEachField}
                    onAllJourneyFieldsChange={setAllFields}
                />
            </div>

            <div className="mt-5 px-4">
                <button
                    type="submit"
                    className="text-slate-100 transition hover:bg-blue-500 hover:text-slate-50 bg-blue-400 rounded-md py-2 w-full"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
