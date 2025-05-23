import { Component, Renderer2 } from '@angular/core';
import {
  accelerationIcon,
  acceptanceDateIcon,
  accessoriesIcon,
  accessoryPartsIcon,
  adblueAppIcon,
  addIcon,
  airConditionerIcon,
  alertFilledAppIcon,
  alertIcon,
  alertNotificationFilledAppIcon,
  ambientLightAppIcon,
  amplifierIcon,
  appConnectAppIcon,
  archiveIcon,
  arrowDownIcon,
  arrowLeftAlignedAppIcon,
  arrowLeftIcon,
  arrowRightIcon,
  arrowSliderAppIcon,
  arrowUpIcon,
  attachmentIcon,
  audiBrandIcon,
  authentPlugChargeAppIcon,
  authentQrAppIcon,
  authentRfidAppIcon,
  authentTouchidAppIcon,
  automaticTempAppIcon,
  awardWinnerPremiumIcon,
  backIcon,
  batteryIcon,
  batterySocChargingAppIcon,
  batterySocDepartureAppIcon,
  batterySocDestinationAppIcon,
  binIcon,
  blocksGroupForwardIcon,
  bluetoothIcon,
  bookmarkFilledIcon,
  bookmarkIcon,
  brakeAppIcon,
  brochureIcon,
  bulletpointAppIcon,
  bundleForwardIcon,
  businessCustomersCommercialIcon,
  businessCustomersPrivateIcon,
  calcIcon,
  calculatorForwardIcon,
  calendarCustomIcon,
  cameraScanIcon,
  campaignIcon,
  campaignOutdatedIcon,
  carDocumentsIcon,
  carErrorAppIcon,
  carInsuranceIcon,
  carOffSite,
  carOnSite,
  carPickupServiceIcon,
  carPlusIcon,
  carSettingsIcon,
  carVerifiedAppIcon,
  carWashIcon,
  carWheelAppIcon,
  challengeAppIcon,
  chargingIcon,
  chargingPduAppIcon,
  chargingStationIcon,
  chargingTarifOverviewAppIcon,
  chatAppIcon,
  chatIcon,
  checkboxCheckedAppIcon,
  checkboxCheckedIcon,
  checkboxUncheckedAppIcon,
  checkboxUncheckedIcon,
  checkmarkAppIcon,
  checkmarkFilledAppIcon,
  checkmarkIcon,
  chevronDownIcon,
  chevronLeftAlignedappIcon,
  chevronLeftIcon,
  chevronRightAlignedappIcon,
  chevronRightIcon,
  chevronSmallLeftAlignedappIcon,
  chevronSmallRightAlignedappIcon,
  chevronUpIcon,
  circleFilledIcon,
  circleHalfFilledIcon,
  circleQuarterFilledIcon,
  circleThreeQuartersFilledIcon,
  cityIcon,
  clearAppIcon,
  clearRightAlignedappIcon,
  clockIcon,
  closeAppIcon,
  closeCircleIcon,
  closeIcon,
  closeLeftAlignedappIcon,
  closeRightAlignedappIcon,
  compassAppIcon,
  completedByDateIcon,
  configuratorCommercialIcon,
  configuratorPrivateIcon,
  constructionIcon,
  consumptionFuelFilledAppIcon,
  consumptionIcon,
  contactDealerFilledAppIcon,
  contactDealerIcon,
  contactIcon,
  countryRoadIcon,
  craftIcon,
  cupraBrandIcon,
  customerIcon,
  customersCenterIcon,
  customerVipIcon,
  deliveryDateIcon,
  customerWaitingIcon,
  dataCopyAppIcon,
  dataExpiredIcon,
  dataFilledIcon,
  dataInputIcon,
  dataPlugAppIcon,
  dataSearchIcon,
  dataTimeExtensionIcon,
  defogDefrostAutoAppIcon,
  defogDefrostIcon,
  destinationAppIcon,
  directionIcon,
  dischargingAppIcon,
  discountAppIcon,
  discoveryAppIcon,
  dollarBillForwardIcon,
  dollarBillPartialIcon,
  downloadCustomIcon,
  dragIndicatorIcon,
  driversAssistanceIcon,
  dropFilledAppIcon,
  dwaBrandIcon,
  ecoIcon,
  editIcon,
  editSmallRightAlignedAppIcon,
  efficiencyIcon,
  electricCarsIcon,
  electricCarsServiceIcon,
  electricityFilledAppIcon,
  electricityIcon,
  emergencyIcon,
  emissionIcon,
  engineIcon,
  entertainmentIcon,
  exportAppIcon,
  exterior360Icon,
  exteriorIcon,
  externalPartForwardIcon,
  faqIcon,
  fastForwardIcon,
  faxIcon,
  filterIcon,
  findACarIcon,
  findADealerIcon,
  firstRegistrationDateIcon,
  fleetServiceCommercialIcon,
  fleetServicePrivateIcon,
  folderFilledAppIcon,
  foodFilledAppIcon,
  fullscreenEnterIcon,
  fullscreenExitIcon,
  galleryIcon,
  garageAppIcon,
  gasAppIcon,
  glassDamageAppIcon,
  gteIcon,
  heartFilledAppIcon,
  heartIcon,
  heightAppIcon,
  highwayRoadIcon,
  historyIcon,
  homeAppIcon,
  homeEnergyAppIcon,
  homeFilledAppIcon,
  hornAppIcon,
  hornFilledAppIcon,
  hybridIcon,
  immediateChargingAppIcon,
  infoFilledIcon,
  infoIcon,
  inputHideIcon,
  inputShowIcon,
  interior360Icon,
  interiorIcon,
  internalPartForwardIcon,
  internetIcon,
  invitationAppIcon,
  invoiceRecipientIcon,
  itemsForwardIcon,
  itemsRecieveIcon,
  jobportalIcon,
  keyAppIcon,
  keyboardAppIcon,
  keyCardAppIcon,
  keyDigitalAppIcon,
  layerCollapseAppIcon,
  layerExpandAppIcon,
  layersAppIcon,
  legalTermsAndConditionsAppIcon,
  licencePlateAppIcon,
  lightAssistappIcon,
  lightingAppIcon,
  linkExternAppIcon,
  listIcon,
  loadingVolumeIcon,
  localBusinessIcon,
  locateIcon,
  lockIcon,
  lockOpenIcon,
  loginIcon,
  logisticIcon,
  logoutIcon,
  magnifierIcon,
  magnifierMinusIcon,
  magnifierPlusIcon,
  mailIcon,
  mailResendAppIcon,
  manualIcon,
  mapIcon,
  mechanicIcon,
  mediaIcon,
  menuAppAppIcon,
  menuIcon,
  microphoneAppIcon,
  mobileIcon,
  moreAppbarAppIcon,
  moreAppIcon,
  motabilityIcon,
  motIcon,
  navigateFilledAppIcon,
  navigateIcon,
  newCarCommercialIcon,
  newCarPrivateFilledAppIcon,
  newCarPrivateIcon,
  nightServiceIcon,
  notificationFilledIcon,
  notificationIcon,
  number0Icon,
  number10Icon,
  number11Icon,
  number12Icon,
  number13Icon,
  number14Icon,
  number15Icon,
  number16Icon,
  number17Icon,
  number18Icon,
  number19Icon,
  number1Icon,
  number20Icon,
  number2Icon,
  number3Icon,
  number4Icon,
  number5Icon,
  number6Icon,
  number7Icon,
  number8Icon,
  number9Icon,
  offersFilledAppIcon,
  offersIcon,
  officeAppIcon,
  officeFilledAppIcon,
  oilLevelIcon,
  oilLevelWarningIcon,
  oilTemperatureAppIcon,
  onCallDutyIcon,
  openSatIcon,
  orderIcon,
  orderStatusIcon,
  paintMaterialForwardIcon,
  paintMaterialIcon,
  paintShopIcon,
  paragraphAppIcon,
  parkHeaterAppIcon,
  parkingFilledAppIcon,
  parkingGarageAppIcon,
  parkingIcon,
  parkingLocationIcon,
  parkingRouteAppIcon,
  parkingValetAppIcon,
  partAvailabilityInfoIcon,
  partAvailabilityNoIcon,
  partAvailabilityUnknownIcon,
  partAvailabilityWarningIcon,
  partAvailabilityYesIcon,
  partSuccessorIcon,
  partPredecessorIcon,
  partSuccessorPredecessorIcon,
  partIdenticalIcon,
  partIdenticalPredecessorIcon,
  partIdenticalSuccessorIcon,
  partIdenticalSuccpredecessorIcon,
  partsChangelocationIcon,
  partsForwardIcon,
  partsIcon,
  partsInventoryIcon,
  partsNonStockForwardIcon,
  partsNonStockIcon,
  partsPickingIcon,
  partsPickingPlusIcon,
  partsReceivingIcon,
  pauseIcon,
  payloadIcon,
  paymentAppIcon,
  paymentCashAppIcon,
  paymentChargingCardAppIcon,
  paymentCreditcardAppIcon,
  paymentMachineAppIcon,
  performanceIcon,
  petrolIcon,
  phoneIcon,
  pinFilledAppIcon,
  pinGenericFilledAppIcon,
  pinIcon,
  playIcon,
  plugCcsAppIcon,
  plugChademoAppIcon,
  plugChargeAppIcon,
  plugGenericAppIcon,
  plugSchukoAppIcon,
  plugType1AppIcon,
  plugType2AppIcon,
  porscheBrandIcon,
  powerIcon,
  powerTrainIcon,
  preciseLaneNavigationAppIcon,
  preHeaterAppIcon,
  presentAppIcon,
  printerIcon,
  privacyAppIcon,
  profileIcon,
  profileRegisterAppIcon,
  profileVerifiedIcon,
  publicServiceIcon,
  publicTransportAppIcon,
  qualifiedWorkshopIcon,
  questionnaireAppIcon,
  radioButtonInselectedIcon,
  radioButtonSelectedForDefIcon,
  radioButtonSelectedIcon,
  radioIcon,
  rangeIcon,
  reloadIcon,
  removeIcon,
  repeatIcon,
  repeatRepairIcon,
  replacementVehicleIcon,
  returnDateIcon,
  rewindIcon,
  roadsideAssistanceIcon,
  routeArrowAppIcon,
  routeIcon,
  routesHistoryAppIcon,
  rssIcon,
  safetyIcon,
  saveAppIcon,
  saveIcon,
  seatAirIcon,
  seatBrandIcon,
  seatIcon,
  secretTipAppIcon,
  secretTipFilledAppIcon,
  selectedIcon,
  selectedPartnerNetworkAppIcon,
  sendToCarAppIcon,
  serviceAdvisorIcon,
  serviceBellIcon,
  serviceFilledAppIcon,
  serviceIcon,
  settingsIcon,
  shareAndroidIcon,
  shareIosIcon,
  shoppingCartFilledAppIcon,
  shoppingCartIcon,
  shuffleIcon,
  sizeIcon,
  skillAppIcon,
  skipBackwardIcon,
  skipForwardIcon,
  skodaBrandIcon,
  softwareDownloadAppIcon,
  sortingAppIcon,
  soundIcon,
  standardEquipmentIcon,
  starFilledIcon,
  starOutlineIcon,
  statisticAppIcon,
  stockLocatorCommercialIcon,
  stockLocatorPrivateIcon,
  stopIcon,
  switchPositionAppIcon,
  syncAppIcon,
  taskAndAppointmentIcon,
  taxiDealerIcon,
  technicalSpecificationIcon,
  temperatureAppIcon,
  testDriveIcon,
  textForwardIcon,
  thumbsdownAppIcon,
  thumbsdownFilledAppIcon,
  thumbsupAppIcon,
  thumbsupFilledAppIcon,
  timeClimatisationAppIcon,
  timePreferredAppIcon,
  timerIcon,
  topcardIcon,
  transcriptDownloadIcon,
  transmissionAutomaticIcon,
  transmissionManualIcon,
  tripAppIcon,
  tripLongAppIcon,
  tripPartedAppIcon,
  tripShortAppIcon,
  turnSignalsIcon,
  unselectedIcon,
  updateRefreshAppIcon,
  uploadAppIcon,
  uploadCustomIcon,
  usedCarCommercialIcon,
  usedCarPrivateIcon,
  vehicleAmarokIcon,
  vehicleCaddyIcon,
  vehicleCrafterIcon,
  vehicleHightIcon,
  vehicleIdBuzzIcon,
  vehicleMultivanIcon,
  vehicleTransporterIcon,
  videoChatIcon,
  view360Icon,
  vinIcon,
  virtualRealityIcon,
  voiceMessageAppIcon,
  volkswagenAppIcon,
  volkswagenIcon,
  volumeMaximumIcon,
  volumeMediumIcon,
  volumeMuteIcon,
  vsfSearch48Icon,
  vsfSearchIcon,
  vwBrandIcon,
  vwConnectLicenseAppIcon,
  vwnBrandIcon,
  walkingAppIcon,
  walkingFilledAppIcon,
  wallboxIcon,
  weAssistAppIcon,
  weatherSunAppIcon,
  weChargeAppIcon,
  weDeliverAppIcon,
  weExperienceAppIcon,
  weParkAppIcon,
  weUpgradeAppIcon,
  wheelToWheelIcon,
  windscreenWashIcon,
  wlanHotspotIcon,
  wrenchForwardIcon,
} from '@porscheinformatik/clr-addons';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { IconShapeTuple } from '@cds/core/icon/interfaces/icon.interfaces';

