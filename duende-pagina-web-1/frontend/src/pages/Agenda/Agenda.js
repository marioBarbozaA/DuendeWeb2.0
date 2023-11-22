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
	EventSettingsModel,
	PopupOpenEventArgs,
	FieldValidationEventArgs,
} from '@syncfusion/ej2-react-schedule';

import { registerLicense } from '@syncfusion/ej2-base';

import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data' ;

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGRGfV5yd0VHYlZQRHxeSk0SNHVRdkdgWH5fd3RVR2FYVkx2Vko=',
);

//We have received your application and created a ticket with the reference number #523297. We will validate your request within the next 48
export default class Scheduler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedEventType: 'Tipo1', // Valor predeterminado
		};
	}
	 localData: EventSettingsModel = {
		dataSource: [
			{
				End: new Date(2019, 0, 11, 6, 30),
				Start: new Date(2019, 0, 11, 4, 0),
				Summary: '',
				IsAllDay: true,
				RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
				isReadonly: true,
				Type:'Tipo1'
			},
			{
				Id:2,
				End: new Date(2019, 0, 21, 8,30),
				Start: new Date(2019, 0, 21, 7, 0),
				Summary:'Entrega',
				isReadonly: true,
				Type:'Tipo2'

			}
		],
		fields: {
			subject: { name: 'Summary', default: 'No title' },
			startTime: { name:'Start'},
			endTime: { name:'End'},
			id: 'Id',
			type: 'Type', // Agregar el tipo de evento
		}
	};
	
	handleEventTypeChange = (event) => {
		this.setState({
			selectedEventType: event.target.value,
		});
	};
	handlePopupOpen = (args: PopupOpenEventArgs) => { 
        if (args.type === 'Editor' && !this.state.isEventTypeFieldAdded) { 
            const formElements = args.element.querySelector('.e-schedule-form'); 
            if (formElements) { 
				console.log("Form elements ", formElements);
                const eventTypeElement = document.createElement('select'); 
                eventTypeElement.id = 'EventType'; 
                eventTypeElement.name = 'EventType'; 
 
                const option1 = document.createElement('option'); 
                option1.value = 'Tipo1'; 
                option1.text = 'Tipo1'; 
                eventTypeElement.appendChild(option1); 
 
                const option2 = document.createElement('option'); 
                option2.value = 'Tipo2'; 
                option2.text = 'Tipo2'; 
                eventTypeElement.appendChild(option2); 
 
                eventTypeElement.value = this.state.selectedEventType; 
 
                formElements.appendChild(eventTypeElement); 
 
                this.setState((prevState) => ({ 
                    isEventTypeFieldAdded: !prevState.isEventTypeFieldAdded, 
                })); 
            } 
        } 
    }; 
	handleFieldValidation = (args: FieldValidationEventArgs) => {
		if (args.field === 'Subject' && args.value === '') {
			args.errorClass.push('e-schedule-error');
			args.errorMessage.push('Subject is required');
		}
	};
	handleEventSave = (args) => {
		// Agregar o actualizar el campo Type al evento antes de guardarlo
		args.data.Type = this.state.selectedEventType;
	
		// Lógica de guardado del evento, puedes ajustar según tus necesidades
		console.log('Evento guardado:', args.data);
	
		// Actualizar el estado para forzar una re-renderización del componente
		this.forceUpdate();
	};
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
				selectedDate={new Date(2019, 0, 11)}
				eventSettings={ this.localData}
				eventRendered={(args) => {
					//console.log(args.data);
					if (args.data.Type === 'Tipo2') {
						args.element.style.backgroundColor = 'red';
						args.element.style.color = 'white';
					}
				}}
				popupOpen={this.handlePopupOpen}
				fieldValidation={this.handleFieldValidation}
				eventSave={this.handleEventSave}>
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
			</>
		);
	}
}
