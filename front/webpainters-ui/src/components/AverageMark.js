import React, { useState, useEffect } from 'react';

function AverageMark({_avgMark}) {
    return (
        <div className="avg-mark">
            <h1>{_avgMark} </h1>
        </div>
    );
}
export default AverageMark;