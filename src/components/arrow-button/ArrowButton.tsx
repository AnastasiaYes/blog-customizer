import { UIEvent } from 'react';

import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (e: UIEvent) => void;

type props = {
	onClick?: OnClick;
	isOpen?: boolean;
};

export const ArrowButton = (props: props) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props.onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={[
				styles.container,
				props.isOpen ? styles.container_open : '',
			].join(' ')}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={[styles.arrow, props.isOpen ? styles.arrow_open : ''].join(
					' '
				)}
			/>
		</div>
	);
};
