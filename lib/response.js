module.exports.success = (statusCode, body) => buildResponse(statusCode, body);

module.exports.failure = (statusCode, body) => buildResponse(statusCode, body);

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
