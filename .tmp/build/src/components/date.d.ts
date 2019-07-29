import * as React from 'react';
import * as moment from 'moment-timezone';
import { VisualSettings } from '../settings';
export interface Props {
    date: moment;
    settings: VisualSettings;
}
export interface State {
}
declare class Date extends React.Component<Props, State> {
    constructor(props: Props);
    private formatDate;
    private formatTime;
    render(): JSX.Element;
}
export default Date;
