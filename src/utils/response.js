export function respondSuccess(logger, res, responseData) {
  logger.info('Sending success response');
  const { status = 200, message = '', data = {} } = responseData;
  return res.status(status).send({ message, data });
}

export function respondError(logger, res, responseData) {
  logger.info('Sending error response');

  const {
    status = 500,
    message = 'Error en el servidor',
    data = {},
  } = responseData;
  const errorToSend = status !== 500 ? message : 'Error en el servidor';

  logger.error(message);
  return res.status(status).send({ message: errorToSend, data });
}
