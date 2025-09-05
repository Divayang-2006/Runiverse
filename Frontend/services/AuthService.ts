import { User } from '../lib/models/User';

// This service class encapsulates all authentication-related logic.
// Instead of having API calls scattered in the UI, we centralize them here.
// This is an example of the Single Responsibility Principle.
class AuthService {
  // A singleton instance to ensure we only have one AuthService
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log(`Attempting to log in with ${email}...`);
    // In a real app, you would make an API call here.
    // e.g., const response = await fetch('/api/login', ...);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: "Login successful!" }), 1000));
  }

  async socialLogin(provider: 'google' | 'facebook' | 'apple'): Promise<{ success: boolean }> {
    console.log(`Logging in with ${provider}...`);
    // Logic for social sign-in using Expo's modules would go here.
    return { success: true };
  }

  async register(userData: User): Promise<{ success: boolean; message: string }> {
    console.log(`Registering user: ${userData.username}`);
    // API call to register the new user would go here.
    // e.g., const response = await fetch('/api/register', { body: JSON.stringify(userData) });
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: "Registration successful!" }), 1000));
  }
}

// Export the singleton instance for use across the app
export const authService = AuthService.getInstance();