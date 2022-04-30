import { Component, Input } from '@angular/core';

import { ITruckModel } from './../../models/trucks.model';

@Component({
  selector: 'gim-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss'],
})
export class MapInfoComponent {
  @Input() infoContent!: ITruckModel;
}
