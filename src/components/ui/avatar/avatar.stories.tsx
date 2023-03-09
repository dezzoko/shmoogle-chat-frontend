import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar, { AvatarVariants } from './';

export default {
  title: 'Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'A',
  size: '24px',
};

export const Squared = Template.bind({});
Squared.args = {
  label: 'A',
  size: '24px',
  variant: AvatarVariants.square,
};
