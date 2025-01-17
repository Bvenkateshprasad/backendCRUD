const handleErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  };
  
  module.exports = { handleErrorResponse, errorHandler };
  