import { AfterViewInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChildren } from '@angular/core';

import { SwatchListingEvent } from './swatch-listing.component.model';
import { SwatchComponent } from './swatch/swatch.component';
import { SelectionEvent, SelectionEventType, Swatch, SwatchType } from './swatch/swatch.component.model';

/**
 * A swatch listing component displays a list of swatches
 *
 * Available inputs and outputs for applications:
 * - swatchList `Array<Swatch>` - a list of swatches to be displayed
 * - out `function` - a function to handle event when a swatch is being selected/deselected
 */
@Component({
	selector: 'caas-swatch-listing',
	templateUrl: './swatch-listing.component.html',
	styleUrls: ['./swatch-listing.component.scss'],
})
export class SwatchListingComponent implements AfterViewInit {

	@Input() swatchList: Array<Swatch>;

	@Input() overlayStyling = false;

	@Output() out = new EventEmitter<SwatchListingEvent>();

	@ViewChildren(SwatchComponent) swatchComponents: QueryList<SwatchComponent>;

	get showLabelsOnly(): boolean {
		let showLabelOnly = false;
		this.swatchList.forEach(swatch => {
			if (!swatch.url && !(swatch.codes && swatch.codes.length)) {
				showLabelOnly = true;
			}
		});
		return showLabelOnly;
	}

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngAfterViewInit(): void {
		// when a swatch is being selected:
		// 1. deselect other swatches in the list
		// 2. propogate the selected event and its swatch data
		//
		// when a swatch is being deselected:
		// 1. propogate the deselected event and its swatch data
		this.swatchComponents.forEach((swatchComponent: SwatchComponent) => {
			swatchComponent.out.subscribe((selectionEvent: SelectionEvent) => {
				if (selectionEvent.type === SelectionEventType.DESELECTED) {
					const deselectedEvent = new SwatchListingEvent({type: SelectionEventType.DESELECTED, swatch: selectionEvent.data.swatch});
					this.out.emit(deselectedEvent);
					return;
				}
				const deselectedSwatches = this.swatchComponents.filter(filteredSwatch => filteredSwatch.ID !== selectionEvent.data.ID);
				deselectedSwatches.forEach(deselectedSwatch => deselectedSwatch.selected = false);
				const selectedEvent = new SwatchListingEvent({type: SelectionEventType.SELECTED, swatch: selectionEvent.data.swatch});
				this.out.emit(selectedEvent);
			});
		});

		// get a default active and selected swatch
		const firstSelectedSwatch = (swatchComponent: SwatchComponent) => swatchComponent.swatch.isActive && swatchComponent.swatch.isSelected;
		const defaultSelectedComponent = this.swatchComponents.find(firstSelectedSwatch);
		if (defaultSelectedComponent) {
			defaultSelectedComponent.selected = true;
			this.changeDetectorRef.detectChanges();
		}
	}
}
