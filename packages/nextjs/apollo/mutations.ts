import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_SELECTED_FILE_MUTATION = gql`
  mutation updateSelectedFile($id: String!, $filePath: String!) {
    updateSelectedFile(id: $id, filePath: $filePath) @client {
      selectedFile
    }
  }
`;

export const UPDATE_SEARCH_QUERY_MUTATION = gql`
  mutation updateSearchQuery($searchQuery: String!) {
    updateSearchQuery(searchQuery: $searchQuery) @client {
      filter
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

export const UPDATE_USER_EMAIL_MUTATION = gql`
  mutation updateUserEmail($email: String!) {
    updateUserEmail(email: $email) {
      email
    }
  }
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($oldPassword: String!, $password: String!) {
    updateUserPassword(oldPassword: $oldPassword, password: $password) {
      id
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

export const DELETE_TORRENT_MUTATION = gql`
  mutation deleteTorrent($id: String!) {
    deleteTorrent(id: $id)
  }
`;
