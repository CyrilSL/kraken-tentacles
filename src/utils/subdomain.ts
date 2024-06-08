export const getValidSubdomain = (host?: string | null) => {
   let subdomain: string | null | undefined = null;
 
   if (!host && typeof window !== 'undefined') {
     // On client side, get the host from window
     host = window.location.host;
   }
 
   if (host) {
     // Remove the port number if present
     const hostWithoutPort = host.split(':')?.[0];
 
     if (hostWithoutPort) {
       const parts = hostWithoutPort.split('.');
 
       // Check if the host has more than one part (e.g., sub.example.com or sub.localhost)
       if (parts.length > 2 || (parts.length === 2 && parts[1] === 'localhost')) {
         // Extract the first part as the subdomain
         subdomain = parts[0];
       }
     }
   }
 
   return subdomain;
 };