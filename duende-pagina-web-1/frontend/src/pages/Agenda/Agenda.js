import React, { Component } from 'react';
import './Agenda.css';
import {
	Inject,
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	EventSettingsModel,
} from '@syncfusion/ej2-react-schedule';

import { registerLicense } from '@syncfusion/ej2-base';

import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data' ;

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYlZQRHxeSk0SNHVRdkdgWH5fd3RVR2FYVkx2Vko=',
);

//We have received your application and created a ticket with the reference number #523297. We will validate your request within the next 48
export default class Scheduler extends Component {
	 localData: EventSettingsModel = {
		dataSource: [
			{
				EndTime: new Date(2019, 0, 11, 6, 30),
				StartTime: new Date(2019, 0, 11, 4, 0),
			},
		],
	};
remoteData = new DataManager(
	{
		url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
		adaptor: new WebApiAdaptor, 
		crossDomain: true
	});
	render() {
		return (
			<ScheduleComponent
				currentView='Month'
				selectedDate={new Date(2017, 5, 5)}
				eventSettings={ {dataSource : this.remoteData}}>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		);
	}
}
