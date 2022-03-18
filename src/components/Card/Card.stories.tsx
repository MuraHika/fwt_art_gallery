import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './Card';
import IMG from "../../assets/no_image.webp";

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const OnlyRequiredFields = Template.bind({});
OnlyRequiredFields.args = {
  type: 'artist',
  obj: {
    author_name: "Salvador Dalí", 
    picture_name: "The Persistence of Memory",
  },
};

export const FullFilledFields = Template.bind({});
FullFilledFields.args = {
  type: 'artist',
  obj: {
    src_img: "/images/62220f329b8d0e56d1cea487/image2x.webp",
    author_name: "Salvador Dalí", 
    years_live: "(1904-1989)",
    picture_name: "The Persistence of Memory",
    date_created: "1931",
  },
};

export const OneField = Template.bind({});
OneField.args = {
  type: 'artist',
  obj: {
    src_img: "/images/62220f329b8d0e56d1cea487/image2x.webp",
    author_name: "Salvador Dalí", 
    years_live: "(1904-1989)",
    picture_name: "The Persistence of Memory",
  },
};