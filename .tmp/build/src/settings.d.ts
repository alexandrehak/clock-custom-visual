import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
export declare class VisualSettings extends DataViewObjectsParser {
    customVisualSettings: customVisualSettings;
    clockSettings: clockSettings;
    dateTimeSettings: dateTimeSettings;
}
export declare class customVisualSettings {
    layout: string;
}
export declare class dateTimeSettings {
    locale: string;
    timezone: string;
    timeFormat: string;
    dateFormat: string;
    fontFamily: string;
    dateSize: string;
    timeSize: string;
    color: string;
    backgroundColor: string;
    dateTimeLayout: string;
    width: number;
    height: number;
    border: string;
    borderRadius: string;
    display: boolean;
    displayDate: boolean;
    displayTime: boolean;
    displayInformation: boolean;
}
export declare class clockSettings {
    display: boolean;
    predefinedModel: string;
    backgroundColor: string;
    size: number;
    hourColor: string;
    minuteColor: string;
    secondColor: string;
}
