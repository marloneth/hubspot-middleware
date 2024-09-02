import { createLogger } from '../../config';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/getContacts.js');

export async function getContacts(filter = {}) {
  logger.debug('Get contacts service');
  try {
    const contacts = await hubspotService.getContacts(filter);
    return contacts;
  } catch (error) {
    throw error;
  }
}
