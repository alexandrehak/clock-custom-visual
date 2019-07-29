import * as moment from 'moment';
import * as React from 'react';
import { VisualSettings } from '../settings';
export interface State {
}
export interface Props {
    date: moment.Moment;
    settings: VisualSettings;
}
export declare class Clock extends React.Component<Props, State> {
    componentDidUpdate(): void;
    updateDate(date: any): void;
    render(): any[] | JSX.Element;
}
export default Clock;
