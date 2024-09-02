import { createLogger } from '../../config';
import * as contactServices from '../../services/contact';
import { respondError, respondSuccess } from '../../utils/response';
const logger = createLogger('resources/getContacts.js');

export async function getContacts(req, res) {
  logger.info('Get contacts resource');
  try {
    const { email } = req.query;
    const filter = email && { email };
    const contacts = await contactServices.getContacts(filter);
    const responseData = {
      status: 200,
      message: 'Contacts retrieved successfully',
      data: { contacts },
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
