// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				query('#cards', [
					style({ opacity: 0}),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})

export class HomeComponent implements OnInit {

	// Variables
	isLoading: boolean = true;

  constructor(
		private themingService: ThemingService,
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.isLoading = false;
	}

}
