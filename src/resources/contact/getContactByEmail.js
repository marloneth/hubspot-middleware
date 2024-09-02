import { createLogger } from '../../config/logger';
import * as hubspotService from '../../utils/hubspot';

const logger = createLogger('resources/contact/getContactByEmail.js');

export async function getContactById(req, res) {
  logger.info('Get contact by email resource');

  try {
    const email = Number(req.params.id);
    const contact = await hubspotService.getContactById(id);
    console.log('CONTACT: ', contact);
  } catch (error) {
    throw error;
  }
}
