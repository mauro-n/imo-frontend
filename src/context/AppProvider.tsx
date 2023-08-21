import { createContext, useState } from "react";

const appInitialState: App.app = {
    searchResults: []
}

export const AppContext = createContext<App.AppContext>({
    app: { searchResults: [] },
    setApp: undefined
});

export const AppProvider = ({ children }: any) => {
    const [app, setApp] = useState<App.app>(appInitialState);
    return (
        <AppContext.Provider value={{ app, setApp }}>
            {children}
        </AppContext.Provider>
    )
}