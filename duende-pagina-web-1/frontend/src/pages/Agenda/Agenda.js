import React, { Component } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Logo from '../../Imagenes/Logo-Duende.png';
import './Agenda.css';
import {
	Inject,
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	ViewsDirective,
	ViewDirective,
	DragAndDrop,
	Resize,
	ResourcesDirective,
	ResorceDirective,
	ResourceDirective,
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYlZQRHxeSk0SNHVRdkdgWH5fd3RVR2FYVkx2Vko=',
);
let localData = [
	{
		Id: 1,
		Subject: 'plug de tierrosa',
		EventType: 'Entrega',
		StartTime: new Date(2023, 10, 17, 6, 0),
		EndTime: new Date(2023, 10, 17, 7, 0),
		Location: 'Chepe Centro',
	},
	{
		Id: 2,
		Subject: 'Maquillaje de Tierrosa',
		EventType: 'Cita',
		StartTime: new Date(2023, 10, 16, 6, 0),
		EndTime: new Date(2023, 10, 16, 7, 0),
		Location: 'Chepe Centro',
	},
];
L10n.load({
	'en-US': {
		schedule: {
			saveButton: 'Guardar',
			cancelButton: 'Cerrar',
			deleteButton: 'Eliminar',
			newEvent: 'Añadir Evento',
		},
	},
});
export default class Scheduler extends Component {
	onDragStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};

	onResizeStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};

	editorWindowTemplate(props) {
		return (
			<table className='custom-event-editor'>
				<tbody>
					<tr>
						<td className='e-textlabel'>Evento</td>
						<td>
							<input
								id='Summary'
								name='Subject'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Tipo</td>
						<td>
							<DropDownListComponent
								id='EventType'
								dataSource={['Entrega', 'Cita', 'Otro']}
								placeholder='Escoge el tipo'
								data-name='EventType'
								value={props.EventType || null}
								className='e-field'
							></DropDownListComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>De</td>
						<td>
							<DateTimePickerComponent
								id='StartTime'
								data-name='StartTime'
								value={new Date(props.startTime || props.StartTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Hasta</td>
						<td>
							<DateTimePickerComponent
								id='EndTime'
								data-name='EndTime'
								value={new Date(props.endTime || props.EndTime)}
								format='dd/MM/yy hh:mm a'
								className='e-field'
							></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className='e-textlabel'>Localidad</td>
						<td>
							<input
								id='Location'
								name='Location'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
	resourceDataSource = [
		{ Id: 1, Name: 'Cita', Color: '#ea7a57' },
		{ Id: 2, Name: 'Entrega', Color: '#357CD2' },
		{ Id: 3, Name: 'Otro', Color: '#7fa9ee' },
	];

	render() {
		return (
			<>
				<NavBar
					imagen={Logo}
					pathMain='MainPageAdmin'
					pathCarrito='CarritoDeCompras'
					pathCuenta='CuentaAdmin'
					pathGaleria='GalleryAdmin'
					pathTienda='MainPageEcomerceAdmin'
					mostrarCarrito={false}
				/>

				<ScheduleComponent
					currentView='Month'
					eventSettings={{ dataSource: localData }}
					dragStart={this.onDragStart.bind(this)}
					resizeStart={this.onResizeStart.bind(this)}
					editorTemplate={this.editorWindowTemplate.bind(this)}
				>
					<ResourcesDirective>
						<ResourceDirective
							field='Id'
							title='Nombre Tipo'
							name='Tipo'
							textField='Name'
							idFie1d='Id '
							colorFie1d='Color'
							dataSource={this.resourceDataSource}
						></ResourceDirective>
					</ResourcesDirective>
					<ViewsDirective>
						<ViewDirective
							option='Day'
							startHour='01:00'
							interval={3}
						></ViewDirective>
						<ViewDirective option='Week'></ViewDirective>
						<ViewDirective
							option='Month'
							showWeekNumber={true}
							isSelected={true}
						></ViewDirective>
						<ViewDirective option='WorkWeek'></ViewDirective>
						<ViewDirective option='Agenda'></ViewDirective>
					</ViewsDirective>

					<Inject
						services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
					/>
				</ScheduleComponent>
			</>
		);
	}
}
