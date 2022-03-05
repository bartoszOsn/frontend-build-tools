import * as React from 'react';
import { TodoEntry } from "./TodoEntry.jsx";

export function App() {
	const todoList = ['clean room', 'do the dishes', 'sleep'];
	return (
		<div>
			<h1>TODO list</h1>
			{
				todoList.map(entry => <TodoEntry />)
			}
		</div>
	)
}
