import { createContext, useState } from "react";

export const SettingsTabContext = createContext<any>("");

interface Props {
    children: any;
}

export default function SettingsContextProvider({ children }: Props) {
    // Must match the first element in the tabs array in SettingsComponent.tsx
    const [currentTab, setCurrentTab] = useState("Academics");

    return (
        <SettingsTabContext.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </SettingsTabContext.Provider>
    );
}
