import api from "@/lib/api";

export interface CreatePaymentOrderResponse {
  payment: {
    id: number;
    student: number;
    course: number;
    amount: string;
    currency: string;
    status: string;
    gateway: string;
    gateway_order_id: string;
    gateway_payment_id: string | null;
    gateway_signature: string | null;
    created_at: string;
    paid_at: string | null;
    updated_at: string;
  };

  checkout: {
    key_id: string;
    order_id: string;
    amount: number;
    currency: string;
  };
}

export async function createPaymentOrder(
  courseId: number,
): Promise<CreatePaymentOrderResponse> {
  const response = await api.post(
    "/payments/create-order/",
    {
      course_id: courseId,
    },
  );

  return response.data;
}

export interface VerifyPaymentRequest {
  payment_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  detail: string;
  payment: {
    id: number;
    student: number;
    student_email: string;
    course: number;
    course_title: string;
    status: string;
  };
  enrollment?: {
    id: number;
    course: number;
    status: string;
  };
}

export async function verifyPayment(
  data: VerifyPaymentRequest,
): Promise<VerifyPaymentResponse> {
  const response = await api.post<VerifyPaymentResponse>(
    "/payments/verify/",
    data,
  );

  return response.data;
}