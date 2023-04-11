import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { config } from "@/config/config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  if (!payload) {
    done("error", false);
  }
  return done(null, payload);
});
