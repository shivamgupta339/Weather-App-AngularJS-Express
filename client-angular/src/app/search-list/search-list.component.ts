//importing required libraries
import { Component, OnInit , Input} from '@angular/core';

@Component({
	selector: 'app-search-list',
	templateUrl: './search-list.component.html',
	styleUrls: ['./search-list.component.css']
})
//exporting required Component
export class SearchListComponent implements OnInit {
	@Input() weatherdata:any;
	constructor() { }

	ngOnInit() {
	}
}
