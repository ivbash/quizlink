import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { BadRequestError } from './app-error';

export function mapZodError(error: unknown) {
  if (!hasZodFastifySchemaValidationErrors(error)) return error;

  const errors = error.validation.map(({ message }) => message).join(', ');
  return new BadRequestError(errors);
}
