export const environment = {
  production: true,
  // No public backend in portfolio deploy — DemoModeInterceptor fills in 7 customers + 8 tasks
  // automatically when the API call fails. To connect a real backend, set apiUrl to its URL.
  apiUrl: 'https://customer-crm-demo.invalid/api',
};
