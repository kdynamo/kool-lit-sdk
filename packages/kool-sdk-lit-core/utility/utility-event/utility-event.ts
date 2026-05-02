/**
 * Default options 
 */
export const defaultEventOptions = {
    bubbles: true,
    composed: true
};

/**
 * Create a custom event 
 * @param eventName custom event name
 * @param data data to be passed to the event
 * @param eventOptions Optional options that are combined with the default options
 * @returns 
 */
export const getCustomEvent = <D={},>(eventName: string, data: D, eventOptions = {}) => {
    return (new CustomEvent<D>(
        eventName,
        { detail: data, 
            ...defaultEventOptions,
        ...eventOptions
        }
    ));
};