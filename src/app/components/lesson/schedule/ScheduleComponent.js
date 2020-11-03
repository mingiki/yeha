import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";
import timelinePlugin from "@fullcalendar/timeline";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../partials/controls";

class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        };
    }

    componentDidMount () {
    }


    render() {
        return (
            <>  
                
                <Card>
                    <CardHeader title="스케줄">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>
                        <FullCalendar 
                        defaultView="dayGridMonth" 
                        themeSystem="bootstrap"
                        editable={true}
                        navLinks={true}
                        views={{
                            dayGridMonth: { buttonText: 'month' },
                            timeGridWeek: { buttonText: 'week' },
                            timeGridDay: { buttonText: 'day' }
                        }}
                        plugins={[ dayGridPlugin , interactionPlugin , bootstrapPlugin , listPlugin , timelinePlugin , resourceTimelinePlugin]} />
                    </CardBody>
                </Card>
            </>         
        );
    }


}

export default ScheduleComponent;

