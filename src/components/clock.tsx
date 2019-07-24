import * as moment from "moment";
import * as React from 'react';
import '../../style/clock.css';
import { VisualSettings } from "../settings";

export interface State {};
export interface Props {
  date: moment.Moment,
  settings: VisualSettings
};

export class Clock extends React.Component<Props, State>{
  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
    if(typeof Clock.updateCallback === 'function'){
      Clock.updateCallback(newState);
    }
  }

  public componentDidUpdate() {
    this.updateDate(this.props.date);
  }

  public updateDate(date) {
    // select hand
    // $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s");
    // hand.setAttribute('style', `animation-delay: ${left * -1 }s`) 
    const hours = ((date.hours() + 11) % 12 + 1);
    const minutes = date.minutes();
    const seconds = date.seconds();

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

  render() {
    const {backgroundColor} = this.props.settings.clockSettings;
    // console.log('-------- render date --------');
    // console.log(this.state);
    const myStyle: React.CSSProperties = {
      backgroundColor
    }
    
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
