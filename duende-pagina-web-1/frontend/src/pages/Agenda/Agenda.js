import React, { useEffect, useState, useRef } from 'react';
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
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import axios from 'axios';

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYlZQRHxeSk0SNHVRdkdgWH5fd3RVR2FYVkx2Vko=',
);

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


const Scheduler = () => {
	const scheduleObj = useRef(null);
	// create const use state event type and setEventType

	const [eventTypes, setEventTypes] = useState({});

	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get('http://localhost:3500/appointments/getAll'); 
			setLocalData(response.data); // Asigna los datos obtenidos a localData
		  } catch (error) {
			console.error('Error al obtener datos de la API:', error);
		  }
		};
	
		fetchData(); // Llama a la función fetchData al montar el componente
	  }, []); // El segundo argumento del useEffect ([]) asegura que la llamada se realice solo una vez al montar el componente

	// initialize eventTypes with initial event types from localData
	useEffect(() => {
		const initialEventTypes = {};
		localData.forEach(event => {
			initialEventTypes[event.Id] = event.EventType || 'Otro';
		});
		setEventTypes(initialEventTypes);
	}, [localData]);


	const fieldsData = {
		id: 'Id',
		subject: { name: 'Subject', validation: { required: true } },
		type: { name: 'EventType', validation: { required: true } },
		details: { name: 'Details', validation: { required: true } },
		startTime: { name: 'StartTime', validation: { required: true } },
		endTime: { name: 'EndTime', validation: { required: true } },
		CustomerName: { name: 'CustomerName' },
		ReferenceService: { name: 'ReferenceService' },
		OrderNumber: { name: 'OrderNumber' },
		DeliveryCustomerName: { name: 'DeliveryCustomerName' },
	};
	const onDragStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};

	const onResizeStart = args => {
		//args.scroll = { enabled: false };
		args.interval = 10;
	};
	const Cita = props => {
		console.log('Cita props', props);
		console.log(Object.keys(props).length);

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
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
							></DropDownListComponent>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Nombre del Cliente</td>
						<td>
							<input
								id='CustomerName'
								name='CustomerName'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Imagen de Referencia</td>
						<td>
							<input
								id='ReferenceService'
								name='ReferenceService'
								type='text' // Puedes cambiar esto según tus necesidades
								className='e-field e-input'
							/>
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
						<td className='e-textlabel'>Detalles</td>
						<td>
							<input
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
	const Entrega = props => {
		console.log('Entrega props', props);
		console.log(Object.keys(props).length);

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
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
							></DropDownListComponent>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Número de Pedido</td>
						<td>
							<input
								id='OrderNumber'
								name='OrderNumber'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>

					<tr>
						<td className='e-textlabel'>Nombre del Cliente</td>
						<td>
							<input
								id='DeliveryCustomerName'
								name='DeliveryCustomerName'
								type='text'
								className='e-field e-input'
							/>
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
						<td className='e-textlabel'>Detalles</td>
						<td>
							<input
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
	const Otra = props => {
		console.log('Otra props', props);
		console.log(Object.keys(props).length);
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
								value={eventTypes[props.Id]}
								className='e-field'
								enabled={
									Object.keys(props).length <= 0 ||
									Object.keys(props).length == 3
								}
								change={e => {
									setEventTypes(prevEventTypes => ({
										...prevEventTypes,
										[props.Id]: e.value,
									}));
								}}
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
						<td className='e-textlabel'>Detalles</td>
						<td>
							<input
								id='Details'
								name='Details'
								type='text'
								className='e-field e-input'
							/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	};
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
				eventSettings={{
					dataSource: localData,
					//template: this.eventTemplate.bind(this),
					fields: fieldsData,
				}}
				dragStart={onDragStart}
				resizeStart={onResizeStart}
				showQuickInfo={false}
				editorTemplate={props =>
					eventTypes[props.Id] === 'Cita'
						? Cita(props)
						: eventTypes[props.Id] === 'Entrega'
						? Entrega(props)
						: Otra(props)
				}
				eventRendered={props => {
					const eventType = props.data.EventType;

					let color = '';
					switch (eventType) {
						case 'Cita':
							color = 'rgba(25, 130, 196, 0.3)'; // Azul con menos opacidad
							break;
						case 'Entrega':
							color = 'rgba(255, 206, 86, 0.3)'; // Amarillo con menos opacidad
							break;
						default:
							color = 'rgba(106, 76, 147, 0.3)'; // Púrpura con menos opacidad
					}

					props.element.style.backgroundColor = color;
					props.element.style.border = `1px solid ${color.replace('0.3', '1')}`; // Borde con opacidad completa
					props.element.style.color = 'black';
				}}
			>
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
					<ViewDirective option='Agenda'></ViewDirective>
				</ViewsDirective>

				<Inject
					services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
				/>
			</ScheduleComponent>
		</>
	);
};
export default Scheduler;
