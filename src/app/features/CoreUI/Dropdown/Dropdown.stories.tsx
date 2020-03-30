import React, { useState, FC } from 'react';

import Dropdown from './Dropdown';
import '../../App/Root/Root.scss';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import DropdownItem from '../DropdownItem/DropdownItem';
import Checkbox from '../Checkbox/Checkbox';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const WithToggling: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <TwoColumnGrid>
      <Dropdown
        label='Checkbox with toggling'
        isOpen={isOpen}
        onFocus={() => setOpen(!isOpen)}
        onBlur={() => setOpen(false)}
      >
        <DropdownItem onClick={() => setOpen(false)}>
          <Checkbox label='Item 1' />
        </DropdownItem>
        <DropdownItem onClick={() => setOpen(false)}>
          <Checkbox label='Item 2' />
        </DropdownItem>
        <DropdownItem onClick={() => setOpen(false)}>
          <Checkbox label='Item 3' />
        </DropdownItem>
      </Dropdown>
    </TwoColumnGrid>
  );
};

export const WithErrorItem = () => (
  <TwoColumnGrid>
    <Dropdown label='Checkbox with error' isOpen>
      <DropdownItem>Default</DropdownItem>
      <DropdownItem error>Error</DropdownItem>
    </Dropdown>
  </TwoColumnGrid>
);

export const Disabled = () => (
  <TwoColumnGrid>
    <Dropdown label='Checkbox disabled' disabled>
      <DropdownItem> Item </DropdownItem>
    </Dropdown>
  </TwoColumnGrid>
);
