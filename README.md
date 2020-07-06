# react-typetool

> Type animation for React

[![NPM](https://img.shields.io/npm/v/react-typetool.svg)](https://www.npmjs.com/package/react-typetool)

React component to simulate typing. You can customize the caret by calling the caret reference.

## Install

```bash
npm install react-typetool --save
```

## Usage

```jsx
import React, { Component } from 'react';
import Typer from 'react-typetool';

class App extends Component {
  render() {
    return <Typer text="Text to type." />
  }
}
```

## Properties

prop|optional|type|description|default|example
|--|--|--|--|--|--|
|`text`|yes|string|Text to type||`'Hello earthlings!'`|
|`classes`|yes|string|Classes to add to the component||`'introTyper'`|
|`useDefaultStyle`|yes|boolean|Apply default style? (Set false to style with your own CSS) |`true`|`false`|
|`startStep`|yes|number|Index of string character to start from|`0`|`5`|
|`stepIntervalMS`|yes|number|Time between each character in milliseconds|`200`|`240`|
|`blink`|yes|boolean|Should the caret blink?|`true`|`false`|
|`blinkIntervalMS`|yes|number|Time between each caret blink in milliseconds|`500`|`300`|
|`onStart`|yes|callback|Gets called when the animation starts||`() => { console.log('Started typing') }`|
|`onFinish`|yes|callback|Gets called when the animation is finished||`() => { console.log('Done typing') }`|
|`showCaret`|yes|boolean|Should the caret be shown?|`true`|`false`|
|`getCaretRef`|yes|callback|Returns the reference to the React component||`(ref) => { console.log(ref) }`|
|`loop`|yes|boolean|Should the animation loop?|`false`|`true`|
|`loopIntervalMS`|yes|number|Time between end of animation and start of next loop in milliseconds|`2000`|`500`|
|`replay`|yes|boolean|Replay loop? (Change to false in onStart for best results)|`false`|`true`|
|`startInstantly`|yes|boolean|Should the animation begin instantly?|`false`|`true`|

## License

MIT © [Thomva](https://github.com/Thomva)
