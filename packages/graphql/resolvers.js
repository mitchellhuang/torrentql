import user from './queries/user';

const resolvers = {
  Query: {
    user: user
  },
};

export default resolvers;
