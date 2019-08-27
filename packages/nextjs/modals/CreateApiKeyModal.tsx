import React, { useState } from 'react';
import Modal from '../components/Modal';
import CreateApiKeyForm from '../forms/CreateApiKeyForm';
import Button from '../components/Button';
import colors from '../lib/colors';

const CreateApiKeyModal = ({
  active,
  toggle,
}) => {
  const [apiKey, setApiKey] = useState('');
  console.log(apiKey);
  return (
    <Modal
      title="Create API Key"
      active={active}
      toggle={toggle}
    >
      {apiKey ? (
        <div>
          <p>Your API Secret Key:</p>
          <pre>{apiKey}</pre>
          <p>Note: You will only be able to see this key once.</p>
          <Button onClick={toggle} className="mt-3" block>Close</Button>
          <style jsx>{`
            pre {
              margin: 10px 0;
              padding: 10px;
              background-color: ${colors.lightGray};
              font-weight: 600;
            }
          `}</style>
        </div>
        ) : <CreateApiKeyForm onFinished={apiKey => setApiKey(apiKey)} />}
    </Modal>
  );
};

export default CreateApiKeyModal;
