import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwatchComponent, SwatchListingComponent } from './swatch-listing/';
import { VariantSelectorComponent } from './variant-selector/variant-selector.component';

@NgModule({
	declarations: [
		AppComponent,
		SwatchComponent,
		SwatchListingComponent,
		VariantSelectorComponent,
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
