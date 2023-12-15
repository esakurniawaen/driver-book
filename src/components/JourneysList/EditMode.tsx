import { Journey } from "@/types";
import { ChangeEvent, FormEvent } from "react";
import { useMap } from "react-use";
import JourneyFields from "../JourneyFields";
import { Mode } from "./Card";
import ServiceTypeSelect from "../ServiceTypeSelect";
import { useJourneyStore } from "@/store";
import _ from 'lodash'

type EditModeProps = {
    journey: Journey;
    onModeChange: (nextMode: Mode) => void;
};

export default function EditMode({ journey, onModeChange }: EditModeProps) {
    const updateJourney = useJourneyStore((state) => state.updateJourney);

    const [modifiedJourney, { set: setEachField, setAll: setAllFields }] =
        useMap(journey);

    function handleCancel() {
        setAllFields(journey);
        onModeChange("VIEW");
    }

    function handleEdit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        updateJourney(modifiedJourney);
        onModeChange("VIEW");
    }

    return (
        <article className="py-4 px-5 rounded-lg shadow bg-slate-100">
            <form onSubmit={handleEdit}>
                <div className="flex mb-3 justify-between items-center">
                    <ServiceTypeSelect
                        size="LARGE"
                        colorTheme="GREEN"
                        journey={journey}
                        onEachJourneyFieldChange={setEachField}
                        onAllJourneyFieldsChange={setAllFields}
                    />
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="text-red-400 transition hover:text-red-500"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        {!_.isEqual(journey, modifiedJourney) && (
                            <button
                                type="submit"
                                className="bg-emerald-500 rounded transition hover:text-slate-50 text-slate-100 hover:bg-emerald-600 py-0.5 px-2"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>

                <JourneyFields
                    spaceBetween="SMALL"
                    colorTheme="GREEN"
                    journey={modifiedJourney}
                    onEachJourneyFieldChange={setEachField}
                    onAllJourneyFieldsChange={setAllFields}
                />
            </form>
        </article>
    );
}
