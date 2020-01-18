import React, { Component } from 'react';
import Device from '../../components/Device/Device';
import axios from 'axios';
import './Devices.css';

class Devices extends Component {
	constructor() {
		super();
		this.state = {
			devices: [],
			layout: 'list'
		};
	}
    componentDidMount() {
		const trails = axios.get("http://localhost:3000")
            .then(response => {
                this.setState({devices: response.data})
                console.log(response)
            })
	}
    render () {
		const devices = this.state.devices.map((device) =>
            <Device data={device.lastData.content} key={device.query.id.value}>{device.lastData.content.battery}</Device>
		)
        console.log(this.state.devices[0])
        return (
            <div>
                <section className="Devices">
                    {devices}
                </section>
            </div>
        );
    }
}

export default Devices;
