import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/createContact.js');

export async function createContact(data) {
  logger.debug('Create contact service');
  try {
    const newContact = await hubspotService.createContact(data);
    return newContact;
  } catch (error) {
    throw error;
  }
}
