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
    const [selectedPassword, setSelectedPassword] = useState("");
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

    const onWifiSave = () => {
        let password = "";
        if (showPassword) {
            password = selectedPassword;
        }
        console.log("Saving wifi with network / password: ", selectedAP.SSID, password)
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
                        <Dropdown id="apList" value={selectedAP} onChange={onAPChange} options={apData.data} optionLabel="SSID"
                                  placeholder="Select a wifi network" checkmark={true} className="w-full mb-3" />

                        {showPassword && (
                            <React.Fragment>
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <InputText type="password" placeholder="Password" value={selectedPassword} onChange={(e) => setSelectedPassword(e.target.value)} className="w-full mb-3"/>
                            </React.Fragment>
                        )}


                        <Button label="Select wifi network" className="w-full" onClick={onWifiSave}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SetupHome;