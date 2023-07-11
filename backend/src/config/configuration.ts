import * as process from "process";
import { JwtEnum } from "../modules/users/constants/user.enums";

export default () => ({
  server_port: parseInt(process.env.PORT) || 3001,
  bcrypt: {
    salt: 5
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      [JwtEnum.ACCESS]: { expiresIn: "15m" },
      [JwtEnum.REFRESH]: { expiresIn: "30d" }
    }

  },
  CORSprops: {
    origin: "*",
    allowedHeaders: ["*"],
    allowedMethods: ["*"],
    paths: ["*"]
  }

});