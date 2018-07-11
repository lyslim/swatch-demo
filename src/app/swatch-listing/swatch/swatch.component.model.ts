
/**
 *  base contract for a swatch
 *  isActive - indicates active status of the swatch
 *  isSelected - indicates selection status of the swatch
 *  url, codes, label - member inherits from product swatch: url, codes, label
 */
export class Swatch {

	label: string;
	codes: Array<string>;
	url: string;
	isActive: boolean;
	isSelected: boolean;

	constructor({
		label = '',
		codes = [],
		url = '',
		isActive = true,
		isSelected = false,
	}: Partial<Swatch>) {
		this.label = label;
		this.codes = codes;
		this.url = url;
		this.isActive = isActive;
		this.isSelected = isSelected;
	}
}

export enum SwatchType {
	IMG = 'IMG',
	CODE = 'CODE',
	TEXT = 'TEXT',
}

export class SelectionEvent {
	type: SelectionEventType;
	data: any;

	constructor({
		type = SelectionEventType.SELECTED,
		data,
	}: SelectionEvent) {
		this.type = type;
		this.data = data;
	}
}

export enum SelectionEventType {
	SELECTED = 'SELECTED',
	DESELECTED = 'DESELECTED',
}
