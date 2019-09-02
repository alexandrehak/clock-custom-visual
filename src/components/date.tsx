import * as React from 'react';
import * as moment from 'moment-timezone';
import { VisualSettings } from '../settings';
import { FlexDirectionProperty } from 'csstype';

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
    let { format } = this.props.settings.dateSettings;
    // [ ] update only if format has been changed
    
    return date.format(format);
  }

  private formatTime(date) {
    const timeFormat = this.props.settings.timeSettings.format;

    return date.format(timeFormat);
  }

  render() {
    // react components bag
    const dateTime = [];

    const {
      backgroundColor,
      borderColor,
      borderRadius,
      borderStyle,
      borderWidth,
      dateTimeLayout,
      height,
      show,
      width,
    } = this.props.settings.dateTimeSettings;

    const {
      color: dateColor,
      font: dateFont,
      size: dateSize,
      show: showDate,
    } = this.props.settings.dateSettings;
    
    const {
      color: timeColor,
      font: timeFont,
      size: timeSize,
      show: showTime,
    } = this.props.settings.timeSettings;

    // check if must display datetime block
    if (!show || !showDate && !showTime) return false;

    const dateTimeStyle: React.CSSProperties = {
      width,
      height,
      borderStyle,
      borderRadius,
      borderColor,
      borderWidth,
      backgroundColor,
      flexDirection: dateTimeLayout as FlexDirectionProperty,
      justifyContent: 'space-evenly'
    };

    const timeStyle: React.CSSProperties = {
      fontSize: timeSize + 'px',
      color: timeColor,
      fontFamily: timeFont,
      // set width to 100% if flex direction is column
      width: (dateTimeLayout[0] === 'r' ? 'auto' : '100%')
    };
    
    const dateStyle: React.CSSProperties = {
      fontSize: dateSize + 'px',
      color: dateColor,
      fontFamily: dateFont,
      // set width to 100% if flex direction is column
      width: (dateTimeLayout[0] === 'r' ? 'auto' : '100%')
    };
    // COME HERE LATER
    if (showTime) {
      dateTime.push(
        <span className="datetime__time" style={timeStyle}>
          {this.formatTime(this.props.date)}
        </span>
      );
    }

    if (showDate) {
      dateTime.push(
        <span className="datetime__date" style={dateStyle}>
          {this.formatDate(this.props.date)}
        </span>
      );
    }

    return (
      <div id="datetime" style={dateTimeStyle}>
        {dateTime}
      </div>
    );
  }
}

export default Date;
