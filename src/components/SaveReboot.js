import React from 'react';

function SaveReboot(props) {
    return (
        <React.Fragment>
            <div className="flex justify-content-center align-items-center min-h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            Saving settings and rebooting
                        </div>
                        <div>
                            After the device reboots it should connect to your network
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
)
}

export default SaveReboot;