import myFavCollectionsService from "../service/my-fav-collections-service"
import { COLLECTION_LIST, TOGGLE_BTN_CLICKED, STAR_CLICK, API_ERROR } from "../constants";

export const getCollectionData = (item) => async (dispatch) => {
    try {
        const response = await myFavCollectionsService(item);
        dispatch({
            type: COLLECTION_LIST,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: API_ERROR
        });
    }
};

export const handleToggleBtnClick = () => {
    return {
        type: TOGGLE_BTN_CLICKED
    };
};

export const starClickAction = (value, id) => {
    return {
        type: STAR_CLICK,
        payload: { value, id }
    }
};
