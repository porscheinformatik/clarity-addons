import { Component } from '@angular/core';
import {
  accessoriesIcon,
  accessoryPartsIcon,
  airConditionerIcon,
  audiBrandIcon,
  awardWinnerPremiumIcon,
  blocksGroupForwardIcon,
  brochureIcon,
  bundleForwardIcon,
  businessCustomersCommercialIcon,
  businessCustomersPrivateIcon,
  businessPartnerWithCarIcon,
  calculatorForwardIcon,
  californiaServiceIcon,
  californiaSpecialistIcon,
  campaignIcon,
  campaignOutdatedIcon,
  carPickupServiceIcon,
  carWashIcon,
  certifiedRepairIcon,
  certifiedRetailerIcon,
  configuratorCommercialIcon,
  configuratorPrivateIcon,
  consumptionIcon,
  contactDealerIcon,
  cupraBrandIcon,
  customersCenterIcon,
  dieselIcon,
  dollarBillForwardIcon,
  dollarBillPartialIcon,
  driversAssistanceIcon,
  dwaBrandIcon,
  efficiencyIcon,
  electricCarsIcon,
  electricCarsServiceIcon,
  electricityIcon,
  emissionIcon,
  energyIcon,
  engineIcon,
  expressServiceIcon,
  exteriorIcon,
  externalPartForwardIcon,
  findACarIcon,
  fleetServiceCommercialIcon,
  fleetServicePrivateIcon,
  gasCarsServiceIcon,
  gasIcon,
  hybridIcon,
  internalPartForwardIcon,
  itemsForwardIcon,
  itemsRecieveIcon,
  loadingVolumeIcon,
  locateIcon,
  newCarCommercialIcon,
  newCarPrivateIcon,
  newCarUtilityVehicleIcon,
  nightServiceIcon,
  offersIcon,
  onCallDutyIcon,
  openSatIcon,
  paintMaterialForwardIcon,
  paintMaterialIcon,
  paintShopIcon,
  partsForwardIcon,
  partsIcon,
  partsNonStockForwardIcon,
  partsNonStockIcon,
  payloadIcon,
  performanceIcon,
  petrolIcon,
  plusServiceIcon,
  porscheBrandIcon,
  powerIcon,
  powerTrainIcon,
  priceTypeSwitchIcon,
  qualifiedWorkshopIcon,
  roadsideAssistanceIcon,
  routeIcon,
  seatAirIcon,
  seatBrandIcon,
  seatIcon,
  serviceBellIcon,
  serviceIcon,
  sizeIcon,
  skodaBrandIcon,
  stockLocatorCommercialIcon,
  stockLocatorPrivateIcon,
  taskAndAppointmentIcon,
  taxiDealerIcon,
  textForwardIcon,
  topcardIcon,
  touaregServiceIcon,
  transmissionAutomaticIcon,
  transmissionManualIcon,
  usedCarCommercialIcon,
  usedCarPrivateIcon,
  vehicleConversionIcon,
  view360Icon,
  virtualRealityIcon,
  volkswagenIcon,
  vwBrandIcon,
  vwnBrandIcon,
  wheelToWheelIcon,
  windscreenWashIcon,
  wrenchForwardIcon,
} from '@porscheinformatik/clr-addons';
import { ClarityIcons } from '@cds/core/icon';

@Component({
  selector: 'icons',
  templateUrl: 'icons.component.html',
  standalone: false,
})
export class IconsComponent {
  icons = [
    airConditionerIcon,
    accessoriesIcon,
    accessoryPartsIcon,
    awardWinnerPremiumIcon,
    brochureIcon,
    businessCustomersCommercialIcon,
    businessCustomersPrivateIcon,
    californiaServiceIcon,
    californiaSpecialistIcon,
    carPickupServiceIcon,
    carWashIcon,
    certifiedRepairIcon,
    certifiedRetailerIcon,
    configuratorCommercialIcon,
    configuratorPrivateIcon,
    contactDealerIcon,
    consumptionIcon,
    dieselIcon,
    driversAssistanceIcon,
    efficiencyIcon,
    electricCarsIcon,
    electricCarsServiceIcon,
    electricityIcon,
    emissionIcon,
    energyIcon,
    engineIcon,
    expressServiceIcon,
    exteriorIcon,
    findACarIcon,
    fleetServiceCommercialIcon,
    fleetServicePrivateIcon,
    gasIcon,
    gasCarsServiceIcon,
    hybridIcon,
    loadingVolumeIcon,
    locateIcon,
    newCarCommercialIcon,
    newCarPrivateIcon,
    newCarUtilityVehicleIcon,
    nightServiceIcon,
    offersIcon,
    onCallDutyIcon,
    openSatIcon,
    partsIcon,
    payloadIcon,
    performanceIcon,
    petrolIcon,
    plusServiceIcon,
    powerTrainIcon,
    powerIcon,
    priceTypeSwitchIcon,
    qualifiedWorkshopIcon,
    roadsideAssistanceIcon,
    routeIcon,
    seatIcon,
    seatAirIcon,
    sizeIcon,
    serviceIcon,
    serviceBellIcon,
    stockLocatorCommercialIcon,
    stockLocatorPrivateIcon,
    taxiDealerIcon,
    transmissionManualIcon,
    transmissionAutomaticIcon,
    touaregServiceIcon,
    usedCarPrivateIcon,
    usedCarCommercialIcon,
    vehicleConversionIcon,
    virtualRealityIcon,
    volkswagenIcon,
    audiBrandIcon,
    cupraBrandIcon,
    dwaBrandIcon,
    porscheBrandIcon,
    seatBrandIcon,
    skodaBrandIcon,
    vwBrandIcon,
    vwnBrandIcon,
    view360Icon,
    wheelToWheelIcon,
    windscreenWashIcon,
    wrenchForwardIcon,
    topcardIcon,
    taskAndAppointmentIcon,
    partsForwardIcon,
    partsNonStockIcon,
    partsNonStockForwardIcon,
    paintMaterialIcon,
    paintMaterialForwardIcon,
    itemsForwardIcon,
    itemsRecieveIcon,
    dollarBillForwardIcon,
    dollarBillPartialIcon,
    blocksGroupForwardIcon,
    textForwardIcon,
    calculatorForwardIcon,
    bundleForwardIcon,
    internalPartForwardIcon,
    businessPartnerWithCarIcon,
    campaignIcon,
    campaignOutdatedIcon,
    externalPartForwardIcon,
    paintShopIcon,
    customersCenterIcon,
  ];
  backgroundIcons: string[] = this.icons.map(item => item[0]).sort();

  constructor() {
    ClarityIcons.addIcons(...this.icons);
  }
}
