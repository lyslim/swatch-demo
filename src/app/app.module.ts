import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwatchComponent, SwatchListingComponent } from './swatch-listing/';

@NgModule({
	declarations: [
		AppComponent,
		SwatchComponent,
		SwatchListingComponent,
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