@Component({
  selector: 'icons-sets',
  templateUrl: './icons-sets.component.html',
  styleUrl: './icons-sets.component.scss',
  standalone: false,
})
export class IconsSetsComponent {
  icons = [
    accessoryPartsIcon,
    acceptanceDateIcon,
    blocksGroupForwardIcon,
    bundleForwardIcon,
    campaignIcon,
    calculatorForwardIcon,
    campaignOutdatedIcon,
    carOffSite,
    carOnSite,
    completedByDateIcon,
    itemsForwardIcon,
    itemsRecieveIcon,
    dollarBillForwardIcon,
    dollarBillPartialIcon,
    paintMaterialForwardIcon,
    paintMaterialIcon,
    parkingLocationIcon,
    partsChangelocationIcon,
    partsForwardIcon,
    partsIcon,
    partsInventoryIcon,
    partsNonStockForwardIcon,
    partsNonStockIcon,
    partsPickingIcon,
    partsPickingPlusIcon,
    partsReceivingIcon,
    partAvailabilityInfoIcon,
    partAvailabilityNoIcon,
    partAvailabilityUnknownIcon,
    partAvailabilityWarningIcon,
    partAvailabilityYesIcon,
    partSuccessorIcon,
    partPredecessorIcon,
    partSuccessorPredecessorIcon,
    partIdenticalIcon,
    partIdenticalPredecessorIcon,
    partIdenticalSuccessorIcon,
    partIdenticalSuccpredecessorIcon,
    repeatRepairIcon,
    replacementVehicleIcon,
    returnDateIcon,
    internalPartForwardIcon,
    externalPartForwardIcon,
    taskAndAppointmentIcon,
    textForwardIcon,
    topcardIcon,
    vinIcon,
    vsfSearchIcon,
    vsfSearch48Icon,
    wrenchForwardIcon,
    circleFilledIcon,
    circleHalfFilledIcon,
    circleQuarterFilledIcon,
    circleThreeQuartersFilledIcon,
    mechanicIcon,
    serviceAdvisorIcon,
    customerIcon,
    customerWaitingIcon,
    customerVipIcon,
    deliveryDateIcon,
    firstRegistrationDateIcon,
    number0Icon,
    number1Icon,
    number2Icon,
    number3Icon,
    number4Icon,
    number5Icon,
    number6Icon,
    number7Icon,
    number8Icon,
    number9Icon,
    number10Icon,
    number11Icon,
    number12Icon,
    number13Icon,
    number14Icon,
    number15Icon,
    number16Icon,
    number17Icon,
    number18Icon,
    number19Icon,
    number20Icon,
    orderIcon,
    orderStatusIcon,
    historyIcon,
    invoiceRecipientIcon,
  ];
  brandIcons = [
    audiBrandIcon,
    cupraBrandIcon,
    dwaBrandIcon,
    porscheBrandIcon,
    seatBrandIcon,
    skodaBrandIcon,
    vwBrandIcon,
    volkswagenIcon,
    vwnBrandIcon,
  ];

