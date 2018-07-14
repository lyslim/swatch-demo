import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	OnInit,
	Output,
} from '@angular/core';

import { SelectionEvent, SelectionEventType, Swatch, SwatchType } from './swatch.component.model';

/**
 * A swatch component maintains
 * - a private generated ID, which indicates uniqueness of a swatch component
 * - a active state, which indicates whether a swatch is available, if inactive, a swatch cannot be selected
 * - a seletive state, which indicates whether a swatch is being selected
 *
 * Application needs to supply:
 * a swatch object as input data source, see Swatch from ./swatch.component.model for detail
 * a handler(optional) to catch emitted selected/deselected event(which includes impacted swatch component)
 */
@Component({
	selector: 'caas-swatch',
	templateUrl: './swatch.component.html',
	styleUrls: ['./swatch.component.scss'],
})
export class SwatchComponent implements OnInit {

	private static GENERATED_ID = 0;

	@Input() swatch: Swatch;

	@Input() showLabelOnly = false;

	@HostBinding('class')
	type: SwatchType;

	@HostBinding('class.overlay-styling')
	@Input() overlayStyling = false;

	@Output() out = new EventEmitter<SelectionEvent>();

	backgroundImageProps = {};

	private isSelected: boolean;
	private id: string;

	constructor(private changeDetectorRef: ChangeDetectorRef) {
		this.id = `${SwatchComponent.GENERATED_ID++}`;
	}

	get ID(): string {
		return this.id;
	}

	@HostBinding('class.inactive')
	get inactive(): boolean {
		return !this.swatch.isActive;
	}

	@HostBinding('class.selected')
	get selected(): boolean {
		return !this.inactive && this.isSelected;
	}

	set selected(isSelected: boolean) {

		if (!this.inactive && this.isSelected && !isSelected) {
			this.out.emit(new SelectionEvent({type: SelectionEventType.DESELECTED, data: this}));
		}

		this.isSelected = isSelected;

		if (this.isSelected) {
			this.out.emit(new SelectionEvent({type: SelectionEventType.SELECTED, data: this}));
		}
	}

	ngOnInit(): void {
		if (this.swatch.url && !this.showLabelOnly) {
			this.type = SwatchType.IMG;
			this.setBackgroundImageProps();
		} else if (this.swatch.codes && this.swatch.codes.length && !this.showLabelOnly) {
			this.type = SwatchType.CODE;
		} else {
			this.type = SwatchType.TEXT;
		}
	}

	onClicked(event: MouseEvent): void {
		this.selected = !this.selected;
	}

	private setBackgroundImageProps(): void {
		this.backgroundImageProps['background-image'] = `url('${this.swatch.url}')`;
		this.backgroundImageProps['background-size'] = '100% 100%';
		this.backgroundImageProps['background-position'] = 'center center';
	}

}
