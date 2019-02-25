import { orderBy, random } from "lodash";

import {
    COLLECTION_LIST, STAR_CLICK, START_RANDOM_RATING, TOGGLE_BTN_CLICKED, STOP_RANDOM_RATING,
    API_ERROR, RANDOM_MIN_VAL, RANDOM_MAX_VAL
} from "../constants";

const initialState = {
    text: START_RANDOM_RATING
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case COLLECTION_LIST:
            return Object.assign({}, state,
                {
                    data: orderBy(payload, ['rating'], ['desc']),
                    isApiFail: false
                }
            );

        case API_ERROR:
            return Object.assign({}, state,
                {
                    data: undefined,
                    isApiFail: true,

                }
            );

        case STAR_CLICK:
            const { id, value } = payload;
            const updatedRepo = state.data.map((repo) => {
                if (Number(repo.id) === Number(id)) {
                    return Object.assign({}, repo, {
                        rating: value
                    })
                }
                return repo;
            });
            return Object.assign({}, state, {
                data: orderBy(updatedRepo, ['rating', 'name'], ['desc', 'asc'])
                },
                {
                    randomData: {
                        ...state.randomData,
                        randomItem: state.text === STOP_RANDOM_RATING ? id.toString() : undefined,
                        randomRating: state.text === STOP_RANDOM_RATING ? value : undefined
                    }
                });

        case TOGGLE_BTN_CLICKED:
            if (state.text === START_RANDOM_RATING) {
                return Object.assign({}, state, {
                    text: STOP_RANDOM_RATING,
                    randomData: {
                        ...state.randomData,
                        randomTime: random(RANDOM_MIN_VAL, RANDOM_MAX_VAL)
                    }
                })
            };
            return Object.assign({}, state, {
                text: START_RANDOM_RATING,
                randomData: {}
            });

        default:
            return state;

    }
}
