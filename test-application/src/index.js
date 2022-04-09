import * as React from 'react'
import * as ReactDom from 'react-dom'
import { AppComponent } from "./components/AppComponent.jsx";

document.addEventListener('DOMContentLoaded', () => {
	ReactDom.render(React.createElement(AppComponent, null, null), document.querySelector('#app'));
});

