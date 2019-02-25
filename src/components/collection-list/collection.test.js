
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Collection from './collection';
import { TOTAL_STAR_COUNT } from '../../constants';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        item: {
            id: "1",
            name: "abc",
            rating: 3
        },
        onStarClick: jest.fn(),
        randomItem: "1"
    }

    const enzymeWrapper = shallow(<Collection {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Collection', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('li').hasClass('active-link')).toBe(true);
        expect(enzymeWrapper.find('p').hasClass('collection-item')).toBe(true);
    });

    it('should pass correct props to  StarRatingComponent child component', () => {
        const { enzymeWrapper, props } = setup();
        const starRatingComponentProps = enzymeWrapper.find('StarRatingComponent').props();
        expect(starRatingComponentProps.name).toEqual(props.item.id);
        expect(starRatingComponentProps.starCount).toEqual(TOTAL_STAR_COUNT);
        expect(starRatingComponentProps.value).toEqual(props.item.rating);
        expect(starRatingComponentProps.onStarClick).toEqual(props.onStarClick);
    });

});
