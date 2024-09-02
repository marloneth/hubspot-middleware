import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/deleteContact.js');

export async function deleteContact(id) {
  logger.debug('Delete contact service');

  try {
    const deletedContact = await hubspotService.deleteContact(id);
    return deletedContact;
  } catch (error) {
    throw error;
  }
}
