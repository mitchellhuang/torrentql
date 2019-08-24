import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_API_KEY_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/transformErrors';
import colors from '../lib/colors';

const CreateApiKeyModal = ({
  active,
  toggle,
}) => {
  const [createApiKey] = useMutation<{createApiKey}>(CREATE_API_KEY_MUTATION, {
    update(cache, { data: { createApiKey } }) {
      const { me } = cache.readQuery({ query: ME_QUERY });
      cache.writeQuery({
        query: ME_QUERY,
        data: { me: { ...me, apiKeys: me.apiKeys.concat([createApiKey]) } },
      });
    },
  });
  return (
    <Modal
      title="Create API Key"
      active={active}
      toggle={toggle}
    >
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async ({ name }, { setSubmitting, setStatus }) => {
          try {
            const resp = await createApiKey({
              variables: {
                name,
              },
            });
            setStatus({
              key: resp.data && resp.data.createApiKey && resp.data.createApiKey.key,
            });
            setSubmitting(false);
          } catch (err) {
            setStatus(transformErrors(err));
            setSubmitting(false);
          }
        }}
        render={({
          values: { name },
          status,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <h5 className="mb-2">Name</h5>
            <Input
              id="name"
              type="text"
              placeholder="Enter an API key name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && status.key && (
              <div className="mb-3">
                <h5 className="mb-2">Result</h5>
                <p>Your API Secret Key:</p>
                <pre><b>{status.key}</b></pre>
                <p>Note: You will only be able to see this key once.</p>
                <style jsx>{`
                  pre {
                    margin: 10px 0;
                    padding: 10px;
                    background-color: ${colors.lightGray};
                  }
                `}</style>
              </div>
              )}
            <Error error={status && status.error} />
            {status && status.key ? (
              <Button type="button" onClick={toggle} block>
                Close
              </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} block>
                  Create a new key
                </Button>
              )}
          </Form>
        )}
      />
    </Modal>
  );
};

export default CreateApiKeyModal;
