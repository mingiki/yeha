import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../partials/controls";

class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
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
                        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin , interactionPlugin]} />
                    </CardBody>
                </Card>
            </>         
        );
    }


}

export default ScheduleComponent;

