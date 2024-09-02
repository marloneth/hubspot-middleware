export function respondSuccess(logger, res, responseData) {
  logger.info('Sending success response');
  const { status = 200, message = '', data = {} } = responseData;
  return res.status(status).send({ message, data });
}

export function respondError(logger, res, responseData) {
  logger.info('Sending error response');
  const { status = 500, message = 'Server error', data = {} } = responseData;
  return res.status(status).send({ message, data });
}
