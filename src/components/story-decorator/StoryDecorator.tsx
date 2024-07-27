import { Decorator } from '@storybook/react';
import styles from './StoryDecorator.module.scss';

export const StoryDecorator: Decorator = function (Story) {
	return (
		<div className={styles.storybookContainer}>
			<Story />
		</div>
	);
};
