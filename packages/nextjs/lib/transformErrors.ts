const transformErrors = (err) => {
  // tslint:disable-next-line:no-parameter-reassignment
  err = err.graphQLErrors[0];
  if (err) {
    if (err.message === 'Argument Validation Error') {
      const result = {};
      const { validationErrors } = err.extensions.exception;
      validationErrors.forEach((error) => {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        result[error.property] = Object.values(error.constraints).map(s => `${s.charAt(0).toUpperCase()}${s.slice(1)}.`);
      });
      return result;
    }
    return {
      error: err.message,
    };
  }
  return {
    error: 'An unknown error occurred.',
  };
};

export default transformErrors;
