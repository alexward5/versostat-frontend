import React, { createContext, useContext } from "react";
import type { GetPlayerDataQuery } from "../__generated__/graphql";

const DataContext = createContext<GetPlayerDataQuery | undefined>(undefined);

export const DataProvider: React.FC<{
    value: GetPlayerDataQuery;
    children: React.ReactNode;
}> = ({ value, children }) => (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
);

export const useData = (): GetPlayerDataQuery => {
    const context = useContext(DataContext);

    if (!context) throw new Error("useData must be used within a DataProvider");

    return context;
};
