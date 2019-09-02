/*
 *  Power BI Visual CLI
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
'use strict';

import 'core-js/stable';
// Moment.js
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
import powerbi from 'powerbi-visuals-api';
// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './../style/visual.less';
// React components
import App, { initialState } from './components/app';
// import Clock from "./components/clock";
import { VisualSettings } from './settings';
// powerbi
import DataView = powerbi.DataView;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import IViewport = powerbi.IViewport;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
// powerbi extensibility
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual implements IVisual {
  private target: HTMLElement;
  private settings: VisualSettings;
  private cachedDate: powerbi.PrimitiveValue;
  private date: moment.Moment;
  private dateEl: HTMLElement;

  constructor(options: VisualConstructorOptions) {
    this.target = options.element;

    if (typeof document !== 'undefined') {
      // this.target.appendChild(this.createMap());
      ReactDOM.render(React.createElement(App), this.target);
    } else {
      console.error('document is undefined');
    }

    // // attach dateEl to custom visual root el

    // set default timezone https://momentjs.com/timezone/docs/#/using-timezones/default-timezone/
    // get user timzeone https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/
    // console.group('%c Testing moment.js', 'color: yellow');
    // console.log('moment -> ', moment().format('LTS'));
    // console.log('testing time zone');
    // console.log(momentTimezone().tz('America/Los_Angeles').format('LTS'));
    // console.log('moment local format', momentTimezone().format('L'));

    // console.log('moment timezone modification', momentTimezone().tz(momentTimezone.tz.guess()));
    // console.log('momenttimezone', momentTimezone());
    // console.log(momentTimezone().tz('America/Los_Angeles'));
    // console.log(momentTimezone.tz.names());
    // console.log('testing timezone existance', momentTimezone.tz.zone("Europe/Paris"));
    // console.log('get user timezone', momentTimezone.tz.guess(true));

    // console.groupEnd();
  }

  public update(options: VisualUpdateOptions) {
    /**
     * [ ] Rename visual (pbiviz.json)
     * [X] Visual landing page
     * [?] Change how moment ticks (use clone instead of incrementing)
     * [?] Add Date filering
     * [X] Display date given as a field when it is provided
     * [?] Support bookmark
     * [?] Support others pbi features
     * [X] display measure value instead of default "no field value"
     * [?] Change tick functionality / new instance of moment.js each second ?
     * [?] Support more language, date format...
     * [X] Remove unused folder (git remove)
     * [X] make format panel more "friendly"
     * --- Capabilities ---
     * [X] Change language
     * [X] Choose font
     * [X] Changing locale (displayed language)
     * [X] Timezone
     * [?] Display timezone information
     * [X] Custom clock style (colors, size...)
     * [X] Custom date style (colors, size...)
     */
    if (options.dataViews && options.dataViews[0]) {
      this.settings = Visual.parseSettings(
        options && options.dataViews && options.dataViews[0]
      );
      const dataView: DataView = options.dataViews[0];
      const dateValue: powerbi.PrimitiveValue = dataView.single.value;

      let updateDateObj = {};
      const dateValueString = dateValue.toString();

      // check date validity
      if (dateValueString !== this.cachedDate) {
        this.cachedDate = dateValueString;
        const date = new Date(dateValueString);
        
        // convert utc to locale for powerbi service
        const momentDate = moment(
          // date
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
          )
        );

        if (momentDate.isValid()) {
          updateDateObj['date'] = momentDate;
        } else {
          console.error(`Date field provided isn't valid: ${dateValue}`);
        }
      }

      App.update({
        settings: this.settings,
        // had date property whenever date field changed
        ...updateDateObj
      });
    } else {
      this.clear();
    }
  }

  private clear() {
    App.update(initialState);
  }

  private static parseSettings(dataView: DataView): VisualSettings {
    return VisualSettings.parse(dataView) as VisualSettings;
  }

  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   *
   */
  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }
}
