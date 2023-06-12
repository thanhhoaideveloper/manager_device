import { toast } from 'react-toastify';
import React from 'react';

const DEFAULT_AUTO_CLOSE = 10000;
function error(message, options) {
    toast.error(formatMessage(message), {...options, autoClose: options?.autoClose? options.autoClose : DEFAULT_AUTO_CLOSE});
}

function success(message, options) {
    toast.success(formatMessage(message), {...options, autoClose: options?.autoClose? options.autoClose : DEFAULT_AUTO_CLOSE});
}

function warn(message, options) {
    toast.warn(formatMessage(message), {...options, autoClose: options?.autoClose? options.autoClose : DEFAULT_AUTO_CLOSE});
}

function info(message, options) {
    toast.info(formatMessage(message), {...options, autoClose: options?.autoClose? options.autoClose : DEFAULT_AUTO_CLOSE});
}


function _default(message, options) {
    toast(formatMessage(message), {...options, autoClose: options?.autoClose? options.autoClose : DEFAULT_AUTO_CLOSE});
}

function formatMessage(message) {
    let result;

    if (Array.isArray(message)) {
        const HTML = message.map((item, i) => `<p key={i}>{item}</p>`);

        result = `<div className='notify-content'>${HTML}</div>`;
    } else {
        result = message;
    }
    return result;
}

export default { error, success, warn, info, default: _default };
