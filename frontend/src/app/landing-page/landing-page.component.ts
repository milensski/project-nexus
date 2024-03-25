import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})

export class LandingPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['refresh']) {
      const url = this.router.createUrlTree(['/']); // Create URL without query parameters
      this.router.navigateByUrl(url, { replaceUrl: true }); // Replace current history entry
    }
  }
}
