import React from 'react';

interface ClockProps {
  name?: string;
}

interface ClockState {
  date: Date;
}

export class Clock extends React.Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    this.state = { date: new Date() };
  }
  someTimer!: NodeJS.Timer;

  componentDidMount(): void {
    this.someTimer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick(): void {
    this.setState({ date: new Date() });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Hi {this.props.name}!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
