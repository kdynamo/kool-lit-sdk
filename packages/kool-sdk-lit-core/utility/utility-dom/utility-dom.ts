/**
 * === true, either a slot is defined or one of the attributes specified is defined
 * 
 * === false, no slot is defined and no attiributes are defined
 * 
 * @param context the top level element (typically this) to perform the querySelector
 * @param slotName the selected slot name to determined if the slot is defined
 * @param attributes variables that if any are defined will cause the returned value to be true
 * 
 * @returns === true, slot is defined. === false, slot is not defined
 */
export const isSlotDefined = (context: HTMLElement, slotName: string = '', ...attributes: unknown[]) => {
    
    let defined = false;
    attributes.forEach((item: unknown) => {
        defined = defined || !!item;
        console.log('attributes', item, !!item, defined);
    });

    if (!defined) {
        const slot = context.querySelector(`:scope > [slot=${slotName}]`);
        defined ||= !!slot;
    }
    return (defined);
}

export const StatusState = {
    'active': 'ACTIVE',
    'inactive': 'INACTIVE',
    'pending': 'PENDING',
} as const;

export type Status = typeof StatusState[keyof typeof StatusState];
