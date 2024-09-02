import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/updateContact.js');

export async function updateContact(id, data) {
  logger.debug('Update contact service');

  try {
    const updatedContact = await hubspotService.updateContact(id, data);
    return updatedContact;
  } catch (error) {
    throw error;
  }
}
