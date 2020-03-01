import React from 'react';
import { shallow } from 'enzyme';
import { AddPage } from '../../../src/features/home/AddPage';

describe('home/AddPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddPage {...props} />
    );

    expect(
      renderedComponent.find('.home-add-page').length
    ).toBe(1);
  });
});
