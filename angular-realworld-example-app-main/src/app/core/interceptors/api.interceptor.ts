import { HttpInterceptorFn } from "@angular/common/http";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Modification pour utiliser votre backend local
  let apiUrl = req.url;
  
  // Si ce n'est pas une URL absolue, on ajoute le base URL
  if (!req.url.startsWith('http')) {
    apiUrl = `http://localhost:8080${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  }

  const apiReq = req.clone({ 
    url: apiUrl,
    withCredentials: false, // Ajustez selon vos besoins CORS
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });
  return next(apiReq);
};