import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check active session on app load
  useEffect(() => {
    console.log('[AuthContext] Checking for existing session');
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('[AuthContext] Session check result:', session);
        
        if (session) {
          setUser(session.user);
          console.log('[AuthContext] User set from existing session:', session.user);
        }
      } catch (error) {
        console.error('[AuthContext] Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('[AuthContext] Auth state changed:', _event, session?.user?.email);
        
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
        setAuthError(null);
      }
    );

    return () => {
      console.log('[AuthContext] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email, password) => {
    console.log('[AuthContext] Initiating email login');
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[AuthContext] Email login error:', error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }

      console.log('[AuthContext] Email login successful');
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('[AuthContext] Unexpected error during email login:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signupWithEmail = async (email, password) => {
    console.log('[AuthContext] Initiating email signup');
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('[AuthContext] Email signup error:', error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }

      console.log('[AuthContext] Email signup successful');
      // Note: User might be null if email confirmation is required
      if (data.user) {
        setUser(data.user);
      }
      return { success: true, user: data.user, session: data.session };
    } catch (error) {
      console.error('[AuthContext] Unexpected error during email signup:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const logout = async () => {
    console.log('[AuthContext] Initiating logout');
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[AuthContext] Logout error:', error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }

      console.log('[AuthContext] Logout successful');
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('[AuthContext] Unexpected error during logout:', error);
      setAuthError('An unexpected error occurred during logout.');
      return { success: false, error: 'An unexpected error occurred during logout.' };
    }
  };

  const value = {
    user,
    loginWithEmail,
    signupWithEmail,
    logout,
    loading,
    authError,
    setAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};