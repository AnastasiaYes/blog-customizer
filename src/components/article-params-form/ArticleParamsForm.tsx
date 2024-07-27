import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	updateArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	updateArticleState,
}: ArticleParamsFormProps) => {
	const asideContainerRef = useRef<HTMLDivElement>(null);
	const navContainerRef = useRef<HTMLDivElement>(null);
	const [asideIsOpen, setAsideIsOpen] = useState<boolean>(false);

	const [fontOptions] = useState<OptionType[]>(fontFamilyOptions);
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		articleState.fontFamilyOption
	);

	const [fontSizeChoiceOptions] = useState<OptionType[]>(fontSizeOptions);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		articleState.fontSizeOption
	);

	const [fontColorOptions] = useState<OptionType[]>(fontColors);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		articleState.fontColor
	);

	const [backgroundColorOptions] = useState<OptionType[]>(backgroundColors);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(articleState.backgroundColor);

	const [containerWidthOptions] = useState<OptionType[]>(contentWidthArr);
	const [selectedContainerWidth, setSelectedContainerWidth] =
		useState<OptionType>(articleState.contentWidth);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, { capture: true });

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [asideIsOpen]);

	const onClick = () => {
		const refIsNotReady = asideContainerRef.current === null;
		if (refIsNotReady) {
			return;
		}

		setAsideIsOpen((prev) => !prev);
		asideContainerRef.current.classList.toggle(styles.container_open);
	};

	const handleClickOutside = (event: MouseEvent) => {
		const refsAreNotReady =
			asideContainerRef.current === null || navContainerRef.current === null;
		if (refsAreNotReady) {
			return;
		}

		if (!navContainerRef.current.contains(event.target as Node)) {
			setAsideIsOpen(false);
			asideContainerRef.current.classList.remove(styles.container_open);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		updateArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContainerWidth,
		});
		closeForm();
	};

	const closeForm = () => {
		const refIsNotReady = asideContainerRef.current === null;
		if (refIsNotReady) {
			return;
		}

		setAsideIsOpen(false);
		asideContainerRef.current.classList.remove(styles.container_open);
	};

	const onReset = () => {
		updateArticleState(defaultArticleState);
	};

	useEffect(() => {
		setSelectedFont(articleState.fontFamilyOption);
		setSelectedFontSize(articleState.fontSizeOption);
		setSelectedFontColor(articleState.fontColor);
		setSelectedBackgroundColor(articleState.backgroundColor);
		setSelectedContainerWidth(articleState.contentWidth);
	}, [articleState]);

	return (
		<nav ref={navContainerRef}>
			<ArrowButton onClick={onClick} isOpen={asideIsOpen} />
			<aside ref={asideContainerRef} className={styles.container}>
				<form className={styles.form} onReset={onReset} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<div className={styles.containerInput}>
						<Select
							selected={selectedFont}
							title={'ширфт'}
							onChange={(el) => setSelectedFont(el)}
							options={fontOptions}
						/>
					</div>
					<div className={styles.containerInput}>
						<RadioGroup
							options={fontSizeChoiceOptions}
							name={'Размер шрифта'}
							title={'Размер'}
							selected={selectedFontSize}
							onChange={(el) => setSelectedFontSize(el)}
						/>
					</div>

					<div className={styles.containerInput}>
						<Select
							selected={selectedFontColor}
							title={'Цвет шрифта'}
							onChange={(el) => setSelectedFontColor(el)}
							options={fontColorOptions}
						/>
					</div>

					<div className={styles.containerInput}>
						<Separator />
					</div>

					<div className={styles.containerInput}>
						<Select
							selected={selectedBackgroundColor}
							title={'Цвет фона'}
							onChange={(el) => setSelectedBackgroundColor(el)}
							options={backgroundColorOptions}
						/>
					</div>

					<div className={styles.containerInput}>
						<Select
							selected={selectedContainerWidth}
							title={'Ширина контента'}
							onChange={(el) => setSelectedContainerWidth(el)}
							options={containerWidthOptions}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</nav>
	);
};
