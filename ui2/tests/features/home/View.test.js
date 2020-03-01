import React from 'react';
import { shallow } from 'enzyme';
import { View } from '../../../src/features/home/View';

describe('home/View', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <View {...props} />
    );

    expect(
      renderedComponent.find('.home-view').length
    ).toBe(1);
  });
});
