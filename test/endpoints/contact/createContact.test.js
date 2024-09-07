import supertest from 'supertest';
import { createContact } from '../../../src/utils/hubspot';
import {
  generateHubspotContact,
  generateHubspotContactCreationData,
} from '../../utils/dataGenerators/hubspotContact';
import createServer from '../../../src/server';

const app = createServer();
jest.mock('../../../src/utils/hubspot');

describe('POST /api/contacts', () => {
  let creationBody;
  let hubspotContactCreated;
  let currentDate;

  beforeEach(() => {
    currentDate = new Date();
    creationBody = generateHubspotContactCreationData();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when body is correct', () => {
    beforeEach(() => {
      hubspotContactCreated = generateHubspotContact({
        firstname: creationBody.firstname,
        lastname: creationBody.lastname,
        email: creationBody.email,
        phone: creationBody.phone,
        createdAt: currentDate,
      });

      createContact.mockResolvedValue(hubspotContactCreated);
    });

    it('should return the new contact', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(201);

      expect(createContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty(
        'message',
        'Contacto creado satisfactoriamente'
      );

      const { data } = body;
      const expectedContact = {
        ...hubspotContactCreated,
        createdAt: hubspotContactCreated.createdAt.toISOString(),
        updatedAt: hubspotContactCreated.updatedAt.toISOString(),
      };

      expect(data).toHaveProperty('contact', expectedContact);
    });
  });

  describe('when body is not send', () => {
    it('should throw error 422', async () => {
      const { body } = await supertest(app).post('/api/contacts').expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'firstname' en el body"
      );
    });
  });

  describe('when body is not type object', () => {
    beforeEach(() => {
      creationBody.additional = 'property';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send([])
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', "El body debe ser tipo 'object'");
    });
  });

  describe('when body has not fields', () => {
    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send({})
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'firstname' en el body"
      );
    });
  });

  describe('when body has not firstname', () => {
    beforeEach(() => {
      delete creationBody.firstname;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'firstname' en el body"
      );
    });
  });

  describe('when body has not lastname', () => {
    beforeEach(() => {
      delete creationBody.lastname;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'lastname' en el body"
      );
    });
  });

  describe('when body has not email', () => {
    beforeEach(() => {
      delete creationBody.email;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'email' en el body"
      );
    });
  });

  describe('when body has not phone', () => {
    beforeEach(() => {
      delete creationBody.phone;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Falta el campo 'phone' en el body"
      );
    });
  });

  describe('when body has additional not allowed properties', () => {
    beforeEach(() => {
      creationBody.additional = 'property';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'La data proporcionada tiene propiedades adicionales no requeridas'
      );
    });
  });

  describe('when firstname is not type string', () => {
    beforeEach(() => {
      creationBody.firstname = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'firstname' debe ser de tipo 'string'"
      );
    });
  });

  describe('when firstname is empty string', () => {
    beforeEach(() => {
      creationBody.firstname = '';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'firstname' no puede ser un string vacío"
      );
    });
  });

  describe('when lastname is not type string', () => {
    beforeEach(() => {
      creationBody.lastname = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'lastname' debe ser de tipo 'string'"
      );
    });
  });

  describe('when lastname is empty string', () => {
    beforeEach(() => {
      creationBody.lastname = '';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'lastname' no puede ser un string vacío"
      );
    });
  });

  describe('when email is not type string', () => {
    beforeEach(() => {
      creationBody.email = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'email' debe ser de tipo 'string'"
      );
    });
  });

  describe('when email is not a valid email', () => {
    beforeEach(() => {
      creationBody.email = 'not-valid';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Campo 'email' no válido. Ej. example@domain.com"
      );
    });
  });

  describe('when phone is not type string', () => {
    beforeEach(() => {
      creationBody.phone = 2;
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "El campo 'phone' debe ser de tipo 'string'"
      );
    });
  });

  describe('when phone is not a valid phone number', () => {
    beforeEach(() => {
      creationBody.phone = '1';
    });

    it('should throw error 422', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(422);

      expect(createContact).toHaveBeenCalledTimes(0);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        "Campo 'phone' no válido. Ej. +521234567890 ó 1234567890"
      );
    });
  });

  describe('when hubspot user data is duplicated', () => {
    beforeEach(() => {
      createContact.mockImplementation(() => {
        throw { code: 409 };
      });
    });

    it('should throw error 409', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(409);

      expect(createContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty(
        'message',
        'Ya existe un contacto con el correo electrónico proporcionado'
      );
    });
  });

  describe('when hubspot throws an unexpected error', () => {
    beforeEach(() => {
      createContact.mockImplementation(() => {
        throw new Error('unexpected');
      });
    });

    it('should throw error 500', async () => {
      const { body } = await supertest(app)
        .post('/api/contacts')
        .send(creationBody)
        .expect(500);

      expect(createContact).toHaveBeenCalledTimes(1);
      expect(body).toHaveProperty('data', {});
      expect(body).toHaveProperty('message', 'Error en el servidor');
    });
  });
});
