export const IS_DEV = process.env['NODE_ENV']?.trim() === 'development';
export const PORT = Number(process.env['PORT']) || 3000;
export const HOST = process.env['HOST'] || '0.0.0.0';
export const LOG_LEVEL = process.env['LOG_LEVEL'] || 'info';
export const CORS_ORIGIN = process.env['CORS_ORIGIN'] || '*';
