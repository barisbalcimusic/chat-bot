import bcrypt from "bcrypt";

export const hash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

export const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
