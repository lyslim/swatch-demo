import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Swatch, SwatchListingEvent, SelectionEventType } from '../swatch-listing';
import { VariantAttribute, VariantAttributeSelector } from './variant-selector.model';
import { products, product001 } from '../product/products.mock';

/**
 *  This component servies the following purposes:
 *  1. tranform a list of (available) product variants into several lists of product variant attributes (variant attribute selectors)
 *
 * 	variant attribute list 1      variant attribute list 2
 * 		size M      				color yellow   			----> product variant 1
 *   	size L      				color red      			----> product variant 2
 *    	size S      				color red     			----> product variant 3
 *      size S            			color black   			----> product variant 4
 *
 * 2. Able to determine a (available) product variant from these lists of variant attributes (variant attribute selectors)
 */

@Component({
	selector: 'app-variant-selector',
	templateUrl: './variant-selector.component.html',
	styleUrls: ['./variant-selector.component.css']
})
export class VariantSelectorComponent implements OnInit {

	availableVariants;

	variantAttributeSelectors: Array<VariantAttributeSelector> = [];

	isEdit = false;

	buttonText: string =  this.isEdit ? 'Save' : 'Edit';

	constructor(private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		const productVariants = this.getProductVariants();

		// get available product variants
		this.assembleAvailableVariants(productVariants);

		// get variant attribute selectors(several lists of variant attributes)
		// this.assembleVASelectors(productVariants);
		this.initVASelectors();
	}

	onSwatchClicked(selectionEvent: SwatchListingEvent, selectedAttributeKey: string): void {

		const selectedAttribute = this.variantAttributeSelectors.find(attribute => attribute.key === selectedAttributeKey);
		selectedAttribute.selectedValue = selectionEvent.type === SelectionEventType.SELECTED ? selectionEvent.swatch.label : '';
		this.changeDetectorRef.detectChanges();

		// if (this.isEdit) {
			const selectedAttributes =
				this.variantAttributeSelectors.filter(attribute => attribute.selectedValue)
					.map(attribute => ({ key: attribute.key, value: attribute.selectedValue }));

			const filteredAttributeList = selectionEvent.type === SelectionEventType.SELECTED
				? this.variantAttributeSelectors.filter(attribute => attribute.key !== selectedAttributeKey)
				: this.variantAttributeSelectors;

			filteredAttributeList.forEach(attribute => {
				attribute.swatches.forEach(swatch => {
					let checkAttributes = [{ key: attribute.key, value: swatch.label }];

					const filteredSelectedAttributes =
						selectedAttributes.filter(selectedAttr => selectedAttr.key !== checkAttributes[0].key);

					checkAttributes = checkAttributes.concat(filteredSelectedAttributes);
					swatch.isActive = this.isVariantAvailable(checkAttributes);
				});
			});
		// }
	}

	toggleMode(): void {
		
		this.isEdit = !this.isEdit;
		
		if (this.isEdit) {
			this.assembleVASelectors(this.getProductVariants());
		} else {
			this.initVASelectors();
		}
		
	}

	private getProductVariants() {
		return products;
	}

	private initVASelectors() {
		// color burnt greens waist 29 length 30

		const initColorSelector = {
			key: 'color',
			selectedValue: 'burnt greens',
			swatches: [
				new Swatch({label: 'burnt green', isActive: true, isSelected: true}),
			]
		}

		const initWaistSelector = {
			key: 'waist',
			selectedValue: '29',
			swatches: [
				new Swatch({label: '29', isActive: true, isSelected: true}),
			]
		}

		const initLengthSelector = {
			key: 'length',
			selectedValue: '30',
			swatches: [
				new Swatch({label: '30', isActive: true, isSelected: true}),
			]
		}

		this.variantAttributeSelectors = [initColorSelector, initWaistSelector, initLengthSelector];

	}

	private assembleAvailableVariants(products): void {
		const availableProducts = products.filter(product => product.amount > 0);
		this.availableVariants = availableProducts.map(product => {
			const availableProduct = {productId: product.id};
			if (product.variantAttributes) {
				product.variantAttributes.forEach(variantAttribute => {
					availableProduct[variantAttribute.key] =
						variantAttribute.swatch ? variantAttribute.swatch.label : variantAttribute.value;
				});
			}
			return availableProduct;
		});
	}

	private assembleVASelectors(products): void {
		products.forEach(product => {
			if (product.variantAttributes) {
				product.variantAttributes.forEach(variantAttribute => {
					// wrap variant attribute into swatch(including determine whether it's in stock and selected)
					const wrappedSwatch = this.wrappedAttributeIntoSwatch(variantAttribute,
						this.isVariantAvailable([variantAttribute]), false);
					// this.isSelected(this.getDefaultAttributeList(), variantAttribute)

					const existedAttribute = this.variantAttributeSelectors.find(attributeInList => attributeInList.key === variantAttribute.key);

					if (existedAttribute) {
						const isNewSwatch = (sourceSwatch: Swatch) => !this.isSameSwatch(sourceSwatch, wrappedSwatch);

						if (existedAttribute.swatches.every(isNewSwatch)) {
							existedAttribute.swatches.push(wrappedSwatch);
						}
					} else {
						this.variantAttributeSelectors.push({ key: variantAttribute.key, swatches: [wrappedSwatch] });
					}
				});
			}
		});
	}

	private wrappedAttributeIntoSwatch(variantAttribute: VariantAttribute, isActive?: boolean, isSelected?: boolean): Swatch {
		return variantAttribute.swatch ?
			new Swatch({ ...variantAttribute.swatch, isActive: isActive, isSelected: isSelected }) :
			new Swatch({ label: variantAttribute.value, isActive: isActive, isSelected: isSelected });
	}

	private isVariantAvailable(variantAttributes: Array<VariantAttribute>): boolean {
		const productId = this.getAvailableProductId(variantAttributes);
		return !!productId;
	}

	private getAvailableProductId(variantAttributes: Array<VariantAttribute>): string {
		const queryProduct = this.availableVariants.find(product => {
			const isSameAttributeToProduct = (attribute: VariantAttribute) => {
				return attribute.swatch ? product[attribute.key] === attribute.swatch.label : product[attribute.key] === attribute.value;
			};
			return variantAttributes.every(isSameAttributeToProduct);
		});
		return queryProduct ? queryProduct.productId : '';
	}

	private isSameSwatch(sourceSwatch: Swatch, targetSwatch: Swatch): boolean {
		if (Object.keys(sourceSwatch).length !== Object.keys(targetSwatch).length) {
			return false;
		}
		return Object.keys(sourceSwatch).every(key => {
			// currently only array or string are supported in swatch
			if (sourceSwatch[key] && sourceSwatch[key].constructor === Array) {
				return sourceSwatch[key][0] === targetSwatch[key][0];
			}
			return sourceSwatch[key] === targetSwatch[key];
		});
	}
}