  d6icons = [
    accelerationIcon,
    accessoriesIcon,
    adblueAppIcon,
    addIcon,
    airConditionerIcon,
    alertFilledAppIcon,
    alertIcon,
    alertNotificationFilledAppIcon,
    ambientLightAppIcon,
    amplifierIcon,
    appConnectAppIcon,
    archiveIcon,
    arrowDownIcon,
    arrowLeftAlignedAppIcon,
    arrowLeftIcon,
    arrowRightIcon,
    arrowSliderAppIcon,
    arrowUpIcon,
    attachmentIcon,
    authentPlugChargeAppIcon,
    authentQrAppIcon,
    authentRfidAppIcon,
    authentTouchidAppIcon,
    automaticTempAppIcon,
    awardWinnerPremiumIcon,
    backIcon,
    batteryIcon,
    batterySocChargingAppIcon,
    batterySocDepartureAppIcon,
    batterySocDestinationAppIcon,
    binIcon,
    bluetoothIcon,
    bookmarkFilledIcon,
    bookmarkIcon,
    brakeAppIcon,
    brochureIcon,
    bulletpointAppIcon,
    businessCustomersCommercialIcon,
    businessCustomersPrivateIcon,
    calcIcon,
    calendarCustomIcon,
    cameraScanIcon,
    carDocumentsIcon,
    carErrorAppIcon,
    carInsuranceIcon,
    carPickupServiceIcon,
    carPlusIcon,
    carSettingsIcon,
    carVerifiedAppIcon,
    carWashIcon,
    carWheelAppIcon,
    challengeAppIcon,
    chargingIcon,
    chargingPduAppIcon,
    chargingStationIcon,
    chargingTarifOverviewAppIcon,
    chatAppIcon,
    chatIcon,
    checkboxCheckedAppIcon,
    checkboxCheckedIcon,
    checkboxUncheckedAppIcon,
    checkboxUncheckedIcon,
    checkmarkAppIcon,
    checkmarkFilledAppIcon,
    checkmarkIcon,
    chevronDownIcon,
    chevronLeftAlignedappIcon,
    chevronLeftIcon,
    chevronRightAlignedappIcon,
    chevronRightIcon,
    chevronSmallLeftAlignedappIcon,
    chevronSmallRightAlignedappIcon,
    chevronUpIcon,
    cityIcon,
    clearAppIcon,
    clearRightAlignedappIcon,
    clockIcon,
    closeAppIcon,
    closeCircleIcon,
    closeIcon,
    closeLeftAlignedappIcon,
    closeRightAlignedappIcon,
    compassAppIcon,
    configuratorCommercialIcon,
    configuratorPrivateIcon,
    constructionIcon,
    consumptionFuelFilledAppIcon,
    consumptionIcon,
    contactDealerFilledAppIcon,
    contactDealerIcon,
    contactIcon,
    countryRoadIcon,
    craftIcon,
    customersCenterIcon,
    dataCopyAppIcon,
    dataExpiredIcon,
    dataFilledIcon,
    dataInputIcon,
    dataPlugAppIcon,
    dataSearchIcon,
    dataTimeExtensionIcon,
    defogDefrostAutoAppIcon,
    defogDefrostIcon,
    destinationAppIcon,
    directionIcon,
    dischargingAppIcon,
    discountAppIcon,
    discoveryAppIcon,
    downloadCustomIcon,
    dragIndicatorIcon,
    driversAssistanceIcon,
    dropFilledAppIcon,
    ecoIcon,
    editIcon,
    editSmallRightAlignedAppIcon,
    efficiencyIcon,
    electricCarsIcon,
    electricCarsServiceIcon,
    electricityFilledAppIcon,
    electricityIcon,
    emergencyIcon,
    emissionIcon,
    engineIcon,
    entertainmentIcon,
    exportAppIcon,
    exterior360Icon,
    exteriorIcon,
    faqIcon,
    fastForwardIcon,
    faxIcon,
    filterIcon,
    findACarIcon,
    findADealerIcon,
    fleetServiceCommercialIcon,
    fleetServicePrivateIcon,
    folderFilledAppIcon,
    foodFilledAppIcon,
    fullscreenEnterIcon,
    fullscreenExitIcon,
    galleryIcon,
    garageAppIcon,
    gasAppIcon,
    glassDamageAppIcon,
    gteIcon,
    heartFilledAppIcon,
    heartIcon,
    heightAppIcon,
    highwayRoadIcon,
    homeAppIcon,
    homeEnergyAppIcon,
    homeFilledAppIcon,
    hornAppIcon,
    hornFilledAppIcon,
    hybridIcon,
    immediateChargingAppIcon,
    infoFilledIcon,
    infoIcon,
    inputHideIcon,
    inputShowIcon,
    interior360Icon,
    interiorIcon,
    internetIcon,
    invitationAppIcon,
    jobportalIcon,
    keyAppIcon,
    keyCardAppIcon,
    keyDigitalAppIcon,
    keyboardAppIcon,
    layerCollapseAppIcon,
    layerExpandAppIcon,
    layersAppIcon,
    legalTermsAndConditionsAppIcon,
    licencePlateAppIcon,
    lightAssistappIcon,
    lightingAppIcon,
    linkExternAppIcon,
    listIcon,
    loadingVolumeIcon,
    localBusinessIcon,
    locateIcon,
    lockIcon,
    lockOpenIcon,
    loginIcon,
    logoutIcon,
    logisticIcon,
    magnifierIcon,
    magnifierMinusIcon,
    magnifierPlusIcon,
    mailIcon,
    mailResendAppIcon,
    manualIcon,
    mapIcon,
    mediaIcon,
    menuAppAppIcon,
    menuIcon,
    microphoneAppIcon,
    mobileIcon,
    moreAppbarAppIcon,
    moreAppIcon,
    motIcon,
    motabilityIcon,
    navigateFilledAppIcon,
    navigateIcon,
    newCarCommercialIcon,
    newCarPrivateFilledAppIcon,
    newCarPrivateIcon,
    nightServiceIcon,
    notificationFilledIcon,
    notificationIcon,
    officeAppIcon,
    officeFilledAppIcon,
    oilLevelIcon,
    oilLevelWarningIcon,
    oilTemperatureAppIcon,
    onCallDutyIcon,
    offersFilledAppIcon,
    offersIcon,
    openSatIcon,
    paintShopIcon,
    paragraphAppIcon,
    parkHeaterAppIcon,
    parkingFilledAppIcon,
    parkingGarageAppIcon,
    parkingIcon,
    parkingRouteAppIcon,
    parkingValetAppIcon,
    pauseIcon,
    paymentAppIcon,
    paymentCashAppIcon,
    paymentChargingCardAppIcon,
    paymentCreditcardAppIcon,
    paymentMachineAppIcon,
    payloadIcon,
    performanceIcon,
    petrolIcon,
    phoneIcon,
    pinFilledAppIcon,
    pinGenericFilledAppIcon,
    pinIcon,
    playIcon,
    plugCcsAppIcon,
    plugChademoAppIcon,
    plugChargeAppIcon,
    plugGenericAppIcon,
    plugSchukoAppIcon,
    plugType1AppIcon,
    plugType2AppIcon,
    powerIcon,
    powerTrainIcon,
    preHeaterAppIcon,
    preciseLaneNavigationAppIcon,
    presentAppIcon,
    printerIcon,
    privacyAppIcon,
    profileIcon,
    profileRegisterAppIcon,
    profileVerifiedIcon,
    publicServiceIcon,
    publicTransportAppIcon,
    qualifiedWorkshopIcon,
    questionnaireAppIcon,
    radioButtonInselectedIcon,
    radioButtonSelectedForDefIcon,
    radioButtonSelectedIcon,
    radioIcon,
    rangeIcon,
    reloadIcon,
    removeIcon,
    repeatIcon,
    rewindIcon,
    roadsideAssistanceIcon,
    routeArrowAppIcon,
    routeIcon,
    routesHistoryAppIcon,
    rssIcon,
    safetyIcon,
    saveAppIcon,
    saveIcon,
    secretTipAppIcon,
    secretTipFilledAppIcon,
    seatAirIcon,
    seatIcon,
    selectedIcon,
    selectedPartnerNetworkAppIcon,
    sendToCarAppIcon,
    serviceBellIcon,
    serviceFilledAppIcon,
    serviceIcon,
    settingsIcon,
    shareAndroidIcon,
    shareIosIcon,
    shoppingCartFilledAppIcon,
    shoppingCartIcon,
    shuffleIcon,
    sizeIcon,
    skillAppIcon,
    skipBackwardIcon,
    skipForwardIcon,
    softwareDownloadAppIcon,
    sortingAppIcon,
    soundIcon,
    standardEquipmentIcon,
    starFilledIcon,
    starOutlineIcon,
    statisticAppIcon,
    stockLocatorCommercialIcon,
    stockLocatorPrivateIcon,
    stopIcon,
    switchPositionAppIcon,
    syncAppIcon,
    taxiDealerIcon,
    technicalSpecificationIcon,
    temperatureAppIcon,
    testDriveIcon,
    thumbsdownAppIcon,
    thumbsdownFilledAppIcon,
    thumbsupAppIcon,
    thumbsupFilledAppIcon,
    timeClimatisationAppIcon,
    timePreferredAppIcon,
    timerIcon,
    transcriptDownloadIcon,
    transmissionAutomaticIcon,
    transmissionManualIcon,
    tripAppIcon,
    tripLongAppIcon,
    tripPartedAppIcon,
    tripShortAppIcon,
    turnSignalsIcon,
    unselectedIcon,
    updateRefreshAppIcon,
    uploadAppIcon,
    uploadCustomIcon,
    usedCarCommercialIcon,
    usedCarPrivateIcon,
    vehicleAmarokIcon,
    vehicleCaddyIcon,
    vehicleCrafterIcon,
    vehicleHightIcon,
    vehicleIdBuzzIcon,
    vehicleMultivanIcon,
    vehicleTransporterIcon,
    videoChatIcon,
    view360Icon,
    virtualRealityIcon,
    voiceMessageAppIcon,
    volkswagenAppIcon,
    volumeMaximumIcon,
    volumeMediumIcon,
    volumeMuteIcon,
    vwConnectLicenseAppIcon,
    walkingAppIcon,
    walkingFilledAppIcon,
    wallboxIcon,
    weAssistAppIcon,
    weChargeAppIcon,
    weDeliverAppIcon,
    weExperienceAppIcon,
    weParkAppIcon,
    weUpgradeAppIcon,
    weatherSunAppIcon,
    wheelToWheelIcon,
    windscreenWashIcon,
    wlanHotspotIcon,
  ];

