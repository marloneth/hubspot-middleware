import Ajv from 'ajv';
import createError from 'http-errors';
import createContactSchema from '../../validationSchemas/contact/createContact.json';
import { createLogger } from '../../config';
import { respondError } from '../../utils/response';

const ajv = new Ajv();
const logger = createLogger('validators/contact/createContact.js');

/**
 * Validates the body of contact creation
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {Function} next - Next middleware
 * @returns any
 */
export function createContactValidator(req, res, next) {
  logger.debug('Validating contact creation data');

  try {
    const data = req.body;
    const isDataValid = ajv.validate(createContactSchema, data);

    if (isDataValid) return next();

    let errorToSend = ajv.errorsText();
    const [validationError] = ajv.errors;

    switch (validationError.keyword) {
      case 'pattern': {
        const instancePath = validationError.instancePath?.slice(1) || '';
        const errorMessages = {
          email: "Campo 'email' no válido. Ej. example@domain.com",
          phone: "Campo 'phone' no válido. Ej. +521234567890 ó 1234567890",
        };

        errorToSend = errorMessages[instancePath] || errorToSend;
        break;
      }
      case 'additionalProperties': {
        errorToSend =
          'La data proporcionada tiene propiedades adicionales no requeridas';
        break;
      }
      case 'required': {
        errorToSend = `Falta el campo '${validationError.params.missingProperty}' en el body`;
        break;
      }
      case 'minLength': {
        const instancePath = validationError.instancePath?.slice(1) || '';
        errorToSend = `El campo '${instancePath}' no puede ser un string vacío`;
        break;
      }
      case 'type': {
        const instancePath = validationError.instancePath?.slice(1) || '';
        errorToSend = instancePath
          ? `El campo '${instancePath}' debe ser de tipo '${validationError.params.type}'`
          : `El body debe ser tipo '${validationError.params.type}'`;
        break;
      }
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
