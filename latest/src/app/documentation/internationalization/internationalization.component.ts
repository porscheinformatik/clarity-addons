import { Component } from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeAT from '@angular/common/locales/de-AT';
import localeEnGB from '@angular/common/locales/en-GB';
import localeEnUS from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { LocaleDataIndex } from "@angular/common/src/i18n/locale_data";
import { CURRENCIES_EN } from "./currencies";

import LocaleData = LocaleDataIndex;

registerLocaleData(localeDe);
registerLocaleData(localeDeAT);
registerLocaleData(localeEnGB);


@Component({
    selector: 'internationalization',
    templateUrl: './internationalization.component.html',
    styleUrls: ['internationalization.component.css'],
    host: {
        "[class.content-area]": "true"
    }
})
export class InternationalizationComponent {
    // If you want to extend this to more locales, simply import the locale file, call registerLocaleData()
    // and add it into this array - then it should become visible to be selected from the dropdown!
    supportedLocales = [localeDe, localeDeAT, localeEnUS, localeEnGB];
    firstLocale = localeDe;
    secondLocale = localeEnGB;

    // Example Data
    dateTime = Date.now();
    posNumber: number = 123456789;
    negNumber: number = -123456789;

    constructor() {
    }

    getLocaleId(locale): string {
        return locale[LocaleData.LocaleId];
    }

    // DATE & TIME

    getShortDate(locale): string {
        return locale[LocaleData.DateFormat][0];
    }

    getMediumDate(locale): string {
        return locale[LocaleData.DateFormat][1];
    }

    getLongDate(locale): string {
        return locale[LocaleData.DateFormat][2];
    }

    getFullDate(locale): string {
        return locale[LocaleData.DateFormat][3];
    }

    getShortTime(locale): string {
        return locale[LocaleData.TimeFormat][0];
    }

    getMediumTime(locale): string {
        return locale[LocaleData.TimeFormat][1];
    }

    getLongTime(locale): string {
        return locale[LocaleData.TimeFormat][2];
    }

    getFullTime(locale): string {
        return locale[LocaleData.TimeFormat][3];
    }

    getFirstDayOfWeek(locale): string {
        return locale[LocaleData.DaysFormat][2][locale[LocaleData.FirstDayOfWeek]];
    }

    // NUMBERS

    getDecimalSymbol(locale): string {
        return locale[LocaleData.NumberSymbols][0];
    }

    getDigitGroupingSymbol(locale): string {
        return locale[LocaleData.NumberSymbols][1];
    }

    getListSeparatorSymbol(locale): string {
        return locale[LocaleData.NumberSymbols][2];
    }

    getNegativeSignSymbol(locale): string {
        return locale[LocaleData.NumberSymbols][5];
    }

    // CURRENCY

    getCurrencySymbol(locale): string {
        return locale[LocaleData.CurrencySymbol];
    }

    getCurrencyName(locale): string {
        return locale[LocaleData.CurrencyName];
    }

    // this method gets the currency code for the currency pipe, otherwise it would always use USD.
    getCurrencyCode(locale): string {
        const symbol = locale[LocaleData.CurrencySymbol];
        for (let curr in CURRENCIES_EN) {
            let array = CURRENCIES_EN[curr];
            if (array[0] === symbol) {
                return curr;
            }
        }
        return "";
    }
}
