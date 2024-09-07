import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { getAll, getContacts } from '../../../src/utils/hubspot';
import {
  generateHubspotContacts,
  generateHubspotContact,
} from '../../utils/dataGenerators/hubspotContact';
import createServer from '../../../src/server';

const app = createServer();
jest.mock('../../../src/utils/hubspot');

describe('GET /api/contacts', () => {
  let contactQuantity;
  let hubspotContacts;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when there is no query params', () => {
    beforeEach(() => {
      contactQuantity = 5;
      hubspotContacts = generateHubspotContacts(contactQuantity);
      getAll.mockResolvedValue(hubspotContacts);
    });

    it('should return all contacts', async () => {
      const { body } = await supertest(app).get('/api/contacts').expect(200);
      expect(getAll).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contactos obtenidos satisfactoriamente'
      );

      const { data } = body;
      expect(data).toHaveProperty('contacts');
      expect(data.contacts).toHaveLength(contactQuantity);
      expect(hubspotContacts.map(({ properties }) => properties)).toStrictEqual(
        data.contacts
      );
    });
  });

  describe("when 'email' query param is sent", () => {
    let hubspotResponse;
    const email = faker.internet.email();

    beforeEach(() => {
      contactQuantity = 1;
      hubspotContacts = [generateHubspotContact({ email })];
      hubspotResponse = { results: hubspotContacts };
      getContacts.mockResolvedValue(hubspotResponse);
    });

    it('should return one contact with the given email', async () => {
      const { body } = await supertest(app)
        .get(`/api/contacts?email=${email}`)
        .expect(200);

      expect(getContacts).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contactos obtenidos satisfactoriamente'
      );

      const { data } = body;
      expect(data).toHaveProperty('contacts');
      expect(data.contacts).toHaveLength(contactQuantity);
      expect(hubspotContacts.map(({ properties }) => properties)).toStrictEqual(
        data.contacts
      );

      const [contact] = data.contacts;
      expect(contact.email).toBe(email);
    });
  });

  describe("when 'email' query param is not a valid email", () => {
    const email = 'invalid-email';

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .get(`/api/contacts?email=${email}`)
        .expect(422);

      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'Correo electrónico no válido. Ej. example@domain.com'
      );
    });
  });

  describe('when a not needed query param is sent', () => {
    const invalidParamName = 'invalid';

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .get(`/api/contacts?${invalidParamName}=param`)
        .expect(422);

      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        `'${invalidParamName}' no es un query param permitido`
      );
    });
  });

  describe('when hubspot throws an unexpected error', () => {
    beforeEach(() => {
      getAll.mockImplementation(() => {
        throw new Error('unexpected');
      });
    });

    it('should throw error 409', async () => {
      const { body } = await supertest(app).get('/api/contacts').expect(500);

      expect(getAll).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', 'Error en el servidor');
    });
  });
});
