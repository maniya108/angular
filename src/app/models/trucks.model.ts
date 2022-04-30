export interface ITruckResponse {
  data: ITruckModel[];
  success: boolean;
  message: null;
  errorCode: null;
  responseCode: number;
  debugMessage: null;
}

export interface ITruckModel {
  id: number;
  name: string;
  nameBn: null | string;
  latitude: number | null;
  longitude: number | null;
  position?: google.maps.LatLngLiteral | google.maps.LatLng;
  truckCounts: TruckCount[];
}

export interface TruckCount {
  truckType: TruckType;
  count: number;
}

export enum TruckType {
  ConcreteMixer = 'Concrete Mixer',
  CoveredTruck = 'Covered Truck',
  DumpTruckTipper = 'Dump Truck/Tipper',
  OpenCoveredTruck = 'Open/Covered truck',
  OpenTruck = 'Open Truck',
  PetroleumTanker = 'Petroleum Tanker',
  RefrigeratedVan = 'Refrigerated Van',
  SpecialPurposeVehicle = 'Special Purpose Vehicle',
  Trailer = 'Trailer',
}
