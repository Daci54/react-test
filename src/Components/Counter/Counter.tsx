import React from "react";

interface CounterState {
  count: number;
  posts: Post[];
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class Counter extends React.Component<any, CounterState> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0, posts: [] };
  }

  fetchSomeData(): void {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response: Response) => response.json())
      .then((json: Post[]) => {
        this.setState({ posts: json });
      });
  }

  incrementCount(increment: number): void {
    this.setState((counterState: CounterState) => {
      return { count: counterState.count + increment };
    });
  }

  render() {
    return (
      <div>
        <h2>This is a counter</h2>
        <button onClick={() => this.incrementCount(1)}>Increment</button>
        <button onClick={() => this.fetchSomeData()}>Fetch</button>
        <h2>The count is {this.state.count}</h2>
        <ul>
          {this.state.posts.map((post: Post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
