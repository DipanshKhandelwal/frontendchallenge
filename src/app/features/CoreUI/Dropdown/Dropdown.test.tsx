
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Dropdown from './Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';

const testLabel = 'Hello World';

describe('Dropdown', () => {
  afterEach(cleanup);

  it('displays label', () => {
    const { getByText } = render(<Dropdown label={testLabel} />);
    const element = getByText(testLabel);
    expect(element).toBeInTheDocument();
  });

  it('menu shouldn`t have opened class if isOpen is false', () => {
    const { baseElement } = render(
      <Dropdown label={testLabel}>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByClassName('menu')[0];
    expect(element).not.toHaveClass('opened');
  });

  it('menu shouldn`t have opened class if isOpen is true and disabled is true', () => {
    const { baseElement } = render(
      <Dropdown label={testLabel} isOpen disabled>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByClassName('menu')[0];
    expect(element).not.toHaveClass('opened');
  });

  it('menu should have opened class if isOpen is true', () => {
    const { baseElement } = render(
      <Dropdown label={testLabel} isOpen>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByClassName('menu')[0];
    expect(element).toHaveClass('opened');
  });

  it('label should have disabled class if disabled is true', () => {
    const { baseElement } = render(
      <Dropdown label={testLabel} disabled>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByClassName('label')[0];
    expect(element).toHaveClass('disabled');
  });

  it('label shouldn`t have disabled class if disabled is false', () => {
    const { baseElement } = render(
      <Dropdown label={testLabel}>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByClassName('label')[0];
    expect(element).not.toHaveClass('disabled');
  });

  it('should call onBlur and onFocus events', () => {
    const events = {
      onFocus: () => null,
      onBlur: () => null,
    };

    jest.spyOn(events, 'onBlur');
    jest.spyOn(events, 'onFocus');

    const { baseElement } = render(
      <Dropdown label={testLabel} onFocus={events.onFocus} onBlur={events.onBlur}>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>,
    );
    const element = baseElement.getElementsByTagName('input')[0];
    element.focus();
    element.blur();
    expect(events.onBlur).toHaveBeenCalled();
    expect(events.onFocus).toHaveBeenCalled();
  });
});
