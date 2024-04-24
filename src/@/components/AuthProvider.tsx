// AuthProvider.jsx (or a custom hook)
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAdminLogin } from "medusa-react";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminLogin = useAdminLogin();
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      await adminLogin.mutate(
        {
          email,
          password,
        },
        {
          onSuccess: ({ user }) => {
            console.log(user);
            setIsAuthenticated(true); // Update the authentication state
          },
          onError: (error) => {
            console.error(error);
            // Handle login error
          },
        }
      );
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  useEffect(() => {
    // Redirect to the dashboard if the user is authenticated
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return children({ isAuthenticated, handleLogin });
};