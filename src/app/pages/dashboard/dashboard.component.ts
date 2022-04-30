import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';

import { CoreService } from './../../core/services/core.service';
import { ITruckResponse, ITruckModel } from './../../models/trucks.model';

@Component({
  selector: 'gim-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  private subscription$!: Subscription;
  isLoading!: boolean;
  truckDetails!: ITruckModel[];
  infoContent!: ITruckModel;

  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 8,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    clickable: true,
    animation: google.maps.Animation.BOUNCE,
  };
  markerClustererImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  constructor(
    private readonly coreService: CoreService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$ = this.coreService
      .getTrucksInfo()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: ITruckResponse) => {
          if (res?.responseCode === 200 && res?.data?.length) {
            this.truckDetails = res?.data;
            this.mapOptions.center = {
              lat: res.data[0].latitude!,
              lng: res.data[0]?.longitude!,
            };
          } else {
            this.truckDetails = [];
          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error?.error?.message, '', { duration: 5000 });
        },
      });
  }

  openInfoWindow(marker: MapMarker, selectedItem: ITruckModel) {
    this.infoContent = selectedItem;
    this.infoWindow.open(marker);
  }

  logout(): void {
    this.coreService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
