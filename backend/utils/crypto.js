import bcrypt from "bcrypt";

//HASH THE PASSWORD
export const hash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

//VERIFY THE PASSWORD
export const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
