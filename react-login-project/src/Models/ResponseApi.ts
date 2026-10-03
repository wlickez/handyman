class ResponseApi {
    isSuccess: boolean;
    amountItems: number;
    message: string;
    result: string[];

    constructor(isSuccess: boolean, token: string, amountItems: number, message: string, result: string[]) {
        this.isSuccess = isSuccess;
        this.amountItems = amountItems;
        this.message = message;
        this.result = result;
    }
}

export default ResponseApi;