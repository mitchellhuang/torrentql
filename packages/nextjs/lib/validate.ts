import { ObjectSchema } from 'yup';

export const validateSync = (schema: ObjectSchema, values: Object) => {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (error) {
    return error.inner.reduce((result, inner) => ({
      ...result,
      [inner.path]: inner.message,
    }), {}); // tslint:disable-line
  }
};
