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
  useVerifyEmailMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} from "@/lib/redux/features/auth/authApi";
import { api } from "@/lib/redux/api/apiSlice";

const dashboardForRole = (type: string) => {
  if (type === "ADMIN") return "/admin";
  return type === "EDITOR" ? "/editor" : "/client";
};

const errorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error && "data" in error) {
    const data = (error as { data?: { message?: unknown } }).data;
    if (typeof data?.message === "string") return data.message;
  }
  if (typeof error === "object" && error !== null) {
    const err = error as Record<string, unknown>;
    if (typeof err.message === "string") return err.message;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, accessToken, isAuthenticated, isLoading, error } =
    useAppSelector((state) => state.auth);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [verifyEmailMutation] = useVerifyEmailMutation();
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

        const accessToken = response.authorization?.access_token;
        const refreshToken = response.authorization?.refresh_token;
        const userType = response.type;

        if (accessToken) {
          dispatch(
            setCredentials({
              user: {
                id: "",
                name: "",
                email: credentials.email,
                role:
                  userType === "ADMIN"
                    ? "admin"
                    : userType === "EDITOR"
                      ? "editor"
                      : "client",
                user_type: userType,
                is_verified: true,
                created_at: "",
                updated_at: "",
              },
              accessToken,
              refreshToken,
            }),
          );
          toast.success(typeof response.message === "string" ? response.message : "Login successful!");
          const targetPath = dashboardForRole(userType);
          router.push(targetPath);
        }
      } catch (err) {
        const message = errorMessage(err, "Login failed");
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, loginMutation, router],
  );

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      type: "CLIENT" | "EDITOR";
    }) => {
      try {
        dispatch(clearError());
        const response = await registerMutation(data).unwrap();
        toast.success(typeof response.message === "string" ? response.message : "OTP sent to your email!");
        sessionStorage.setItem("registrationEmail", data.email);
        router.push("/verify-email");
      } catch (err) {
        const message = errorMessage(err, "Registration failed");
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, registerMutation, router],
  );

  const verifyEmail = useCallback(
    async (email: string, token: string) => {
      try {
        dispatch(clearError());
        const response = await verifyEmailMutation({ email, token }).unwrap();
        toast.success(typeof response.message === "string" ? response.message : "Email verified successfully!");
        router.push("/login");
        return true;
      } catch (err) {
        const message = errorMessage(err, "Email verification failed");
        dispatch(setError(message));
        toast.error(message);
        return false;
      }
    },
    [dispatch, verifyEmailMutation, router],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
      dispatch(api.util.resetApiState());
      toast.success("Logged out successfully");
    } catch (err) {
      dispatch(logoutAction());
      dispatch(api.util.resetApiState());
      toast.error("Logout failed");
    }
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }, [dispatch, logoutMutation, logoutAction, router]);

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        dispatch(clearError());
        const response = await forgotPasswordMutation({ email }).unwrap();
        return response.success;
      } catch (err) {
        const message = errorMessage(err, "Failed to send OTP");
        dispatch(setError(message));
        toast.error(message);
        return false;
      }
    },
    [dispatch, forgotPasswordMutation],
  );

  const verifyOTP = useCallback(
    async (email: string, token: string) => {
      try {
        dispatch(clearError());
        await verifyOTPMutation({ email, token }).unwrap();
        sessionStorage.setItem("passwordResetEmail", email);
        sessionStorage.setItem("passwordResetToken", token);
        return true;
      } catch (err) {
        const message = errorMessage(err, "Invalid OTP");
        dispatch(setError(message));
        toast.error(message);
        return false;
      }
    },
    [dispatch, verifyOTPMutation],
  );

  const resetPassword = useCallback(
    async (data: { email: string; token: string; password: string }) => {
      try {
        dispatch(clearError());
        await resetPasswordMutation(data).unwrap();
        return true;
      } catch (err) {
        const message = errorMessage(err, "Failed to reset password");
        dispatch(setError(message));
        toast.error(message);
        return false;
      }
    },
    [dispatch, resetPasswordMutation],
  );

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    verifyEmail,
    logout: handleLogout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    refetchUser,
  } as const;
};