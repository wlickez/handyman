class ApiFetchService {
  private static instance: ApiFetchService | null = null;
  private readonly baseUrl = "https://localhost:7253/api/";

  constructor() {
    if (ApiFetchService.instance) {
      return ApiFetchService.instance;
    }

    ApiFetchService.instance = this;
  }

  async get<T = unknown>(complemento: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${complemento}`);
    return (await response.json()) as T;
  }

  async post<T = unknown>(complemento: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${complemento}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return (data) as T;
  }
}

const apiService = new ApiFetchService();
export default apiService;