import { AxiosError, AxiosResponse } from 'axios';

type ActionType = {
    types: [string, string, string],
    callAPI: () => Promise<any>,
    callBack: {
        success: (response: AxiosResponse) => void,
        failure: (error: AxiosError) => void
    }
}

export default ActionType;