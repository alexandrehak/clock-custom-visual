import * as moment from "moment";
import * as React from 'react';
import '../../style/clock.css';

export interface State {
  date?: moment.Moment,
  textLabel: string,
  textValue: string,
  size: number
}

export const initialState: State = {
  // replace with moment.js object
  date: moment(),
  textLabel: "",
  textValue: "",
  size: 200
}

export class Clock extends React.Component<{}, State>{
  constructor(props: any) {
    super(props);
    this.state = initialState;
    console.log('initial state', this.state);
    
  }

  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
    if(typeof Clock.updateCallback === 'function'){
      Clock.updateCallback(newState);
    }
  }

  private tick() {
    // mutate state date
    this.state.date.add(1, 'second');
    // update state date
    this.setState(state => ({
      date: state.date
    }), this.setDate);
  }

  public state: State = initialState;
  public interval: number = null;

  public setDate() {
    // select hand
    // $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s");
    // hand.setAttribute('style', `animation-delay: ${left * -1 }s`) 
    const hours = ((this.state.date.hours() + 11) % 12 + 1);
    const minutes = this.state.date.minutes();
    const seconds = this.state.date.seconds();

    const hoursDegrees = hours * 30;
    const minutesDegrees = minutes * 6;
    const secondsDegrees = seconds * 6;
    // console.log(document.querySelector('.hour').setAttribute('data', 'hello worlds'));
    document.getElementById('hour').style.transform = `rotate(${hoursDegrees}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minutesDegrees}deg)`;
    document.getElementById('second').style.transform = `rotate(${secondsDegrees}deg)`;
    // document.('.hour'). 
    // document.querySelector('.hour').setAttribute('style', `tranform: rotate(${hoursDegrees}deg)`);
    // document.querySelector('.minutes').setAttribute('style', `tranform: rotate(${minutesDegrees}deg)`);
    // document.querySelector('.seconds').setAttribute('style', `tranform: rotate(${secondsDegrees}deg)`);
  }

  public componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  public componentWillMount() {
    // this.state.date.clone.add(1, 'second').format();
    // update state
    Clock.updateCallback = (newState: State): void => { this.setState(newState); };
  }

  public componentWillUnmount() {
    Clock.updateCallback = null;
    clearInterval(this.interval);  
  }

  render() {
    const { textLabel, textValue, size } = this.state;

    const style: React.CSSProperties = { width: size, height: size };
    // console.log('-------- render date --------');
    // console.log(this.state);
    
    return (
      <div className="clock">
        <div className="wrap">
          <span className="hour" id="hour"></span>
          <span className="minute" id="minute"></span>
          <span className="second" id="second"></span>
          <span className="dot"></span>
        </div>
      </div>
      // <div classNameName="circleCard" style={style}>
      //   <p>
      //     <em>{this.state.date.format('LTS')}</em>
      //   </p>
      // </div>
    );
  }
}

export default Clock;
