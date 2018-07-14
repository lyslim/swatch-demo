import { Swatch } from '../swatch/swatch.component.model';

export const swatchRed = new Swatch({label: 'Red', codes: ['#ea0707'], isActive: true});

export const swatchBlue = new Swatch({
	label: 'Blue',
	url: 'http://jonvilma.com/images/blue-2.jpg',
	codes: ['#40def9'],
	isActive: false,
	isSelected: true,
});

export const swatchYellow = new Swatch({label: 'Yellow', codes: ['#eef442'], isActive: true, isSelected: true});

export const swatchGreen = new Swatch({
	label: 'Grass Green',
	url: 'https://thumbs.dreamstime.com/t/green-poker-table-background-textured-61373826.jpg',
	codes: ['#6ef442'],
	isActive: true,
});

export const swatchGray = new Swatch({label: 'Gray', codes: ['#c1c4c0'], isActive: true, isSelected: true});

export const swatchBlack = new Swatch({label: 'Black', codes: ['#2c2d2c'], isActive: false});

export const colorList = [swatchRed, swatchBlue, swatchYellow, swatchGreen, swatchGray, swatchBlack];

export const lengthList = [] as Array<Swatch>;

for (let i = 30; i < 45; i++) {
	lengthList.push(new Swatch({
		label: `${i}`,
		isActive: Boolean(Math.floor(Math.random() * 2)),
		isSelected: Boolean(Math.floor(Math.random() * 2)),
	}));
}

export const sizeList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
	.map(size => new Swatch({
		label: size,
		isActive: Boolean(Math.floor(Math.random() * 2)),
		isSelected: Boolean(Math.floor(Math.random() * 2)),
	}));
