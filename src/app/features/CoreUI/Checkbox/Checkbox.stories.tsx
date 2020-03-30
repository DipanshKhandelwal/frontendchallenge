import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const normal = () => (
  <Checkbox label='Checkbox' onChange={action('changed')} />
);

export const disabled = () => (
  <Checkbox label='Checkbox' disabled />
);

export const active = () => (
  <Checkbox label='Checkbox' defaultValue />
);
