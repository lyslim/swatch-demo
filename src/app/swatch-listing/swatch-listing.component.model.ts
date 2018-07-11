import { SelectionEventType, Swatch } from './swatch/swatch.component.model';

export class SwatchListingEvent {
	type: SelectionEventType;
	swatch: Swatch;

	constructor({
		type = SelectionEventType.SELECTED,
		swatch,
	}: SwatchListingEvent) {
		this.type = type;
		this.swatch = swatch;
	}
}
