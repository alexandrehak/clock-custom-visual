import * as React from 'react';
import * as moment from 'moment-timezone';
import { VisualSettings } from '../settings';

export interface Props {
  date: moment;
  settings: VisualSettings;
}

export interface State {}

class Date extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  

  private formatDate(date) {
    let formattedDate;
    let formattedString;
    let { yearFormat, separator, dateFormat } = this.props.settings.dateTimeSettings;

    // [ ] update only if format has been changed
    // check if is date
    if (dateFormat.length === 3) {
      let splittedDate = dateFormat.split('');
      // get year
      let dateFormatObj = {
        y: yearFormat,
        m: 'MM',
        d: 'DD'
      };
      // console.log(this.props.settings.dateTimeSettings);
      // console.group('%c testing time formatting');
      
      // date.locale('en-US')
      // console.log('LT', date.format('LT'));
      // console.log('LTS', date.format('LTS'));
      // console.log('L', date.format('L'));
      // console.log('LL', date.format('LL'));
      // console.log('LLL', date.format('LLL'));
      // console.log('LLLL', date.format('LLLL'));
      
      // console.groupEnd();
      let first = dateFormatObj[splittedDate[0]];
      let second = dateFormatObj[splittedDate[1]];
      let third = dateFormatObj[splittedDate[2]];
      // [ ] check LLL
      formattedString = date.format(first + separator + second + separator + third);
      // console.log('final result', date.format(first + separator + second + separator + third))      
      // console.log('splittedDate', splittedDate);
      // console.log(date.format('YYYY/MM/DD'), splittedDate);
      // console.log('local2', date.locale('fr'));
      // console.log('local3', date.format('YYYY MMMM'));
      
    } else {
      // Local Format was chosen
      formattedString = dateFormat;
    }

    // let format = `${separator}`;
    // if (date.format()) {

    // }
    // console.log(formattedString);
    
    return date.format(formattedString);
  }

  private formatTime(date) {
    let timeFormat = this.props.settings.dateTimeSettings.timeFormat;
    // console.log('%c time formattting', 'color: cyan');
    // console.log(date.format(timeFormat));
    
    return date.format(timeFormat);
  }

  render() {
    let dateTime = [];
    let {backgroundColor, border, borderRadius, displayDate, displayTime, color, fontFamily, fontSize, alignment} = this.props.settings.dateTimeSettings;
    
    const myStyle: React.CSSProperties = {
      backgroundColor,
      color,
      fontFamily,
      fontSize: fontSize + "px",
      textAlign: alignment as 'center'
      // textAlign: alignment
    };

    if (displayDate) {
        dateTime.push(<span className="datetime__date">{this.formatDate(this.props.date)}</span>)
    }

    if (displayTime) {
        dateTime.push(<span className="datetime__time">{this.formatTime(this.props.date)}</span>)
    }

    return (
      <p id="datetime" style={myStyle}>
        {dateTime}
      </p>
    );
  }
}

export default Date;
