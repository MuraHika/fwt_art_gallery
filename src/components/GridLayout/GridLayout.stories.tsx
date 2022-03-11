import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GridLayout from './GridLayout';

export default {
  title: 'GridLayout',
  component: GridLayout,
} as ComponentMeta<typeof GridLayout>;
interface TypeArtists {
  id: string;
  paintings: string[];
  genres: string[];
  name: string;
  description:string;
  yearsOfLife?: string;
  avatar: string;
  mainPainting: string;
}
const artists: TypeArtists[] = [{
  id: "1",
  name: "James Whistler",
  description: "dsfcsca",
  mainPainting: "",
  avatar: "",
  genres: [""],
  paintings: ["Old Battersea Bridge"],
}, {
  id: "2",
  name: "James Whistler",
  description: "dsfcsca",
  mainPainting: "",
  avatar: "",
  genres: [""],
  paintings: ["Arrangement in Grey and Black"],
}, {
  id: "3",
  name: "James Whistler",
  description: "dsfcsca",
  mainPainting: "",
  avatar: "",
  genres: [""],
  paintings: ["Alice Butt"],
}, {
  id: "4",
  name: "James Whistler",
  description: "dsfcsca",
  mainPainting: "",
  avatar: "",
  genres: [""],
  paintings: ["Whistler in his Studio"],
}];
const Template: ComponentStory<typeof GridLayout> = (args) => <GridLayout {...args} />;

export const GridLayoutStory = Template.bind({});
GridLayoutStory.args = {
  items: { type: 'artist', array: artists },
};