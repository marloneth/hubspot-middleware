import supertest from 'supertest';
import { updateContact } from '../../../src/utils/hubspot';
import {
  generateHubspotContact,
  generateHubspotContactCreationData,
} from '../../utils/dataGenerators/hubspotContact';
import createServer from '../../../src/server';
import { faker } from '@faker-js/faker';

const app = createServer();
jest.mock('../../../src/utils/hubspot');

describe('PATCH /api/contacts/:id', () => {
  let editionBody;
  let hubspotContactEdited;
  let currentDate;
  let contactId;

  beforeEach(() => {
    contactId = faker.number.int({ min: 1, max: 9999 }).toString();
    currentDate = new Date();
    editionBody = generateHubspotContactCreationData();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when body is correct and user exists', () => {
    beforeEach(() => {
      hubspotContactEdited = generateHubspotContact({
        firstname: editionBody.firstname,
        lastname: editionBody.lastname,
        email: editionBody.email,
        phone: editionBody.phone,
        updatedAt: currentDate,
      });

      updateContact.mockResolvedValue(hubspotContactEdited);
    });

    it('should return the contact with new data', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(200);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto actualizado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactEdited,
        createdAt: hubspotContactEdited.createdAt.toISOString(),
        updatedAt: hubspotContactEdited.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body just have firstname', () => {
    beforeEach(() => {
      currentDate = new Date();
      editionBody = { firstname: faker.person.firstName() };
      hubspotContactEdited = generateHubspotContact({
        firstname: editionBody.firstname,
        updatedAt: currentDate,
      });

      updateContact.mockResolvedValue(hubspotContactEdited);
    });

    it('should edit just the contact firstname', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(200);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto actualizado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactEdited,
        createdAt: hubspotContactEdited.createdAt.toISOString(),
        updatedAt: hubspotContactEdited.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body just have lastname', () => {
    beforeEach(() => {
      currentDate = new Date();
      editionBody = { lastname: faker.person.lastName() };
      hubspotContactEdited = generateHubspotContact({
        lastname: editionBody.lastname,
        updatedAt: currentDate,
      });

      updateContact.mockResolvedValue(hubspotContactEdited);
    });

    it('should edit just the contact lastname', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(200);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto actualizado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactEdited,
        createdAt: hubspotContactEdited.createdAt.toISOString(),
        updatedAt: hubspotContactEdited.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body just have email', () => {
    beforeEach(() => {
      currentDate = new Date();
      editionBody = { email: faker.internet.email() };
      hubspotContactEdited = generateHubspotContact({
        email: editionBody.email,
        updatedAt: currentDate,
      });

      updateContact.mockResolvedValue(hubspotContactEdited);
    });

    it('should edit just the contact email', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(200);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto actualizado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactEdited,
        createdAt: hubspotContactEdited.createdAt.toISOString(),
        updatedAt: hubspotContactEdited.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body just have phone', () => {
    beforeEach(() => {
      currentDate = new Date();
      editionBody = { phone: faker.phone.number({ style: 'international' }) };
      hubspotContactEdited = generateHubspotContact({
        phone: editionBody.phone,
        updatedAt: currentDate,
      });

      updateContact.mockResolvedValue(hubspotContactEdited);
    });

    it('should edit just the contact phone', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(200);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto actualizado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactEdited,
        createdAt: hubspotContactEdited.createdAt.toISOString(),
        updatedAt: hubspotContactEdited.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body is not sent', () => {
    beforeEach(() => {
      updateContact.mockImplementation(() => {
        throw { code: 400 };
      });
    });

    it('should return the contact with new data', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .expect(400);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'No se recibió ninguna propiedad para editar, porfavor proporcionar al menos una'
      );
    });
  });

  describe('when body is not type object', () => {
    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send([])
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', "El body debe ser tipo 'object'");
    });
  });

  describe('when body has not fields', () => {
    beforeEach(() => {
      updateContact.mockImplementation(() => {
        throw { code: 400 };
      });
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send({})
        .expect(400);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'No se recibió ninguna propiedad para editar, porfavor proporcionar al menos una'
      );
    });
  });

  describe('when body has additional not allowed properties', () => {
    beforeEach(() => {
      editionBody.additional = 'property';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'La data proporcionada tiene propiedades adicionales no requeridas'
      );
    });
  });

  describe('when firstname is not type string', () => {
    beforeEach(() => {
      editionBody.firstname = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'firstname' debe ser de tipo 'string'"
      );
    });
  });

  describe('when firstname is empty string', () => {
    beforeEach(() => {
      editionBody.firstname = '';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'firstname' no puede ser un string vacío"
      );
    });
  });

  describe('when lastname is not type string', () => {
    beforeEach(() => {
      editionBody.lastname = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'lastname' debe ser de tipo 'string'"
      );
    });
  });

  describe('when lastname is empty string', () => {
    beforeEach(() => {
      editionBody.lastname = '';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'lastname' no puede ser un string vacío"
      );
    });
  });

  describe('when email is not type string', () => {
    beforeEach(() => {
      editionBody.email = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'email' debe ser de tipo 'string'"
      );
    });
  });

  describe('when email is not a valid email', () => {
    beforeEach(() => {
      editionBody.email = 'not-valid';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Campo 'email' no válido. Ej. example@domain.com"
      );
    });
  });

  describe('when phone is not type string', () => {
    beforeEach(() => {
      editionBody.phone = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'phone' debe ser de tipo 'string'"
      );
    });
  });

  describe('when phone is not a valid phone number', () => {
    beforeEach(() => {
      editionBody.phone = '1';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(422);

      expect(updateContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Campo 'phone' no válido. Ej. +521234567890 ó 1234567890"
      );
    });
  });

  describe('when hubspot user data is duplicated', () => {
    beforeEach(() => {
      updateContact.mockImplementation(() => {
        throw { code: 409 };
      });
    });

    it('should throw error 409', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(409);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'Ya existe un contacto con el correo electrónico proporcionado'
      );
    });
  });

  describe('when hubspot user to edit does not exist', () => {
    beforeEach(() => {
      updateContact.mockImplementation(() => {
        throw { code: 404 };
      });
    });

    it('should throw error 409', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(404);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        `Contacto con el id ${contactId} no existe`
      );
    });
  });

  describe('when hubspot throws an unexpected error', () => {
    beforeEach(() => {
      updateContact.mockImplementation(() => {
        throw new Error('unexpected');
      });
    });

    it('should throw error 500', async () => {
      const { body } = await supertest(app)
        .patch(`/api/contacts/${contactId}`)
        .send(editionBody)
        .expect(500);

      expect(updateContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', 'Error en el servidor');
    });
  });
});
