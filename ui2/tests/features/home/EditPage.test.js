import React from 'react';
import { shallow } from 'enzyme';
import { EditPage } from '../../../src/features/home/EditPage';

describe('home/EditPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditPage {...props} />
    );

    expect(
      renderedComponent.find('.home-edit-page').length
    ).toBe(1);
  });
});
