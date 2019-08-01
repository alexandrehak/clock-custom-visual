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
  public timeSettings: timeSettings = new timeSettings();
  public dateSettings: dateSettings = new dateSettings();
}

export class customVisualSettings {
  public itemsPlacement: string = 'row';
  public layout: string = 'space-evenly';
  public help: boolean = false;
}

export class timeSettings {
  public show: boolean = true;
  public format: string = "LTS";
  public font: string = "Arial";
  public size: number = 35;
  public color: string = '#fff';
}

export class dateSettings {
  public show: boolean = true;
  public format: string = "LL";
  public font: string = "Arial";
  public size: number = 20;
  public color: string = '#fff';
}

export class dateTimeSettings {
  // Display
  public show: boolean = true;

  public locale: string = 'fr';
  public timezone: string = 'Local/Timezone';
  // public displayInformation: boolean = false;
  
  // https://momentjs.com/docs/#/i18n/instance-locale/
  public backgroundColor: string = '#222';
  public dateTimeLayout: string = 'column';
  // Sizing and borders
  public width: number = 225;
  public height: number = 145;
  // border style
  public borderWidth: number = 13;
  public borderStyle: string = 'solid'; 
  public borderColor: string = '#666';
  public borderRadius: number = 18;
}

export class clockSettings {
  public show: boolean = true;
  // [?] choose clock model
  public predefinedModel: string = 'Classic';
  public backgroundColor: string = '#c8c8c8';

  public size: number = 280;

  public hourColor: string = '#000';
  public minuteColor: string = '#000';
  public secondColor: string = '#000';
  

  // Show all
}