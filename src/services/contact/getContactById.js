import { createLogger } from '../../config/logger.js';
import { getContactById as getHubspotContactById } from '../../utils/hubspot.js';

const logger = createLogger('resources/getContactById.js');

export async function getContactById(req, res) {
  logger.info('Get contact by id resource');

  try {
    const id = Number(req.params.id);
    const contact = await getHubspotContactById(id);
    console.log('CONTACT: ', contact);
  } catch (error) {
    throw error;
  }
}
