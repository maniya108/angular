import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CoreService } from './../../core/services/core.service';

@Component({
  selector: 'gim-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly coreService: CoreService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.coreService.getTrucksInfo();
  }

  logout(): void {
    this.coreService.logout();
    this.router.navigateByUrl('/');
  }
}
