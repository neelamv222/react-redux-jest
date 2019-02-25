import { combineReducers } from "redux";

import MyFavCollectionReducer from "./my-fav-collections-reducer";

const allReducers = combineReducers({
    collections: MyFavCollectionReducer
});

export default allReducers;
