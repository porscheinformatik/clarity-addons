import { Component } from '@angular/core';

// check for existing locales before import: https://www.npmjs.com/package/@angular/common?activeTab=code
import localeDe from '@angular/common/locales/de';
import localeDeAT from '@angular/common/locales/de-AT';
import localeDeBE from '@angular/common/locales/de-BE';
import localeEn from '@angular/common/locales/en';
import localeEnBE from '@angular/common/locales/en-BE';
import localeEnGB from '@angular/common/locales/en-GB';
import localeEnSE from '@angular/common/locales/en-SE';
import localeFr from '@angular/common/locales/fr';
import localeFrBE from '@angular/common/locales/fr-BE';
import localeNl from '@angular/common/locales/nl';
import localeNlBE from '@angular/common/locales/nl-BE';
import localePtPT from '@angular/common/locales/pt-PT';
import localeSeSE from '@angular/common/locales/se-SE';

import { registerLocaleData } from '@angular/common';
import { CURRENCIES_EN } from './currencies';

registerLocaleData(localeDe);
registerLocaleData(localeDeAT);
registerLocaleData(localeDeBE);
registerLocaleData(localeEn);
registerLocaleData(localeEnBE);
registerLocaleData(localeEnGB);
registerLocaleData(localeEnSE);
registerLocaleData(localeFr);
registerLocaleData(localeFrBE);
registerLocaleData(localeNl);
registerLocaleData(localeNlBE);
registerLocaleData(localePtPT);
registerLocaleData(localeSeSE);

enum LocaleDataIndex {
  LocaleId = 0,
  DayPeriodsFormat,
  DayPeriodsStandalone,
  DaysFormat,
  DaysStandalone,
  MonthsFormat,
  MonthsStandalone,
  Eras,
  FirstDayOfWeek,
  WeekendRange,
  DateFormat,
  TimeFormat,
  DateTimeFormat,
  NumberSymbols,
  NumberFormats,
  CurrencyName,
  CurrencySymbol,
  Currencies,
  PluralCase,
  ExtraData,
}

@Component({
  selector: 'internationalization',
  templateUrl: './internationalization.component.html',
  styleUrls: ['internationalization.component.scss'],
  host: {
    '[class.content-area]': 'true',
  },
})
export class InternationalizationComponent {
  // If you want to extend this to more locales, simply import the locale file, call registerLocaleData()
  // and add it into this array - then it should become visible to be selected from the dropdown!
  supportedLocales = [localeDe, localeDeAT, localeDeBE, localeEn, localeEnBE, localeEnGB, localeEnSE, localeFr, localeFrBE, localeNl, localeNlBE, localePtPT, localeSeSE];
  firstLocale = localeDe;
  secondLocale = localeEnGB;

  // Example Data
  dateTime = Date.now();
  posNumber: number = 123456789;
  negNumber: number = -123456789;

  constructor() {}

  getLocaleId(locale): string {
    return locale[LocaleDataIndex.LocaleId];
  }

  // DATE & TIME

  getShortDate(locale): string {
    return locale[LocaleDataIndex.DateFormat][0];
  }

  getMediumDate(locale): string {
    return locale[LocaleDataIndex.DateFormat][1];
  }

  getLongDate(locale): string {
    return locale[LocaleDataIndex.DateFormat][2];
  }

  getFullDate(locale): string {
    return locale[LocaleDataIndex.DateFormat][3];
  }

  getShortTime(locale): string {
    return locale[LocaleDataIndex.TimeFormat][0];
  }

  getMediumTime(locale): string {
    return locale[LocaleDataIndex.TimeFormat][1];
  }

  getLongTime(locale): string {
    return locale[LocaleDataIndex.TimeFormat][2];
  }

  getFullTime(locale): string {
    return locale[LocaleDataIndex.TimeFormat][3];
  }

  getFirstDayOfWeek(locale): string {
    return locale[LocaleDataIndex.DaysFormat][2][locale[LocaleDataIndex.FirstDayOfWeek]];
  }

  // NUMBERS

  getDecimalSymbol(locale): string {
    return locale[LocaleDataIndex.NumberSymbols][0];
  }

  getDigitGroupingSymbol(locale): string {
    return locale[LocaleDataIndex.NumberSymbols][1];
  }

  getListSeparatorSymbol(locale): string {
    return locale[LocaleDataIndex.NumberSymbols][2];
  }

  getNegativeSignSymbol(locale): string {
    return locale[LocaleDataIndex.NumberSymbols][5];
  }

  // CURRENCY

  getCurrencySymbol(locale): string {
    return locale[LocaleDataIndex.CurrencySymbol];
  }

  getCurrencyName(locale): string {
    return locale[LocaleDataIndex.CurrencyName];
  }

  // this method gets the currency code for the currency pipe, otherwise it would always use USD.
  getCurrencyCode(locale): string {
    const symbol = locale[LocaleDataIndex.CurrencySymbol];
    // tslint:disable-next-line:forin
    for (let curr in CURRENCIES_EN) {
      let array = CURRENCIES_EN[curr];
      if (array[0] === symbol) {
        return curr;
      }
    }
    return '';
  }
}
