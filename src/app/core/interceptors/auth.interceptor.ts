import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Direkt auf localStorage zugreifen statt AuthService zu injizieren
  const token = typeof window !== 'undefined' && window.localStorage 
    ? localStorage.getItem('auth_token') 
    : null;

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
