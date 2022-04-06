import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<
  typeof Button
> = args => <Button {...args} />;

export const ButtonStory = Template.bind({});
ButtonStory.args = {
  text: 'LOG IN',
  size: 'large',
  theme: 'dark',
  isPrimary: true,
};

export const DefaultButtonStory = Template.bind(
  {},
);
DefaultButtonStory.args = {
  text: 'LOG IN',
};
