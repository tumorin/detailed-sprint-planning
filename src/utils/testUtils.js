import {createStore} from "redux";
import reducer from "../redux/root-reducer";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";

export const renderWithRedux = (
    component,
    {initialState, store = createStore(reducer,initialState) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    }
}