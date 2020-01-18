import React from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

import './Device.css';

const device = (props) => {
    const message = props.data.messageType
	return (
		<article className="Device">
        <div>{props.data.messageType}</div>
        <div>{props.data.battery}</div>

    </article>
	)
}
export default device;
