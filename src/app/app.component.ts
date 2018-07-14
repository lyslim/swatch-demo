import { Component } from '@angular/core';
import { lengthList, colorList, sizeList } from './swatch-listing/mock/swatch.mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	list1 = colorList;
	list2 = lengthList;
	list3 = sizeList;
}
