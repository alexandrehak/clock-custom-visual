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
  public customVisualSettings: customVisualSettings = new customVisualSettings();
  public clockSettings: clockSettings = new clockSettings();
  public dateTimeSettings: dateTimeSettings = new dateTimeSettings();
}

export class customVisualSettings {
  public layout: string = 'space-evenly';
}

export class dateTimeSettings {
  // https://momentjs.com/docs/#/i18n/instance-locale/
  public locale: string = 'fr';
  public timezone: string = 'Local/Timezone';

  // https://en.wikipedia.org/wiki/Date_format_by_country 
  public timeFormat: string = "LTS";
  public dateFormat: string = "LL";
  // Fonts
  public fontFamily: string = "Arial";
  public dateSize: string = '20';
  public timeSize: string = '35';
  // public alignment: string = 'Center';
  public color: string = '#fff';
  public backgroundColor: string = '#222';
  public dateTimeLayout: string = 'column';
  // Sizing and borders
  public width: number = 225;
  public height: number = 145;
  public border: string = '4px solid cyan';
  public borderRadius: string = '15px';
  // Display
  public display: boolean = true;
  public displayDate: boolean = true;
  public displayTime: boolean = true;
  public displayInformation: boolean = false;
}

export class clockSettings {
  public display: boolean = true;
  // [?] choose clock model
  public predefinedModel: string = 'Classic';
  public backgroundColor: string = '#c8c8c8';

  public size: number = 300;

  public hourColor: string = '#000';
  public minuteColor: string = '#000';
  public secondColor: string = '#000';
  

  // Show all
}