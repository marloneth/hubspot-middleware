import { createLogger } from '../../config';
import * as contactService from '../../services/contact';
import { respondError, respondSuccess } from '../../utils/response';

const logger = createLogger('resources/contact/updateContact.js');

export async function updateContact(req, res) {
  logger.info('Update contact resource');

  try {
    const id = req.params.id;
    const data = req.body;
    const updatedContact = await contactService.updateContact(id, data);
    const responseData = {
      status: 200,
      message: 'Contact updated successfully',
      data: { contact: updatedContact },
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
