import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Swatch, SwatchListingEvent, SelectionEventType } from '../swatch-listing';
import { VariantAttribute, VariantAttributeSelector } from './variant-selector.model';
import { products, product001, product002 } from '../product/products.mock';

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

	variantAttributeSelectors: Array<VariantAttributeSelector> = [];

	defaultProduct = product001;

	isEdit = false;

	isError: boolean;

	buttonText = 'Edit';

	private availableVariants;

	constructor(private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		const productVariants = this.getProductVariants();

		// get available product variants
		this.assembleAvailableVariants(productVariants);

		// set initial variant attribute selector
		this.setVASelector(this.defaultProduct);
	}

	onSwatchClicked(selectionEvent: SwatchListingEvent, selectedAttributeKey: string): void {
		const selectedAttribute = this.variantAttributeSelectors.find(attribute => attribute.key === selectedAttributeKey);
		selectedAttribute.selectedValue = selectionEvent.type === SelectionEventType.SELECTED ? selectionEvent.swatch.label : '';
		this.changeDetectorRef.detectChanges();

		if (this.isEdit) {
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
		}
	}

	onButtonClicked(): void {

		this.isEdit = !this.isEdit;

		if (this.isEdit) {
			this.setVASelectors(this.getProductVariants());
			this.buttonText = 'Save';
		} else {
			if (this.variantAttributeSelectors.every(selector => !!selector.selectedValue)) {
				const selectedProductVA = this.variantAttributeSelectors.map(selector => ({key: selector.key, value: selector.selectedValue}));
				const productId = this.getAvailableProductId(selectedProductVA);
				const selectedProduct = products.find(product => product.id === productId);
				this.setVASelector(selectedProduct);
				this.buttonText = 'Edit';
			} else {
				this.isError = true;
				this.isEdit = true;
				return;
			}
		}
		this.isError = false;

	}

	private getProductVariants() {
		return products;
	}

	private setVASelector(product) {
		// color burnt greens waist 29 length 30
		this.variantAttributeSelectors.length = 0;

		const wrapVariantAttribute = (variantAttribute) => {
			const defaultSwatch = this.wrappedAttributeIntoSwatch(variantAttribute, true, true);
			return {key: variantAttribute.key, swatches: [defaultSwatch]};
		};
		this.variantAttributeSelectors = product.variantAttributes.map(wrapVariantAttribute);
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

	private setVASelectors(products): void {
		const prevVASelectors = JSON.parse(JSON.stringify(this.variantAttributeSelectors));
		this.variantAttributeSelectors.length = 0;
		products.forEach(product => {
			if (product.variantAttributes) {
				product.variantAttributes.forEach(variantAttribute => {
					// wrap variant attribute into swatch(including determine whether it's in stock and selected)
					const wrappedSwatch = this.wrappedAttributeIntoSwatch(variantAttribute,
						this.isVariantAvailable([variantAttribute]), this.isSelected(prevVASelectors, variantAttribute));

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

	private isSelected(attributes: Array<VariantAttributeSelector>, item: VariantAttribute): boolean {
		return attributes.some(attribute => attribute.key === item.key && attribute.swatches[0].label === item.value);
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
