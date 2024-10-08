import createError from 'http-errors';
import { createLogger } from '../../config/logger.js';
import * as hubspotService from '../../utils/hubspot.js';

const logger = createLogger('services/contact/updateContact.js');

/**
 * Update contact service
 * @param {string} id - id of the contact to update
 * @param {object} data - new data to set on the contact
 * @returns Promise
 */
export async function updateContact(id, data) {
  logger.debug('Update contact service');

  try {
    const updatedContact = await hubspotService.updateContact(id, data);
    return updatedContact;
  } catch (error) {
    switch (error.code) {
      case 400:
        throw createError.BadRequest(
          'No se recibió ninguna propiedad para editar, porfavor proporcionar al menos una'
        );
      case 404:
        throw createError.NotFound(`Contacto con el id ${id} no existe`);
      case 409:
        throw createError.Conflict(
          'Ya existe un contacto con el correo electrónico proporcionado'
        );
      default:
        throw error;
    }
  }
}
