import * as React from 'react'
import * as ReactDom from 'react-dom'
import { App } from "./components/App.jsx";

document.addEventListener('DOMContentLoaded', () => {
	ReactDom.render(React.createElement(App, null, null), document.querySelector('#app'));
});

