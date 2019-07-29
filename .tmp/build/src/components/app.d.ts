import * as React from 'react';
import * as moment from 'moment-timezone';
import { VisualSettings } from '../settings';
export interface Props {
}
export interface State {
    date?: moment;
    settings: VisualSettings;
}
export declare const initialState: State;
declare class App extends React.Component<Props, State> {
    constructor(props: Props);
    private setDate;
    private static updateCallback;
    static update(newState: State): void;
    updateSettings(settings: any): void;
    private updateTimezone;
    private updateLocale;
    state: State;
    interval: number;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private tick;
    render(): JSX.Element;
}
export default App;
