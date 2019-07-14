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
  public dataPoint: dataPointSettings = new dataPointSettings();
  public clockSettings: clockSettings = new clockSettings();
  public dateSettings: dateSettings = new dateSettings();
}

export class dateSettings {
  public display: boolean = true;
  // Default date format
  public dateFormat: string = "DMY";
  // Show all
  public showAllDataPoints: string = "true";
  // https://en.wikipedia.org/wiki/Date_format_by_country 
  public yearFormat: string = 'yyyy';
  public monthFormat: string = 'mm';
  public dayFormat: string = 'dd';
  public separator: string = '/';
  
  public font: string = '';
  public color: string = 'black';
  public background: string = 'white';
}

export class clockSettings {
  public display: boolean = true;
  public predefinedModel: string = 'Classic';
  public size: Number;
  // Show all
}

export class dataPointSettings {
  // Default color
  public defaultColor: string = "";
  // Show all
  public showAllDataPoints: boolean = true;
  // Fill
  public fill: string = "";
  // Color saturation
  public fillRule: string = "";
  // Text Size
  public fontSize: number = 12;
}

