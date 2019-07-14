import * as React from 'react';
import Date from './date';
import Clock from './clock';

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
    if(typeof App.updateCallback === 'function'){
      App.updateCallback(newState);
    }
  }

  // public componentDidMount() {
  //   this.interval = setInterval(() => this.tick(), 1000);
  // }

  // public componentWillUnmount() {
  //   App.updateCallback = null;
  //   clearInterval(this.interval);  
  // }

  render() {
    return (
      <>
        <Clock />
        <Date />
      </>
    );
  }
}

export default App;
