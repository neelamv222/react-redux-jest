
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RandomTimerGenerator from './random-timer-generator';
import { STOP_RANDOM_RATING, START_RANDOM_RATING } from '../constants';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        randomTime: 4,
        randomItemName: {
            name: 'abc'
        },
        text: STOP_RANDOM_RATING,
        randomRating: 3,
        generateTimer: jest.fn()
    }

    const enzymeWrapper = shallow(<RandomTimerGenerator {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('RandomtTimeGenerator', () => {
    it('should render self and subcomponents with text as "Stop Random Rating"', () => {
        const { enzymeWrapper, props } = setup();
        expect(enzymeWrapper.find('p').first().text()).toBe(` The random time interval is ${props.randomTime}`);
        expect(enzymeWrapper.find('p').last().text()).toBe(`The random rating ${props.randomRating} is assigned to the random item ${props.randomItemName.name}`);
    });

    it('should render self and subcomponents with text as "Start Random Rating"', () => {
        const enzymeWrapper = shallow(<RandomTimerGenerator {...setup().props} text={START_RANDOM_RATING} />);
        expect(enzymeWrapper.find('p').exists()).toBeFalsy();
        });

    it('should pass correct props to ReactInterval child component', () => {
        const { enzymeWrapper, props } = setup();
        const starRatingComponentProps = enzymeWrapper.find('ReactInterval').props();
        expect(starRatingComponentProps.timeout).toEqual(props.randomTime * 1000);
        expect(starRatingComponentProps.enabled).toEqual(props.text === STOP_RANDOM_RATING);
        expect(starRatingComponentProps.callback).toEqual(props.generateTimer);
    });

});
