import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { deleteContact, getContactById } from '../../../src/utils/hubspot';
import { generateHubspotContact } from '../../utils/dataGenerators/hubspotContact';
import createServer from '../../../src/server';

const app = createServer();
jest.mock('../../../src/utils/hubspot');

describe('DELETE /api/contacts/:id', () => {
  let contactId;
  let existentContact;

  beforeEach(() => {
    contactId = faker.number.int({ min: 1, max: 9999 }).toString();
    existentContact = generateHubspotContact();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when contact exist', () => {
    beforeEach(() => {
      getContactById.mockResolvedValue(existentContact);
      deleteContact.mockResolvedValue();
    });

    it('should delete it', async () => {
      const { body } = await supertest(app)
        .delete(`/api/contacts/${contactId}`)
        .expect(200);

      expect(getContactById).toHaveBeenCalledTimes(1);
      expect(deleteContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'Contacto eliminado satisfactoriamente'
      );
    });
  });

  describe('when contact does not exist', () => {
    beforeEach(() => {
      getContactById.mockImplementation(() => {
        throw { code: 404 };
      });
    });

    it('should throw an error 404', async () => {
      const { body } = await supertest(app)
        .delete(`/api/contacts/${contactId}`)
        .expect(404);

      expect(getContactById).toHaveBeenCalledTimes(1);
      expect(deleteContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        `Contacto con el id ${contactId} no existe`
      );
    });
  });

  describe('when hubspot throws an unexpected error', () => {
    beforeEach(() => {
      getContactById.mockResolvedValue(existentContact);
      deleteContact.mockImplementation(() => {
        throw new Error('unexpected');
      });
    });

    it('should throw error 500', async () => {
      const { body } = await supertest(app)
        .delete(`/api/contacts/${contactId}`)
        .expect(500);

      expect(getContactById).toHaveBeenCalledTimes(1);
      expect(deleteContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', 'Error en el servidor');
    });
  });
});
