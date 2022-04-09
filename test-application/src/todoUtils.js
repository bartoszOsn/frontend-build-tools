import { useState } from "react";

export function useTodoEntries(startEntries) {
	const [entries, setEntries] = useState(startEntries);

	function addEntry(description, done) {
		setEntries([
			...entries,
			{ description, done, index: entries.length }
		]);
	}

	function removeEntry(index) {
		setEntries(
			entries
				.filter((val, i) => index != i)
				.map((val, i) => ({ description: val.description, done: val.done, index: i}))
		);
	}

	function setEntryStatus(index, done) {
		entries[index].done = done;
		setEntries([...entries]);
	}

	return {
		entries,
		setEntries,
		addEntry,
		removeEntry,
		setEntryStatus
	}
}
