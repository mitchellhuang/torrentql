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

export const UPDATE_SEARCH_FILTER_MUTATION = gql`
  mutation updateSearchFilter($searchFilter: String!) {
    updateSearchFilter(searchFilter: $searchFilter) @client {
      searchFilter
    }
  }
`;

export const UPDATE_STATUS_FILTER_MUTATION = gql`
  mutation updateStatusFilter($statusFilter: String!) {
    updateStatusFilter(statusFilter: $statusFilter) @client {
      statusFilter
    }
  }
`;

export const UPDATE_TRACKER_FILTER_MUTATION = gql`
  mutation updateTrackerFilter($trackerFilter: String!) {
    updateTrackerFilter(trackerFilter: $trackerFilter) @client {
      trackerFilter
    }
  }
`;

export const UPDATE_SELECTED_TORRENTS_MUTATION = gql`
  mutation updateSelectedTorrents($selectedTorrents: [String]!) {
    updateSelectedTorrents(selectedTorrents: $selectedTorrents) @client {
      selectedTorrents
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

export const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($password: String!, $key: String!) {
      resetPassword(password: $password, key: $key)
  }
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($password: String!, $newPassword: String!) {
    updateUserPassword(password: $password, newPassword: $newPassword) {
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

export const PAUSE_TORRENT_MUTATION = gql`
  mutation pauseTorrent($id: String!) {
    pauseTorrent(id: $id)
  }
`;

export const RESUME_TORRENT_MUTATION = gql`
  mutation resumeTorrent($id: String!) {
    resumeTorrent(id: $id)
  }
`;

export const CREATE_API_KEY_MUTATION = gql`
  mutation createApiKey($name: String!) {
    createApiKey(name: $name) {
      id
      name
      key
      createdAt
    }
  }
`;

export const DELETE_API_KEY_MUTATION = gql`
  mutation deleteApiKey($id: String!) {
    deleteApiKey(id: $id)
  }
`;

export const CREATE_BITCOIN_TRANSACTION_MUTATION = gql`
  mutation createBitcoinTransaction($amount: Float!) {
    createBitcoinTransaction(amount: $amount) {
      id
      invoiceUrl
    }
  }
`;
