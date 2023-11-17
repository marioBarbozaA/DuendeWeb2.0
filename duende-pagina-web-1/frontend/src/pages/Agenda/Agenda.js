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
} from '@syncfusion/ej2-react-schedule';
export default class Scheduler extends Component {
	render() {
		return (
			<ScheduleComponent>
				<lnject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		);
	}
}
