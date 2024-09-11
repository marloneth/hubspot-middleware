import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';
import createError from 'http-errors';

const logger = createLogger('services/contact/createContact.js');

/**
 * Create contact service
 * @param {object} data - data to set in the new contact
 * @returns Promise
 */
export async function createContact(data) {
  logger.debug('Create contact service');

  try {
    const newContact = await hubspotService.createContact(data);
    return newContact;
  } catch (error) {
    switch (error.code) {
      case 409:
        throw createError.Conflict(
          'Ya existe un contacto con el correo electrónico proporcionado'
        );
      default:
        throw error;
    }
  }
}
