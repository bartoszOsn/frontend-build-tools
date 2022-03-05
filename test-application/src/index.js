import * as React from 'react'
import * as ReactDom from 'react-dom'

function App() {
	return React.createElement('h1', null, 'Hello!');
}

ReactDom.render(React.createElement(App, null, null), document.querySelector('#app'));
