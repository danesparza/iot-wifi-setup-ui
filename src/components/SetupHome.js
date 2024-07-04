import React, { useState } from "react";

import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import Loading from "./common/Loading";

//  Data services
import {
   useGetWifiAPsQuery
} from '../services/iot-wifi-setup'

function SetupHome() {

    //  Fetch access points
    const stdOptions = {
        pollingInterval: 60000, /* Check every minute */
    }

    //  State hooks
    const [selectedAP, setSelectedAP] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    //  Redux hooks
    const { data: apData , isLoading: apsLoading} = useGetWifiAPsQuery("",stdOptions);

    //  If we're not done loading, show the loading indicator
    if(apsLoading) {
        return (
            <Loading
                apsLoaded={!apsLoading}
            />
        );
    }

    const selectedAPTemplate = (option, props) => {
        if (option) {
            let itemClass = "";

            if(option.Security === "") {
                itemClass = "pi pi-lock-open";
            }
            return (
                <div className="flex align-items-center">
                    <div>{option.SSID}</div>
                    &nbsp;&nbsp;<span className={`${itemClass}`} style={{ width: '18px' }} />
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const apOptionTemplate = (option) => {
        let itemClass = "";

        //  If the ap item has security, show a lock
        if(option.Security === "") {
            itemClass = "pi pi-lock-open";
        }
        return (
            <div className="flex align-items-center">
                <div>{option.SSID}</div>
                &nbsp;&nbsp;<span className={`${itemClass}`} style={{width: '18px'}}/>
            </div>
        );
    };

    const handlePasswordDisplay = (selectedValue) => {
        console.log('Selected Value:', selectedValue);
        if (selectedValue.Security !== "") {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    const onAPChange = (e) => {
        setSelectedAP(e.value);
        handlePasswordDisplay(e.value);
    };

    return (
        <React.Fragment>
            <div className="flex justify-content-center align-items-center min-h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            <i className="pi pi-wifi" style={{ fontSize: '1.5rem' }}></i> &nbsp;
                            Setup Wifi
                        </div>
                        <span className="text-600 font-medium line-height-3">Select the wifi network this device should use</span>
                    </div>

                    <div>
                        <label htmlFor="apList" className="block text-900 font-medium mb-2">Wireless networks</label>
                        <Dropdown id="apList" value={selectedAP} onChange={onAPChange} options={apData.data}
                                  optionLabel="SSID" placeholder="Select a wifi network" checkmark={true}
                                  itemTemplate={apOptionTemplate} valueTemplate={selectedAPTemplate}
                                  className="w-full mb-3" />

                        {showPassword && (
                            <React.Fragment>
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <InputText type="password" placeholder="Password" className="w-full mb-3"/>
                            </React.Fragment>
                        )}


                        <Button label="Select wifi network" className="w-full"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SetupHome;