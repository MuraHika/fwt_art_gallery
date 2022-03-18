import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Lock from "../../assets/Lock.svg";
import Search from "../../assets/Search.svg";
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputSearch = Template.bind({});
InputSearch.args = {
  text: "Name",
  isInputLabel: false,
  icon: <Search />,
  theme: "dark",
  isInputSearch: true,
};

export const InputModalForm = Template.bind({});
InputModalForm.args = {
  text: "Password",
  isInputLabel: false,
  icon: <Lock />,
  theme: "light",
  isInputSearch: false,
};

export const InputForm = Template.bind({});
InputForm.args = {
  text: "Name",
  isInputLabel: true,
  theme: "light",
  isInputSearch: false,
  isRequierd: true,
};