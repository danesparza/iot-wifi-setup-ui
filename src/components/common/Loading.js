import React from 'react';

function Loading(props) {

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="text-900 text-3xl font-medium mb-3">
                <i className="pi pi-spin pi-cog" style={{fontSize: '1.5rem'}}></i>&nbsp;
                Loading Wifi networks
            </div>
        </div>
    );
}

export default Loading;
