import api from "@/lib/api";

export interface LoginResponse {
  access: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_photo: string | null;
  role: string;
  is_verified: boolean;
}


export interface RegisterResponse {
  detail?: string;
  user?: User;
}

export async function register(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(
    "/auth/register/",
    {
      email,
      password,
      first_name,
      last_name,
      phone_number,
    },
  );

  return response.data;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login/",
    {
      email,
      password,
    },
  );

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/auth/me/");

  return response.data;
}

export async function logout(refresh: string): Promise<void> {
  await api.post("/auth/logout/", {
    refresh,
  });
}