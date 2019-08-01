import * as React from 'react';
import * as moment from 'moment-timezone';

// React Components
import LandingPage from './landing-page';
import Date from './date';
import Clock from './clock';
import { VisualSettings } from '../settings';
import { FlexDirectionProperty } from 'csstype';

export interface Props {}

export interface State {
  date?: moment;
  settings: VisualSettings;
}

export const initialState: State = {
  // set default timezone to local timezone
  date: null,
  settings: new VisualSettings()
};

// old initialState date value
// moment().tz(moment.tz.guess())

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
    this.updateLocale(locale);
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
        if (this.state.date) {
          this.updateSettings(this.state.settings);
        }
      });
    };
  }

  public componentDidMount() {
    // [ ] update if there is a date field
    this.interval = setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    App.updateCallback = null;
    clearInterval(this.interval);
  }

  private tick() {
    // prevent ticking if date isn't set
    if (this.state.date) {
      // mutate state date
      this.state.date.add(1, 'second');
      // update state date
      this.setState(state => ({
        date: state.date
      }));
    }
  }

  // public componentWillUnmount() {
  //   App.updateCallback = null;
  //   clearInterval(this.interval);
  // }

  render() {
    const { help, itemsPlacement, layout } = this.state.settings.customVisualSettings;
    
    const style: React.CSSProperties = {
      justifyContent: layout,
      flexDirection: itemsPlacement as FlexDirectionProperty
    };

    // don't display datetime when no field
    if (this.state.date === null || help) {
      return <LandingPage />;
    }

    return (
      <div id="date-app-container" style={style}>
        <Clock date={this.state.date} settings={this.state.settings} />
        <Date date={this.state.date} settings={this.state.settings} />
      </div>
    );
  }
}

export default App;
