import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../resources';
import { createContactValidator, updateContactValidator } from '../validators';
import { getContactsValidator } from '../validators/contact/getContacts';

const contactRouter = Router();

contactRouter.get('/', getContactsValidator, getContacts);
contactRouter.post('/', createContactValidator, createContact);
contactRouter.patch('/:id', updateContactValidator, updateContact);
contactRouter.delete('/:id', deleteContact);

export default contactRouter;
