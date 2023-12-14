import { type Journey } from "@/types";
import { useState } from "react";
import EditMode from "./EditMode";
import ViewMode from "./ViewMode";

interface CardProps {
    journey: Journey;
}

export type Mode = "EDIT" | "VIEW";

export default function Card({ journey }: CardProps) {
    const [mode, setMode] = useState<Mode>("VIEW");

    if (mode === "VIEW")
        return <ViewMode journey={journey} onModeChange={setMode} />;
    return <EditMode journey={journey} onModeChange={setMode} />;
}
