import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Link from './Link';

export default {
  title: 'Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const LinkStory = Template.bind({});
LinkStory.args = {
  url: "https://google.com",
  text: "please log in",
  theme: "light",
};

export const DefaultLinkStory = Template.bind({});
DefaultLinkStory.args = {
  url: "https://google.com",
  text: "please log in",
};