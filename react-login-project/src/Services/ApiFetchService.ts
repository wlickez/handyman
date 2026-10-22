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
    const response = await fetch(`${this.baseUrl}${complemento}`, {
      headers: this.getHeaders(),
    });
    return (await response.json()) as T;
  }

  async post<T = unknown>(complemento: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${complemento}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return (data) as T;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }
}

const apiService = new ApiFetchService();
export default apiService;