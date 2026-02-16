import type { AuthTokens } from '../features/auth/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private tokens: AuthTokens | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadTokens();
  }

  private loadTokens(): void {
    const stored = localStorage.getItem('auth_tokens');
    if (stored) {
      try {
        this.tokens = JSON.parse(stored);
      } catch {
        localStorage.removeItem('auth_tokens');
      }
    }
  }

  public setTokens(tokens: AuthTokens | null): void {
    this.tokens = tokens;
    if (tokens) {
      localStorage.setItem('auth_tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('auth_tokens');
    }
  }

  public getTokens(): AuthTokens | null {
    return this.tokens;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requireAuth = true, ...fetchConfig } = config;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchConfig.headers as Record<string, string>),
    };

    if (requireAuth && this.tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${this.tokens.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchConfig,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 && requireAuth) {
        this.setTokens(null);
        window.location.href = '/login';
      }
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  public get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
