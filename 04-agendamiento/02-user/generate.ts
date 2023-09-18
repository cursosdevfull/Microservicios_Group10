import * as bcrypt from "bcryptjs";

const hash = bcrypt.hashSync("123", 10);
console.log(hash);
