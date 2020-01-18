import React from 'react';
import './Device.css';

const device = (props) => {
	const message = props.data.messageType
	console.log(props.data.lastData.content)
	const subjects = props.data.lastData.content
	return (
		<div className='gameStatistics'>
			{Object.keys(subjects).map((keyName, i) => (
				<li className="travelcompany-input" key={i}>
					<span className="input-label"> Name: {keyName} Value: {subjects[keyName]}</span>
				</li>
			))}
		</div>
	)
}
export default device;
