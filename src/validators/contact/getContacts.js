import Ajv from 'ajv';
import createErrors from 'http-errors';
import getContactsSchema from '../../validationSchemas/contact/getContacts.json';
import { createLogger } from '../../config';
import { respondError } from '../../utils/response';

const ajv = new Ajv();
const logger = createLogger('validators/contact/getContacts.js');

/**
 * Validates the query params of contacts retrieving
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {Function} next - Next middleware
 * @returns any
 */
export function getContactsValidator(req, res, next) {
  logger.debug('Validating contacts retrieving query params');

  try {
    const data = req.query;
    const isDataValid = ajv.validate(getContactsSchema, data);

    if (isDataValid) return next();

    const [validationError] = ajv.errors;
    const defaultErrorMessage = 'Query params inválidos';
    const errorMessages = {
      additionalProperties: `${validationError.params.additionalProperty} no es un query param permitido`,
      pattern: 'Correo electrónico no válido. Ej. example@domain.com',
    };

    throw createErrors.UnprocessableEntity(
      errorMessages[validationError.keyword] || defaultErrorMessage
    );
  } catch (error) {
    const responseData = {
      status: error.status,
      message: error.message,
    };

    return respondError(logger, res, responseData);
  }
}
