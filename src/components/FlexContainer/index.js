import React, { useState, useEffect } from 'react';
import FlexImage from '../../imgs/flex.png';
import Fade from '@material-ui/core/Fade';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { ShakeVertical } from 'reshake'
import Iframe from 'react-iframe'

import './style.css';

const FlexContainer = () => {

    const [showFlex, setShowFlex] = useState(false);
    const [shake, setShake] = useState(false);
    const [taskName, setTaskName] = useState();
    const [taskSid, setTaskSid] = useState();

    useEffect(() => {
        
        const receiveMessage = ev => {

            const { event, caller, sid } = ev.data;

            if(event === "reservationCreated"){
                setTaskName(caller);
                setTaskSid(sid);
                setShake(true);
            }

            if(event === "reservationChangedFromCreated") {
                setShake(false);
                setTaskSid(null);
            }
        }

        window.addEventListener("message", receiveMessage, false);

    }, [ ]);

    const acceptTask = () => {
        setShowFlex(true);
        if(taskSid) {
            window.frames[0].postMessage({ event: "acceptTask", sid: taskSid }, "*");
        }
    }

    const rejectTask = () => {
        if(taskSid) {
            window.frames[0].postMessage({ event: "rejectTask", sid: taskSid }, "*");
        }
    }

    return (
        <div>
            <div id="flex-container">
                <Iframe title="flex" src="https://flex.twilio.com/agent-desktop/" id="flex-iframe" allow="camera; microphone" display={ showFlex ? "block" : "none" }></Iframe>
            </div>
            <div id="flex-bar">
                {taskName && shake && 
                    <div id="reservation-box">
                        {taskName}
                        <div id="accept-task" onClick={acceptTask}><CheckIcon fontSize="inherit" color="inherit" /></div>
                        <div id="reject-task" onClick={rejectTask}><CloseIcon fontSize="inherit" color="inherit" /></div>
                    </div>
                }
                <Fade in>
                    <ShakeVertical fixed active={shake}>
                        <div id="open-flex-bar" onClick={() => setShowFlex(value => !value)}>
                            {!showFlex && <img src={FlexImage} width="40" height="40" alt="flex-logo" />}
                            {showFlex && <CloseIcon fontSize="large"/>}
                        </div>
                    </ShakeVertical>
                </Fade>
            </div>
        </div>
    );
};

export default FlexContainer;