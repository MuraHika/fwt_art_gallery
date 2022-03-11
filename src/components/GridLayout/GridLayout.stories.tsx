import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GridLayout from './GridLayout';

export default {
  title: 'GridLayout',
  component: GridLayout,
} as ComponentMeta<typeof GridLayout>;
interface TypeArtists {
  id: string | number;
  name: string;
  years_live?: string;
  painting: string;
  created?: string;
  image?: string;
}
const artists: TypeArtists[] = [{
  id: 1,
  name: "James Whistler",
  painting: "Old Battersea Bridge",
}, {
  id: 2,
  name: "James Whistler",
  painting: "Arrangement in Grey and Black",
}, {
  id: 3,
  name: "James Whistler",
  painting: "Alice Butt",
}, {
  id: 4,
  name: "James Whistler",
  painting: "Whistler in his Studio",
}];
const Template: ComponentStory<typeof GridLayout> = (args) => <GridLayout {...args} />;

export const GridLayoutStory = Template.bind({});
GridLayoutStory.args = {
  items: { type: 'artist', array: artists },
};