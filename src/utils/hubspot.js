import { Client } from '@hubspot/api-client';
import { HUBSPOT_API_KEY, createLogger } from '../config';

const hubspotClient = new Client({ accessToken: HUBSPOT_API_KEY });
const logger = createLogger('utils/hubspot.js');

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
  };

  return hubspotClient.crm.contacts.searchApi.doSearch(search);
}

export function getContactById(id) {
  logger.debug('Getting hubspot contact by id');
  return hubspotClient.crm.contacts.basicApi.getById(id);
}

export function updateContact(id, data) {
  logger.debug('Updating hubspot contact');
  console.log('UPDATE DATA:', data);
  return hubspotClient.crm.contacts.basicApi.update(id, { properties: data });
}

export function deleteContact(id) {
  logger.debug('Deleting hubspot contact');
  return hubspotClient.crm.contacts.basicApi.archive(id);
}
