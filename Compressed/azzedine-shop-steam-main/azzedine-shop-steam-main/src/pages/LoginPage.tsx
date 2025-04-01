
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

enum AuthView {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD
}

export default function LoginPage() {
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.LOGIN);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to shop
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azzedine-primary/10 to-azzedine-secondary/10">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-azzedine-primary to-azzedine-secondary bg-clip-text text-transparent mb-2">
            Azzedine Workshop
          </h1>
          <p className="text-gray-600">
            {currentView === AuthView.LOGIN && "Sign in to continue shopping"}
            {currentView === AuthView.SIGNUP && "Create a new account"}
            {currentView === AuthView.RESET_PASSWORD && "Reset your password"}
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="pt-6">
            {currentView === AuthView.LOGIN && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm 
                  onSignupClick={() => setCurrentView(AuthView.SIGNUP)}
                  onForgotPasswordClick={() => setCurrentView(AuthView.RESET_PASSWORD)}
                />
              </motion.div>
            )}

            {currentView === AuthView.SIGNUP && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SignupForm
                  onLoginClick={() => setCurrentView(AuthView.LOGIN)}
                />
              </motion.div>
            )}

            {currentView === AuthView.RESET_PASSWORD && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResetPasswordForm
                  onBackToLoginClick={() => setCurrentView(AuthView.LOGIN)}
                />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
