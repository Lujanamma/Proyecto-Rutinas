import User from '../models/User.js';

export const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const verifyUser = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) return null;

  user.verified = true;
  user.verificationToken = null;
  await user.save();
  return user;
};
