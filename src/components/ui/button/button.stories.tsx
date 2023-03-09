import { ComponentMeta, ComponentStory } from '@storybook/react';
import ShareFileSvg from 'components/svg/share-file-svg';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;

export const Default = Template.bind({});
Default.args = {
  name: 'I am button',
  outlined: true,
  children: <ShareFileSvg />,
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  name: 'I am button',
  outlined: true,
};

export const ListItem = Template.bind({});
ListItem.args = {
  name: 'Do this',
  children: <ShareFileSvg />,
  textJustifyContentProperty: 'flex-start',
  gap: '20px',
};
