import * as React from 'react';
import * as moment from 'moment-timezone';

// React Components
import Date from './date';
import Clock from './clock';
import { VisualSettings } from '../settings';

export interface Props {}

export interface State {
  date?: moment;
  settings: VisualSettings;
}

export const initialState: State = {
  // set default timezone to local timezone
  date: moment().tz(moment.tz.guess()),
  settings: new VisualSettings()
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private setDate() {
    const hours = ((this.state.date.hours() + 11) % 12) + 1;
    const minutes = this.state.date.minutes();
    const seconds = this.state.date.seconds();

    const hoursDegrees = hours * 30;
    const minutesDegrees = minutes * 6;
    const secondsDegrees = seconds * 6;

    document.getElementById(
      'hour'
    ).style.transform = `rotate(${hoursDegrees}deg)`;
    document.getElementById(
      'minute'
    ).style.transform = `rotate(${minutesDegrees}deg)`;
    document.getElementById(
      'second'
    ).style.transform = `rotate(${secondsDegrees}deg)`;
  }

  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
    if (typeof App.updateCallback === 'function') {
      App.updateCallback(newState);
    }
  }

  public updateSettings(settings): void {
    let { timezone, locale } = settings.dateTimeSettings;
    // check if settings has change
    // console.log('inside update settings', settings);
    // this.state.date.tz('America/Los_Angeles');
    // console.log('%c COMPARING', 'color: red; font-size: 20px');
    // console.log('state', this.state.date);
    this.updateLocale(locale);
    // timezone
    this.updateTimezone(timezone);
  }

  private updateTimezone(timezone): void {
    let localTimezone = moment.tz.guess(Boolean);
    let isDifferentTimeZone = timezone != this.state.date.tz();

    if (isDifferentTimeZone) {
      // set new timezone
      // https://momentjs.com/timezone/docs/#/using-timezones/converting-to-zone/
      // check timezone existence
      if (moment.tz.zone(timezone)) {
        // mutate react state
        this.state.date.tz(timezone);

        this.setState(prevState => {
          date: prevState.date;
        });
      } else if (timezone === 'Local/Timezone' && timezone !== localTimezone) {
        // mutate react state
        this.state.date.tz(localTimezone);

        this.setState(prevState => {
          date: prevState.date;
        });
      } else {
        console.error(`${timezone} doesn't exit.`);
      }
    }
  }

  private updateLocale(locale): void {
    // update if necessary
    if (this.state.date.locale() !== locale) {
      let date = this.state.date.locale(locale);

      this.setState(() => {
        date;
      });
    }
  }

  public state: State = initialState;
  // cache setInterval return value
  public interval: number = null;

  public componentWillMount() {
    App.updateCallback = (newState: State): void => {
      this.setState(newState, () => {
        // wait for state to be update
        this.updateSettings(this.state.settings);
      });
    };
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    App.updateCallback = null;
    clearInterval(this.interval);
  }

  private tick() {
    // mutate state date
    this.state.date.add(1, 'second');
    // update state date
    this.setState(state => ({
      date: state.date
    }));
  }

  // public componentWillUnmount() {
  //   App.updateCallback = null;
  //   clearInterval(this.interval);
  // }

  render() {
    const { layout } = this.state.settings.customVisualSettings;

    const style: React.CSSProperties = {
      justifyContent: layout
    };

    return (
      <div id="date-app-container" style={style}>
        <Clock date={this.state.date} settings={this.state.settings} />
        <Date date={this.state.date} settings={this.state.settings} />
      </div>
    );
  }
}

export default App;
