export const FetchStatusState = {
    loading: 'LOADING',
    complete: 'COMPLETE',
    error: 'ERROR'
} as const;

export type FetchStatus = typeof FetchStatusState[keyof typeof FetchStatusState];


export const getData = async <T={}>(url: string) => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;
    const response: Response = await fetch(url, {signal});
    if (!response.ok) { throw new Error(response.status); 
    }
    const abort = controller.abort;
    return {
        response.json() as T,
        abort,a
    }
}

