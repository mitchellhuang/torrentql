import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($updateEmailInput: UpdateEmailInput, $updatePasswordInput: UpdatePasswordInput) {
    updateUser(updateEmailInput: $updateEmailInput, updatePasswordInput: $updatePasswordInput) {
      id
      email
    }
  }
`;


export const ADD_TORRENT_MUTATION = gql`
  mutation addTorrent($data: String!) {
    addTorrent(data: $data) {
      id
    }
  }
`;
