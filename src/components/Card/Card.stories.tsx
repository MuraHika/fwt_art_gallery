import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './Card';
import IMG from '../../assets/dali_picture.png';

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const OnlyRequiredFields = Template.bind({});
OnlyRequiredFields.args = {
  author_name: 'Salvador Dalí',
  picture_name: 'The Persistence of Memory',
  onClick: () => console.log('done'),
};

export const FullFilledFields = Template.bind({});
FullFilledFields.args = {
  src_img: IMG,
  author_name: 'Salvador Dalí',
  years_live: '(1904-1989)',
  picture_name: 'The Persistence of Memory',
  date_created: '1931',
  onClick: () => console.log('done'),
};

export const OneField = Template.bind({});
OneField.args = {
  src_img: IMG,
  author_name: 'Salvador Dalí',
  years_live: '(1904-1989)',
  picture_name: 'The Persistence of Memory',
  onClick: () => console.log('done'),
};
