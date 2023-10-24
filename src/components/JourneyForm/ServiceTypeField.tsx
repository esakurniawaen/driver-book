import { FullDayJourney, NonFullDayJourney } from "@/types";

type ServiceType =
    | FullDayJourney["serviceType"]
    | NonFullDayJourney["serviceType"];

interface ServiceTypeFieldProps {
    serviceType: ServiceType;
    onServiceTypeChange: (type: ServiceType) => void;
}

export default function ServiceTypeField({
    serviceType,
    onServiceTypeChange,
}: ServiceTypeFieldProps) {
    return (
        <div className="flex py-3 shadow-sm px-4 mb-4 bg-slate-100 justify-between items-center">
            <label className="text-lg text-slate-700 font-semibold">
                Service type
            </label>
            <select
                className="py-1.5 outline-none focus:border-sky-500 rounded-md px-2 border border-slate"
                value={serviceType}
                onChange={(evt) =>
                    onServiceTypeChange(evt.target.value as ServiceType)
                }
            >
                <option value="CHECK_IN">Check in</option>
                <option value="CHECK_OUT">Check out</option>
                <option value="TRANSFER">Transfer</option>
                <option value="FULL_DAY">Full day</option>
            </select>
        </div>
    );
}
