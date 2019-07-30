import * as React from 'react';
import '../../style/landing-page.css';

export interface Props {}

export interface State {}

class LandingPage extends React.Component<Props, State> {
  render() {
    return (
      <div id="landing-page">
        <h1 id="landing-page__title">Clock and DateTime Custom Visual</h1>
        <main id="landing-page__main">
          <section id="landing-page__main__how-it-works">
            <h2>How it works ?</h2>
            <p id="landing-page__main__how-it-works__p">
              You need to provide a date field.
            </p>
          </section>
          <section id="landing-page__main__support">
            <address>
              <p>Support link</p>
            </address>
            <p>This custom visual is totally free to use.</p>
          </section>
        </main>
      </div>
    );
  }
}

export default LandingPage;
