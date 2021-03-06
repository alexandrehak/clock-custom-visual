import * as moment from 'moment';
import * as React from 'react';
// import '../../style/clock.css';
import { VisualSettings } from '../settings';

export interface State {}
export interface Props {
  date: moment.Moment;
  settings: VisualSettings;
}

export class Clock extends React.Component<Props, State> {
  // private static updateCallback: (data: object) => void = null;

  // public static update(newState: State) {
  //   if(typeof Clock.updateCallback === 'function'){
  //     Clock.updateCallback(newState);
  //   }
  // }

  public componentDidUpdate() {
    // update Date only if display
    if (this.props.settings.clockSettings.show) {
      this.updateDate(this.props.date);
    }
  }

  public updateDate(date) {
    const hours = date.hours();
    const minutes = date.minutes();
    const seconds = date.seconds();

    const hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: minutes * 6
      },
      {
        hand: 'seconds',
        angle: seconds * 6
      }
    ];

    for (let i = 0; i < hands.length; i++) {
      let hand = document.getElementById(hands[i].hand);
      hand.style.transform = `rotateZ(${hands[i].angle}deg)`;
    }
  }

  render() {
    const { backgroundColor, size, hourColor, minuteColor, secondColor, show } = this.props.settings.clockSettings;
    // console.log('-------- render date --------');
    // console.log(this.state);
    const containerStyle: React.CSSProperties = {
      backgroundColor,
      width: size,
      height: size
    };

    const hourHandStyle: React.CSSProperties = {
      backgroundColor: hourColor
    };

    const minuteHandStyle: React.CSSProperties = {
      backgroundColor: minuteColor
    };

    const secondHandStyle: React.CSSProperties = {
      backgroundColor: secondColor
    };

    // check if should render
    if (!show) return false;

    return (
      <div id="clock-container" style={containerStyle}>
        <article className="clock simple">
          <div className="hours-container">
            <div id="hours" style={hourHandStyle} />
          </div>
          <div className="minutes-container">
            <div id="minutes" style={minuteHandStyle} />
          </div>
          <div className="seconds-container">
            <div id="seconds" style={secondHandStyle} />
          </div>
        </article>
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
