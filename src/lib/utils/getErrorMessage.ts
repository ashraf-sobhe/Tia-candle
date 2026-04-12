const errorMessages: Record<string, string> = {
  "Something went wrong": "حدث خطأ ما، حاول مرة أخرى",
  "Incorrect email or password":
    "البريد الإلكتروني أو كلمة المرور غير صحيحة، تأكد من بياناتك أو أنشئ حساباً جديداً",
  "Invalid email or password": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  "Email already exists": "البريد الإلكتروني مستخدم بالفعل",
  "User not found": "المستخدم غير موجود",
  "Invalid reset code": "كود الإعادة غير صحيح",
  "Reset code expired": "كود الإعادة منتهي الصلاحية",
  Unauthorized: "غير مصرح لك بالدخول",
  "Network Error": "خطأ في الاتصال، تحقق من الإنترنت",
};

export const getErrorMessage = (error: unknown): string => {
  const err = error as any;
  const message =
    err?.response?.data?.errors?.[0]?.message ||
    err?.response?.data?.message ||
    "Something went wrong";
  return errorMessages[message] ?? message;
};
