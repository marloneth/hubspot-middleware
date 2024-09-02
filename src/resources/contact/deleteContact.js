import { createLogger } from '../../config/logger';
import * as contactService from '../../services/contact';
import { respondError, respondSuccess } from '../../utils/response';

const logger = createLogger('resources/contact/deleteContact.js');

export async function deleteContact(req, res) {
  logger.info('Delete contact resource');

  try {
    const id = req.params.id;
    const deletedContact = await contactService.deleteContact(id);
    const responseData = {
      status: 200,
      message: 'Contact deleted successfully',
      data: { contact: deletedContact },
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
