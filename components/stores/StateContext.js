import { createContext, useContext } from "react";
import { createStateStore } from "./stateStore";
import { useLocalObservable } from "mobx-react";

const StateContext = createContext(null);

export const StateProvider = ({children}) => {
    const store = useLocalObservable(createStateStore);

    return (
        <StateContext.Provider value={store}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateStore = () => useContext(StateContext);