import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GridLayout from './GridLayout';
import { TypeArtists } from "../../utils/Types";

export default {
  title: 'GridLayout',
  component: GridLayout,
} as ComponentMeta<typeof GridLayout>;

const artists: TypeArtists[] = [{
  _id: "62220f319b8d0e56d1cea40d",
  name: "James Whistler",
  description: "dsfcsca",
  mainPainting: {
    artist: "62220f319b8d0e56d1cea40d",
    image: {
      _id: '62220f359b8d0e56d1cea507', 
      src: '/images/62220f329b8d0e56d1cea488/image.jpg', 
      webp: '/images/62220f329b8d0e56d1cea488/image.webp', 
      src2x: '/images/62220f329b8d0e56d1cea488/image2x.jpg', 
      webp2x: '/images/62220f329b8d0e56d1cea488/image2x.webp',
      original: "/images/62220f329b8d0e56d1cea488/original.jpg" },
    name: "The Last Supper",
    yearOfCreation: "1490",
    _id: "62220f329b8d0e56d1cea488",
  },
  avatar: {
    original: "/images/62220f319b8d0e56d1cea40d/original.jpg",
    src: "/images/62220f319b8d0e56d1cea40d/image.jpg",
    src2x: "/images/62220f319b8d0e56d1cea40d/image2x.jpg",
    webp: "/images/62220f319b8d0e56d1cea40d/image.webp",
    webp2x: "/images/62220f319b8d0e56d1cea40d/image2x.webp",
    _id: "62220f319b8d0e56d1cea413",
  },
  genres: [{
    name: "Renaissance",
    _id: "62220f319b8d0e56d1cea3fd",
  }],
  paintings: [ {
    _id: "62220f329b8d0e56d1cea487",
    name: "Annunciation",
    yearOfCreation: "1472",
    image: {
      _id: "62220f349b8d0e56d1cea4eb",
      src: "/images/62220f329b8d0e56d1cea487/image.jpg",
      webp: "/images/62220f329b8d0e56d1cea487/image.webp",
      src2x: "/images/62220f329b8d0e56d1cea487/image2x.jpg",
      webp2x: "/images/62220f329b8d0e56d1cea487/image2x.webp",
      original: "/images/62220f329b8d0e56d1cea487/original.jpg",
    },
    artist: "62220f319b8d0e56d1cea40d",
  }],
}];
const Template: ComponentStory<typeof GridLayout> = (args) => <GridLayout {...args} />;

export const GridLayoutStory = Template.bind({});
GridLayoutStory.args = {
  items: { type: 'artist', array: artists },
};