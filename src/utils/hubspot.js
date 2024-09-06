import { Client } from '@hubspot/api-client';
import { HUBSPOT_API_KEY, createLogger } from '../config';

const hubspotClient = new Client({ accessToken: HUBSPOT_API_KEY });
const logger = createLogger('utils/hubspot.js');

/**
 * Creates a new contact on Hubspot API
 * @param {object} data - data to set in the new contact
 * @returns Promise
 */
export function createContact(data) {
  logger.debug('Creating hubspot contact');
  const { firstname, lastname, email, phone = '' } = data;

  const properties = {
    firstname,
    lastname,
    email,
    phone,
  };

  return hubspotClient.crm.contacts.basicApi.create({
    properties,
  });
}

/**
 * Gets contacts on Hubspot API
 * @param {object} filter - contact properties to make filtering
 * @returns Promise
 */
export function getContacts(filter = {}) {
  logger.debug('Getting hubspot contacts');
  const search = {
    filterGroups: [
      {
        filters: Object.entries(filter).map(([key, value]) => {
          return {
            propertyName: key,
            operator: 'EQ',
            value,
          };
        }),
      },
    ],
    sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
    properties: ['createdate', 'firstname', 'lastname', 'email', 'phone'],
  };

  return hubspotClient.crm.contacts.searchApi.doSearch(search);
}

/**
 * Gets a Hubspot contact by id
 * @param {string} id - id of the contact to search
 * @returns Promise
 */
export function getContactById(id) {
  logger.debug('Getting hubspot contact by id');
  return hubspotClient.crm.contacts.basicApi.getById(id);
}

/**
 * Updates a Hubspot contact
 * @param {string} id - id of the contact to update
 * @param {object} data - new data to set in the contact
 * @returns Promise
 */
export function updateContact(id, data) {
  logger.debug('Updating hubspot contact');
  return hubspotClient.crm.contacts.basicApi.update(id, { properties: data });
}

/**
 * Deletes a Hubspot contact
 * @param {*} id - id of the contact to delete
 * @returns Promise
 */
export function deleteContact(id) {
  logger.debug('Deleting hubspot contact');
  return hubspotClient.crm.contacts.basicApi.archive(id);
}

/**
 * Gets all the registered contacts on Hubspot
 * @returns Promise
 */
export function getAll() {
  return hubspotClient.crm.contacts.getAll(undefined, undefined, [
    'firstname',
    'lastname',
    'email',
    'phone',
    'hs_object_id',
  ]);
}
