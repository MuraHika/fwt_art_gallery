import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GridLayout from './GridLayout';

export default {
  title: 'GridLayout',
  component: GridLayout,
} as ComponentMeta<typeof GridLayout>;
const artists = [
  {
    id: 1,
    author: 'James Whistler',
    painting: 'Old Battersea Bridge',
  },
  {
    id: 2,
    author: 'James Whistler',
    painting: 'Arrangement in Grey and Black',
  },
  {
    id: 3,
    author: 'James Whistler',
    painting: 'Alice Butt',
  },
  {
    id: 4,
    author: 'James Whistler',
    painting: 'Whistler in his Studio',
  },
];
const Template: ComponentStory<typeof GridLayout> = args => (
  <GridLayout {...args} />
);

export const GridLayoutStory = Template.bind({});
GridLayoutStory.args = {
  items: artists,
};
