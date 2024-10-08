import { createLogger } from '../../config/logger';
import * as contactService from '../../services/contact';
import { respondError, respondSuccess } from '../../utils/response';

const logger = createLogger('resources/contact/createContact.js');

/**
 * Create contact resource
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns Promise
 */
export async function createContact(req, res) {
  logger.debug('Create contact resource');

  try {
    const data = req.body;
    const newContact = await contactService.createContact(data);
    const responseData = {
      status: 201,
      message: 'Contacto creado satisfactoriamente',
      data: { contact: newContact },
    };
    return respondSuccess(logger, res, responseData);
  } catch (error) {
    const responseData = {
      status: error.status,
      message: error.message,
    };

    return respondError(logger, res, responseData);
  }
}
