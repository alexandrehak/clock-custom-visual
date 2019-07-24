/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class VisualSettings extends DataViewObjectsParser {
  public clockSettings: clockSettings = new clockSettings();
  public dateTimeSettings: dateTimeSettings = new dateTimeSettings();
}

export class dateTimeSettings {
  // https://momentjs.com/docs/#/i18n/instance-locale/
  public locale: string = 'en';
  public timezone: string = 'Local/Timezone';

  // https://en.wikipedia.org/wiki/Date_format_by_country 
  public dateFormat: string = "DMY";
  public timeFormat: string = "8:30 PM";
  public yearFormat: string = 'YYYY';
  public separator: string = '/';
  
  public fontFamily: string = 'Default';
  public fontSize: string = '20';
  public color: string = '#17202A';
  public alignment: string = 'Center';
  public backgroundColor: string = '#D5E3E3';
  public border: string = '';
  public borderRadius: string = '';
  public shadow: string = '';
  public displayDate: boolean = true;
  public displayTime: boolean = true;
}

export class clockSettings {
  public display: boolean = true;
  public predefinedModel: string = 'Classic';
  public backgroundColor: string = 'white';
  public shadow: string = '';
  public size: Number;
  public hourHandSize: Number;
  public minuteHandSize: Number;
  public secondHandSize: Number;
  public dotSize: Number;

  // Show all
}