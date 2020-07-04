# react-typetool

> Type animation for React
[![NPM](https://img.shields.io/npm/v/react-typetool.svg)](https://www.npmjs.com/package/react-typetool)

React component to simulate typing. You can customize the caret by calling the caret reference.

## Install

```bash
npm install --save react-typetool
npm install react-typetool --save
```

## Usage

```jsx
import React, { Component } from 'react'
import MyComponent from 'react-typetool'
import 'react-typetool/dist/index.css'
import Typer from 'react-typetool'
class Example extends Component {
  render() {
    return <MyComponent />
    return <Typer text="Text to type." />
  }
}
```

## Properties

prop|optional|type|description|default|example
|--|--|--|--|--|--|
|`text`|yes|string|Text to type||`'Hello earthlings!'`|
|`classes`|yes|string|Classes to add to the component||`'introTyper'`|
|`stepIntervalMS`|yes|number|Time between each character|`200`|`240`|
|`blink`|yes|boolean|Should the caret blink?|`true`|`false`|
|`blinkIntervalMS`|yes|number|Time between each caret blink|`500`|`300`|
|`onFinish`|yes|callback|Gets called when the animation is finished||`() => { console.log('Done typing') }`|
|`showCaret`|yes|boolean|Should the caret be shown?|`true`|`false`|
|`getCaretRef`|yes|callback|Returns the reference to the React component||`(ref) => { console.log(ref) }`|

## License

MIT © [Thomva](https://github.com/Thomva)
