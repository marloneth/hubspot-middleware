import createError from 'http-errors';
import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/deleteContact.js');

/**
 * Delete contact service
 * @param {string} id - id of the contact to delete
 * @returns Promise
 */
export async function deleteContact(id) {
  logger.debug('Delete contact service');

  try {
    // If the contact does not exists hubspot doesn't send an error on contact archiving, to handle that error we are looking for it first
    await hubspotService.getContactById(id);
    await hubspotService.deleteContact(id);
  } catch (error) {
    switch (error.code) {
      case 404:
        throw createError.NotFound(`Contacto con el id ${id} no existe`);
      default:
        throw error;
    }
  }
}
