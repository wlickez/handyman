class ApiFetchService {
    constructor() {
        if (ApiFetchService.instance) {
            return ApiFetchService.instance;
        }


        this.baseUrl = "https://localhost:7253/api/";

        ApiFetchService.instance = this;
    }

    async get(complemento) {
        const response = await fetch(`${this.baseUrl}${complemento}`);
        return response.json();
    }

    async post(complemento, body) {

        const response = await fetch(`${this.baseUrl}${complemento}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return response.json();
    }

}


// ✅ Exportar una sola instancia
const apiService = new ApiFetchService();

export default apiService;
