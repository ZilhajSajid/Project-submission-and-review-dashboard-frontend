import apiClient from "@/lib/apiClient";
import { LoginPayload, RegisterPayload } from "@/types";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userRegister(payload: RegisterPayload) {
  return apiClient("/user/register", { method: "POST", body: payload });
}
export function getMe() {
  return apiClient("/user/me");
}
export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}
