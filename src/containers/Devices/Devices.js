import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import  Device from '../../components/Device/Device'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import axios from 'axios';
import './Devices.css';


class Devices extends Component {
	constructor()
	{
		super();
		this.state = {
			devices      : [],
			expandedRows : null
		};
		this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
	}

	componentDidMount()
	{
		const trails = axios.get("http://localhost:3000")
			.then(response => {
				this.setState({devices : response.data})
				console.log(response)
			})
	}

	rowExpansionTemplate(data)
	{
		return (
			<div className="p-grid p-fluid" style={{padding : '2em 1em 1em 1em'}}>
				<div className="p-col-12 p-md-9">
                    <Device data={data}></Device>
                </div>
            </div>
		);
	}

	render()
	{
		return (
			<div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable - Row Expansion</h1>
                        <p>A row can be expanded to display extra content by enabling expandableRows property and providing a row ng-template.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.state.devices} expandedRows={this.state.expandedRows}
							   onRowToggle={(e) => this.setState({expandedRows : e.data})}
							   rowExpansionTemplate={this.rowExpansionTemplate} dataKey="query.id.value">
                        <Column expander={true} style={{width : '2em'}}/>
                        <Column field="lastData.content.battery" header="battery"/>
                        <Column field="lastData.content.profile" header="profile"/>
                        <Column field="lastData.content.cmdAck" header="cmdAck"/>
                        <Column field="lastData.content.gpsFixAge" header="gpsFixAge"/>
                        <Column field="lastData.content.satInFix" header="satInFix"/>
                        <Column field="lastData.content.lng" header="lng"/>
                        <Column field="lastData.content.batteryLifeCount" header="batteryLifeCount"/>
                        <Column field="lastData.content.batteryLife" header="batteryLife"/>
                        <Column field="lastData.content.fCntUp" header="fCntUp"/>
                    </DataTable>
                </div>
            </div>
		);
	}
}

export default Devices;
