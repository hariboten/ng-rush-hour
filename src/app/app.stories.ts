// アプリケーションのルートコンポーネント用ストーリー
import type { Meta, StoryObj } from '@storybook/angular';
import { App } from './app';

const meta: Meta<App> = {
  title: 'App',
  component: App,
};
export default meta;

export const Default: StoryObj<App> = {};