  sortIcons = (icons: IconShapeTuple[]) =>
    icons.map(item => item[0]).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  sortAndFilterIcons = (icons: IconShapeTuple[], searchText) =>
    icons
      .map(item => item[0])
      .filter(entry => this.matchSearch(entry, searchText))
      .sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );

  filterIcons = (icons: IconShapeTuple[], searchText) =>
    icons.map(item => item[0]).filter(entry => this.matchSearch(entry, searchText));

  shapes = this.sortIcons(this.icons);
  brandshapes = this.sortIcons(this.brandIcons);
  /* remove sorting from d6icons, makes ui too slow */
  d6shapes = this.d6icons.map(item => item[0]);

  private searched$ = new Subject<string>();
  destroy$ = new Subject<void>();
  selectedShape = '';

  constructor(private renderer: Renderer2) {
    ClarityIcons.addIcons(...this.icons);
    ClarityIcons.addIcons(...this.brandIcons);
    ClarityIcons.addIcons(downloadIcon);
    setTimeout(() => {
      ClarityIcons.addIcons(...this.d6icons);
    }, 100);
  }

  ngOnInit() {
    this.searched$
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(400))
      .subscribe((searchText: string) => {
        this.filterEntries(searchText.toLowerCase());
      });
  }

  filterEntries(searchText: string) {
    this.shapes = this.sortAndFilterIcons(this.icons, searchText);
    this.brandshapes = this.sortAndFilterIcons(this.brandIcons, searchText);
    this.d6shapes = this.filterIcons(this.d6icons, searchText);
  }

  matchSearch(entry: string, searchText: string): boolean {
    return entry.toLocaleLowerCase().includes(searchText);
  }

  changeSearchText(searchText): void {
    this.searched$.next(searchText);
  }

  download(filename: string) {
    const all = [...this.icons, ...this.d6icons, ...this.brandIcons];
    const svgData = all.find(item => (item[0] as string) === filename);
    const data = this.encode(String(svgData[1]));

    const blob = new Blob([data]);

    this.saveBlob(blob, filename + '.svg');
  }

  private saveBlob(blob: Blob, filename: string) {
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', blobUrl);
    link.setAttribute('download', filename);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    link.dispatchEvent(event);

    URL.revokeObjectURL(blobUrl);
  }

  private encode(s: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(s);
  }

  getCode() {
    return '<cds-icon shape="' + this.selectedShape + '"></cds-icon>';
  }
}
