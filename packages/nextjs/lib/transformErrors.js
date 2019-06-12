const transformErrors = (err) => {
  err = err.graphQLErrors[0];
  if (err.message === 'Argument Validation Error') {
    const result = {};
    const { validationErrors } = err.extensions.exception;
    validationErrors.forEach((error) => {
      // eslint-disable-next-line
      result[error.property] = Object.values(error.constraints).map(s => s.charAt(0).toUpperCase() + s.slice(1) + '.');
    });
    return result;
  }
  return {
    error: err.message,
  };
};

export default transformErrors;
