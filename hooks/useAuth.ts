"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setCredentials,
  setError,
  clearError,
  logout as logoutAction,
} from "@/lib/redux/slices/authSlice";
import {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} from "@/lib/redux/features/auth/authApi";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, accessToken, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [verifyOTPMutation] = useVerifyOTPMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();

  const { refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        dispatch(clearError());
        const response = await loginMutation(credentials).unwrap();

        if (response.data) {
          dispatch(
            setCredentials({
              user: response.data.user,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          toast.success(response.message || "Login successful!");
          router.push("/dashboard");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, loginMutation, router]
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        dispatch(clearError());
        const response = await registerMutation(data).unwrap();

        if (response.data) {
          dispatch(
            setCredentials({
              user: response.data.user,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          toast.success(response.message || "Registration successful!");
          router.push("/dashboard");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Registration failed";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, registerMutation, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
      toast.success("Logged out successfully");
    } catch (err) {
      dispatch(logoutAction());
      toast.error("Logout failed");
    }
    router.push("/login");
  }, [dispatch, logoutMutation, logoutAction, router]);

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        dispatch(clearError());
        const response = await forgotPasswordMutation({ email }).unwrap();
        toast.success(response.message || "OTP sent to your email");
        router.push("/verify-otp");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to send OTP";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, forgotPasswordMutation, router]
  );

  const verifyOTP = useCallback(
    async (email: string, otp: string) => {
      try {
        dispatch(clearError());
        await verifyOTPMutation({ email, otp }).unwrap();
        toast.success("OTP verified successfully");
        router.push("/reset-password");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid OTP";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, verifyOTPMutation, router]
  );

  const resetPassword = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        dispatch(clearError());
        await resetPasswordMutation(data).unwrap();
        toast.success("Password reset successfully");
        router.push("/login");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to reset password";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, resetPasswordMutation, router]
  );

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    refetchUser,
  } as const;
};
