import { createLogger } from '../../config';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/getContacts.js');

/**
 * Get contacts service
 * @param {object} filter - contact properties to make a filtering
 * @returns Promise
 */
export async function getContacts(filter = {}) {
  logger.debug('Get contacts service');
  try {
    let contacts = null;

    if (filter.email) {
      contacts = await hubspotService.getContacts(filter);
      return contacts.results.map((result) => result.properties);
    }

    contacts = await hubspotService.getAll();
    return contacts.map((contact) => contact.properties);
  } catch (error) {
    throw error;
  }
}
