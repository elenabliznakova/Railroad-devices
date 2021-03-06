import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import './Device.css';

class Device extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			visible  : false,
			children : ''
		};
		this.onHide = this.onHide.bind(this);
		this.checkDetails = this.checkDetails.bind(this);
		this.list = this.props.data.lastData.content
		this.showProps = Object.keys(this.list).map((key, i) => {
			if (typeof this.list[key] == "object") {
				return (
					<li key={i}>
						<span className="input-label"> <strong>{key}</strong></span>
						<a className="show-label" onClick={(e) => this.checkDetails(key, this.list[key])}>Show more details</a>
					</li>
				)
			} else {
				return (
					<li key={i}>
						<span className="input-label"> <strong>{key}</strong>:</span>
						<span className="input-label"> {this.list[key]}</span>
					</li>
				)
			}
		})
	}

	checkDetails = (prop, value) => {
		let detailsArr = [];
		let detailsObj = false;
		let children;
		switch(prop) {
			case 'barrierMessageBatch':
				detailsArr = value.messages;
				break;
			case 'barrierOpenCloseTimeBatch':
				detailsArr = value.proRailBarrierOpenCloseTime;
				break;
			case 'meta':
				detailsObj=true;
				break;
			default:
				detailsArr = [];
		}
		if(detailsObj == true){
			children = Object.keys(value).map((key, i) => {
				return (
					<li key={i}>
						<span className="input-label"> {key} : {value[key]}</span>
					</li>
				)
			})
		} else {
			children = detailsArr.map(function (item) {
				return Object.keys(item).map((key, i) => {
					return (
						<li key={i}>
							<span className="input-label"> {key} : {item[key]}</span>
						</li>
					)
				})
			})
		}
		this.setState({
			children : children,
			visible: true
		})
	}

	onHide()
	{
		this.setState({visible : false});
	}

	render()
	{
		return (
			<div>
				<ul className="table-details-list">
				{this.showProps}
				</ul>
				<div className="content-section implementation">
					<Dialog header="Details" visible={this.state.visible} style={{width : '50vw'}}
							onHide={this.onHide} maximizable>
						<ul className="table-details-list">
							{this.state.children}
						</ul>
					</Dialog>
				</div>
			</div>
		)
	}
}

export default Device;
