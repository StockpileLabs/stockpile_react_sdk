import * as React from 'react';
import { createContext, useContext, useMemo, ReactNode } from 'react';
//TODO
// import { SDK } from 'stockpile_sdk';

interface StockpileContextValue {
    // sdk : SDK;
}

const StockpileContext = createContext<StockpileContextValue | null>(null);

interface StockpileProviderProps {
    children: ReactNode;
    //sdk: SDK;
}

const StockpileProvider: React.FC<StockpileProviderProps> = ({children, sdk}) => {
    return <StockpileContext.Provider value={{ sdk }}>{children}</StockpileContext.Provider>;
}

const useStockpileContext = (): StockpileContextValue => {
    const context = useContext(StockpileContext);
    if (!context) {
        throw new Error('useStockpileContext must be used within a StockpileProvider');
    }

    return context;
}

export { StockpileProvider, useStockpileContext};