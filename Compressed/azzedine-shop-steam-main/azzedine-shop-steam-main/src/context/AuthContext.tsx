
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock users for demo purposes
  const mockUsers = [
    { id: '1', email: 'test@example.com', password: 'password123', name: 'Test User' }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name
      });
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      toast.error("Email already in use");
      return false;
    }

    // In a real implementation, we would create a new user in the database
    // For demonstration, we're just setting the user state
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      name,
      password
    };
    
    // Simulate user creation
    mockUsers.push(newUser);
    
    setUser({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    });
    
    toast.success("Account created successfully!");
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info("You have been logged out");
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (!existingUser) {
      toast.error("No account found with this email");
      return false;
    }
    
    toast.success("Password reset instructions sent to your email");
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user !== null,
      login,
      signup,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
