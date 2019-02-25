import React from 'react';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyFavCollections from './my-fav-collections';
import { START_RANDOM_RATING } from "../constants";
import { mapStateToProps, mapDispatchToProps } from './my-fav-collections';


Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const mockStore = configureStore([thunk]);
    const stateData = {
        collections:
        {
            text: START_RANDOM_RATING,
            randomData: {
                randomItem: "1",
                randomTime: 2,
                randomRating: 3
            },
            isApiFail: false,
            data: [{
                id: "1",
                name: "abc",
                rating: 3
            }]
        }
    }
    const props = {
        getCollectionData: jest.fn(),
        data: [{
            id: "1",
            name: "abc",
            rating: 3
        }],
        text: START_RANDOM_RATING,
        randomData: {
            randomItem: "1",
            randomTime: 2,
            randomRating: 3
        },
        isApiFail: false,
        location: {
            pathname: "/"
        },
        handleToggleBtnClick: jest.fn(),
        starClickAction: jest.fn()

    }
    const store = mockStore(
        {
            ...stateData
        }
    );
    const enzymeWrapper = mount(
        <Provider store={store}>
            <MyFavCollections {...props} />
        </Provider>
    );

    return {
        props,
        stateData,
        enzymeWrapper
    }
}

describe('Collection', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.length).toEqual(1);
    });

    it('should display the value from initial state in mapStatetoProps', () => {
        const initialState = {
            ...setup().stateData
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).data).toEqual([{
            id: "1",
            name: "abc",
            rating: 3
        }]);
        expect(mapStateToProps(initialState).text).toEqual(START_RANDOM_RATING);
        expect(mapStateToProps(initialState).randomData).toEqual({
            randomItem: "1",
            randomTime: 2,
            randomRating: 3
        });
        expect(mapStateToProps(initialState).isApiFail).toEqual(false);
    });

    it('should call the function in mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getCollectionData();
        expect(dispatch.mock.calls.length).toBe(1);
        mapDispatchToProps(dispatch).handleToggleBtnClick();
        expect(dispatch.mock.calls[1][0]).toEqual({ type: 'TOGGLE_BTN_CLICKED' });
    });
    //TODO: Likewise need to write the other test cases for this component
});