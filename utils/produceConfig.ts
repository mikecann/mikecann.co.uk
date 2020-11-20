import { pick } from "./misc";

export const produceConfig = <T extends object>(base: T): Readonly<T> => {
  const definedEnvKeys = () => Object.keys(process.env).filter((k) => base.hasOwnProperty(k));
  return Object.freeze({
    ...base,
    ...pick(process.env, ...definedEnvKeys()),
  }) as any;
};
