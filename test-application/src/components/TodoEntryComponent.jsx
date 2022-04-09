import * as React from 'react';

export function TodoEntryComponent(props) {
	const id = 'entry-checkbox-' + props.entry.index;
	const labelClass = props.entry.done ? 'line-through' : '';
	return <div className="mb-2">
		<input type="checkbox" id={id} value={props.entry.done} onInput={(e) => props.onChangeStatus && props.onChangeStatus(e.target.checked, props.entry.index)} />
		<label htmlFor={id} className={'ml-2 hover:line-through ' + labelClass}>{props.entry.description}</label>
	</div>;
}
