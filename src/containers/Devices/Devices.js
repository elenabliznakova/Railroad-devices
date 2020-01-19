import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import  Device from '../../components/Device/Device'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Moment from 'react-moment';
import 'moment-timezone';

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

	actionTemplate(rowData, column) {
		const dateToFormat =rowData.lastData.timeReceived;

		return <div>
            <Moment>{dateToFormat}</Moment>
        </div>;
	}

	render()
	{
		return (
			<div className="page-wrapper">
                <div className="content-section introduction table-title">
                    <div className="feature-intro">
                        <h1>Railroad devices</h1>
                        <p>A row can be expanded to display extra content.</p>
                    </div>
                </div>

                <div className="content-section implementation table-wrapper">
                    <DataTable value={this.state.devices} expandedRows={this.state.expandedRows}
							   onRowToggle={(e) => this.setState({expandedRows : e.data})}
							   rowExpansionTemplate={this.rowExpansionTemplate} dataKey="query.id.value"
							   responsive={true}
							   paginator={true}
							   rows={20} rowsPerPageOptions={[5,10,20]}>
                        <Column expander={true} className="expander-column"/>
                        <Column field="lastData.content.messageType" header="messageType" filter={true} sortable={true} filterPlaceholder="Search"/>
						<Column field="lastData.content.meta.barrierId" header="barrierId" filter={true} sortable={true} filterPlaceholder="Search"/>
                        <Column field="lastData.content.battery" header="battery" filter={true} sortable={true} filterPlaceholder="Search"/>
                        <Column field="lastData.content.gpsFixAge" header="gpsFixAge" filter={true} sortable={true} filterPlaceholder="Search"/>
                        <Column field="lastData.content.satInFix" header="satInFix" filter={true} sortable={true}filterPlaceholder="Search"/>
                        <Column field="lastData.content.lat" header="lat" filter={true} sortable={true} filterPlaceholder="Search"/>
                        <Column field="lastData.content.lng" header="lng" filter={true} sortable={true} filterPlaceholder="Search"/>
                        <Column field="lastData.timeReceived" body={this.actionTemplate} sortable={true} header="timeReceived" filter={true} filterPlaceholder="Search"/>
                        <Column field="lastData.timeSet" body={this.actionTemplate} sortable={true} header="timeSet" filter={true} filterPlaceholder="Search"/>
                        <Column field="lastData.content.fCntUp" header="fCntUp" filter={true} sortable={true} filterPlaceholder="Search"/>
                    </DataTable>
                </div>
            </div>
		);
	}
}

export default Devices;
