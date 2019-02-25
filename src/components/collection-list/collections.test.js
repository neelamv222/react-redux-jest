import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Collections from './collections'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    data: [{
      id: "1",
      name: "abc",
      rating: 3
    }],
    onStarClick: jest.fn(),
    randomItem: "1"
  }

  const enzymeWrapper = shallow(<Collections {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Collections', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper} = setup();
    expect(enzymeWrapper.find('ul').hasClass('list-group')).toBe(true);
  });

  it('should pass correct props to  Collection child component', () => {
    const { enzymeWrapper, props } = setup();
    const collectionLiProps = enzymeWrapper.find('Collection').props();
    expect(collectionLiProps.item).toEqual(props.data[0]);
    expect(collectionLiProps.randomItem).toEqual(props.randomItem);
    expect(collectionLiProps.onStarClick).toEqual(props.onStarClick);
  });

});