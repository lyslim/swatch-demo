import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { colorList } from './mock/swatch.mock';
import { SwatchListingComponent } from './swatch-listing.component';
import { SwatchListingEvent } from './swatch-listing.component.model';
import { SwatchComponent } from './swatch/swatch.component';
import { SelectionEventType } from './swatch/swatch.component.model';

describe('SwatchListingComponent', () => {
	let component: SwatchListingComponent;
	let fixture: ComponentFixture<SwatchListingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [ NO_ERRORS_SCHEMA ],
			declarations: [ SwatchComponent,
							SwatchListingComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SwatchListingComponent);
		component = fixture.componentInstance;
		component.swatchList = colorList;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have at least one inactive swatch', () => {
		const isActive = component.swatchComponents.some(swatchComponent => swatchComponent.inactive);
		expect(isActive).toBeTruthy();
	});

	it('should have only one default selected swatch', () => {
		const selected = component.swatchComponents.filter(swatchComponent => swatchComponent.selected);
		expect(selected.length).toEqual(1);
	});

	describe('when selected component being clicked', () => {
		it('should emit deselected event properly', () => {
			const selected = component.swatchComponents.filter(swatchComponent => swatchComponent.selected);

			component.out.subscribe((swatchListingEvent: SwatchListingEvent) => {
				expect(swatchListingEvent.type).toEqual(SelectionEventType.DESELECTED);
				expect(swatchListingEvent.swatch).toEqual(selected[0].swatch);
			});

			selected[0].onClicked({} as MouseEvent);
		});
	});
});
