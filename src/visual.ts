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
    // console.group('%c Testing window','color: cyan');
    // console.log('HAHAHAH', test);
    // console.log(window);
    // console.log(visualIframe);
    // console.log('%c HELLLO WORLD', 'font-size: 40px');
    
    // console.groupEnd();

    // try editing sandbox rules
    
    // testing
    // this.target.appendChild(this.createMap());
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

  public createMap() {
    let googleMapUrl = 'https://maps.google.com/maps?f=q&source=s_q&q=buenos+aires&sll=37.0625,-95.677068&sspn=38.638819,80.859375&t=h&hnear=Buenos+Aires,+Argentina&z=11&ll=-34.603723,-58.381593&output=embed';
    // let cheatUrl = 'https://wesbos-playground--alexandrehak.repl.co';
    let mapUrl = 'https://www.geoportail.gouv.fr/embed/visu.html?c=4.840049084742342,21.060286036654347&z=3&l0=ORTHOIMAGERY.ORTHOPHOTOS:WMTS(1)&l1=HYDROGRAPHY.HYDROGRAPHY:WMTS(1)&permalink=yes';
    // let mapUrl2 = 'https://www.geoportail.gouv.fr/embed/visu.html?c=4.840049084742342,21.060286036654347&z=3&l0=ORTHOIMAGERY.ORTHOPHOTOS:WMTS(1)&l1=HYDROGRAPHY.HYDROGRAPHY:WMTS(1)&permalink=yes';
    // let mapUrl3 = "https://www.geoportail.gouv.fr/carte?c=2.630778396286878,47.60731445770401&z=7&l0=OPEN_STREET_MAP::GEOPORTAIL:OGC:WMTS(0.85)&l1=HYDROGRAPHY.HYDROGRAPHY:WMTS(1)&permalink=yes";
    let iframe = document.createElement('iframe');
    iframe.width = '600';
    iframe.height = '400';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.marginHeight = '0';
    iframe.marginWidth = '0';
    // testing
    iframe.sandbox.toggle('allow-scripts');
    iframe.sandbox.toggle('allow-same-origin');
    // iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin');
    // iframe.setAttribute('crossorigin', 'anonymous');
    iframe.src = mapUrl;
    iframe.allowFullscreen = true;
    return iframe;
  }

  public update(options: VisualUpdateOptions) {
    /**
     * [ ] Rename visual (pbiviz.json)
     * [ ] Visual landing page
     * [?] Add Date filering
     * [X] Display date given as a field when it is provided
     * [?] Support bookmark
     * [?] Support others pbi features
     * [X] display measure value instead of default "no field value"
     * [?] Change tick functionality / new instance of moment.js each second ?
     * [?] Support more language, date format...
     * [ ] Remove unused folder (git remove)
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
      // console.group('%c Update', 'color: cyan');
      // console.log(this.settings);
      // const {dateFormat, timeFormat} = this.settings.dateTimeSettings;
      // console.log('dateFormat', dateFormat.toUpperCase());
      // console.log('And I want this', ' LL');
      // console.log('-----------------------------------');
      // console.log('timeFormat', timeFormat.toUpperCase());
      // console.log('And I want this', ' LTS');

      let updateDateObj = {};
      const dateValueString = dateValue.toString();

      // check date validity
      if (dateValueString !== this.cachedDate) {
        this.cachedDate = dateValueString;
        const date = new Date(dateValueString);
        // convert utc to locale for powerbi service
        const momentDate = moment(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
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
