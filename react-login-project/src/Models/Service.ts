class Service {
    id: number;
    description: string;
    taskCategoryId: number;
    userId: number;
    providerId: number;
    paymentId:  number;
    contractId: number;

    constructor(id: number, 
        description: string, 
        taskCategoryId: number,
        userId: number,
        providerId: number,
        paymentId: number,
        contractId: number
        ){
        this.id = id;
        this.description = description;
        this.taskCategoryId = taskCategoryId;
        this.userId = userId;
        this.providerId = providerId;
        this.paymentId = paymentId;
        this.contractId = contractId;
    }
}

export default Service;