import { Swatch } from '../swatch-listing';

export interface VariantAttribute {
	key?: string;
	value?: string;
	swatch?: Swatch;
}

export interface VariantAttributeSelector {
	key: string;
	selectedValue?: string;
	swatches: Array<Swatch>;
}
