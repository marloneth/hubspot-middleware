import Ajv from 'ajv';
import createError from 'http-errors';
import updateContactSchema from '../../validationSchemas/contact/updateContact.json';
import { createLogger } from '../../config';
import { respondError } from '../../utils/response';

const ajv = new Ajv();
const logger = createLogger('validators/contact/updateContact.js');

/**
 * Validates the body of contact update
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {Function} next - Next middleware
 * @returns any
 */
export function updateContactValidator(req, res, next) {
  logger.debug('Validating contact update data');

  try {
    const data = req.body;
    const isDataValid = ajv.validate(updateContactSchema, data);

    if (isDataValid) return next();

    let errorToSend = ajv.errorsText();
    const [validationError] = ajv.errors;

    if (validationError.keyword === 'pattern') {
      const instancePath = validationError.instancePath?.slice(1) || '';
      const errorMessages = {
        email: 'Correo electrónico no válido. Ej. example@domain.com',
        phone: 'Teléfono no válido. Ej. +521234567890 ó 1234567890',
      };

      errorToSend = errorMessages[instancePath] || errorToSend;
    }

    throw createError.UnprocessableEntity(errorToSend);
  } catch (error) {
    const responseData = {
      status: error.status,
      message: error.message,
    };

    return respondError(logger, res, responseData);
  }
}
