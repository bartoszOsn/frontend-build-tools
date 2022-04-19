import * as React from 'react';
import { TodoEntryComponent } from "./TodoEntryComponent.jsx";
import { useTodoEntries } from "../todoUtils";
import { useState } from "react";

export function AppComponent() {
	const [newEntryDesc, setNewEntryDesc] = useState('');

	const entries = useTodoEntries([]);
	const progress = Math.round(entries.entries.filter(entry => entry.done).length / entries.entries.length * 100);

	return (
		<div>
			<h1>TODO list</h1>
			{
				entries.entries.map(entry => <TodoEntryComponent key={entry.index} entry={entry} onChangeStatus={(newStatus, index) => entries.setEntryStatus(index, newStatus)} />)
			}
			{
				!!entries.entries.length && (
					<div className='my-4'>
						Progress: {progress}%
					</div>
				)
			}
			<div>
				<input key="input" value={newEntryDesc} className='p-1' placeholder='Task name' onInput={(e) => setNewEntryDesc(e.target.value)} />
				<button key="button" className='ml-2' onClick={() => entries.addEntry(newEntryDesc, false)}>Add</button>
			</div>
		</div>
	)
}
