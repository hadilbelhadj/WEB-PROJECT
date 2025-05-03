import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { JwtService } from "../auth/services/jwt.service";

export const roleGuard: CanActivateFn = (route) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const requiredRole = route.data['role'];
  const userRole = jwtService.getCurrentRole();

  if (userRole === requiredRole) return true;
  
  router.navigate(['/']);
  return false;
};