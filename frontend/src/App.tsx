import React, { useState } from 'react';
import { AuthLayout } from './components/layout/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { SocialShell } from './components/layout/SocialShell';
import { ToastContainer } from './components/common/Toast';
import { SocialProvider } from './context/SocialContext';
import { useAuth } from './context/AuthContext';

export const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, toasts, removeToast } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <SocialProvider>
          <SocialShell />
        </SocialProvider>
      ) : (
        <AuthLayout
          activeMode={activeMode}
          onModeChange={setActiveMode}
          isAuthenticated={false}
        >
          {activeMode === 'login' ? (
            <LoginForm onSwitchToSignup={() => setActiveMode('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveMode('login')} />
          )}
        </AuthLayout>
      )}

      {/* Global Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </>
  );
};

export default App;
