import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../app/services/auth.service"; // 👈 correct path

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // ✅ correctly typed
  const authToken = authService.getToken(); // ✅ method must exist in AuthService

  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  return next(authReq);
};
