import { useState } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(authService.getCurrentUser());

  const login = async (nameOrEmail, emailOrPassword, passwordIfThree) => {
    let name = "";
    let email = "";
    let password = "";

    if (passwordIfThree) {
      name = nameOrEmail;
      email = emailOrPassword;
      password = passwordIfThree;
    } else {
      email = nameOrEmail;
      password = emailOrPassword;
    }

    const loggedUser = await authService.login(name, email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (name, email, password) => {
    const newUser = await authService.register(name, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, login, register, logout, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN' };
}
