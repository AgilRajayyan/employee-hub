import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navbarTitle = 'Employee List';

  constructor(public route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.url;
        if (currentUrl === '/employees/add') {
          this.navbarTitle = 'Add Employee Details';
        } else if (currentUrl.startsWith('/employees/edit')) {
          this.navbarTitle = 'Edit Employee Details';
        } else {
          this.navbarTitle = 'Employee List';
        }
      });
  }
}
