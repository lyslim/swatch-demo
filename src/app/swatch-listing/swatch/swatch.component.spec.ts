import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { last } from 'rxjs/operators';

import { swatchBlack, swatchBlue } from '../mock/swatch.mock';
import { SwatchComponent } from './swatch.component';
import { SelectionEvent, SelectionEventType } from './swatch.component.model';

describe('SwatchComponent', () => {
	let component: SwatchComponent;
	let fixture: ComponentFixture<SwatchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [ NO_ERRORS_SCHEMA ],
			declarations: [ SwatchComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SwatchComponent);
		component = fixture.componentInstance;
	});

	describe('when input swatch is active', () => {
		beforeEach(() => {
			component.swatch = swatchBlack;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should be at active state when input swatch is active', () => {
			expect(component.inactive).toBeFalsy();
		});

		describe('when being clicked in deselected state', () => {
			it('should be at selected state', () => {
				component.onClicked({} as MouseEvent);
				expect(component.selected).toBeTruthy();
			});

			it('should output event properly', () => {
				component.out.subscribe((eventData: SelectionEvent) => {
					expect(eventData.type).toEqual(SelectionEventType.SELECTED);
					expect(eventData.data).toEqual(component);
				});
				component.onClicked({} as MouseEvent);
			});
		});

		describe('when being clicked in selected state', () => {
			it('should be at deselected state', () => {
				component.out.pipe(last()).subscribe((eventData: SelectionEvent) => {
					expect(eventData.type).toEqual(SelectionEventType.DESELECTED);
					expect(eventData.data).toEqual(component);
				});

				component.selected = true;
				component.onClicked({} as MouseEvent);
				component.out.complete();
			});
		});
	});

	describe('when input swatch is inactive', () => {
		beforeEach(() => {
			component.swatch = swatchBlue;
			fixture.detectChanges();
		});

		it('should be at inactive state', () => {
			expect(component.inactive).toBeTruthy();
		});

		it('should be not selectable', () => {
			expect(component.selected).toBeFalsy();
		});
	});
});
