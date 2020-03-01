import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/home/Search';

describe('home/Search', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Search {...props} />
    );

    expect(
      renderedComponent.find('.home-search').length
    ).toBe(1);
  });
});
