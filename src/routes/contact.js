import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../resources';

const contactRouter = Router();

contactRouter.get('/', getContacts);
contactRouter.get('/:id', getContactById);
contactRouter.post('/', createContact);
contactRouter.patch('/:id', updateContact);
contactRouter.delete('/:id', deleteContact);

export default contactRouter;
