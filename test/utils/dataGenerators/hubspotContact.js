import { faker } from '@faker-js/faker';

export function generateHubspotContact({
  id = faker.number.int({ min: 1, max: 9999 }).toString(),
  firstname = faker.person.lastName(),
  lastname = faker.person.firstName(),
  email = faker.internet.email(),
  phone = faker.phone.number({ style: 'international' }),
  archived = false,
  createdAt = faker.date.past(),
  updatedAt = new Date(),
} = {}) {
  return {
    createdAt,
    archived,
    id,
    properties: {
      createddate: createdAt.toISOString(),
      email,
      firstname,
      hs_object_id: id,
      lastmodifieddate: updatedAt.toISOString(),
      lastname,
      phone,
    },
    updatedAt,
  };
}

export function generateHubspotContactCreationData({
  firstname = faker.person.firstName(),
  lastname = faker.person.lastName(),
  email = faker.internet.email(),
  phone = faker.phone.number({ style: 'international' }),
} = {}) {
  return { firstname, lastname, email, phone };
}

export function generateHubspotContacts(quantity = 1) {
  return Array.from(new Array(quantity), () => generateHubspotContact());
}
