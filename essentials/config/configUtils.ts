import { ensure } from "../misc/ensure";
import { findInObj } from "../misc/object";

type BaseConfig = Record<string, string>;

interface Options<T extends BaseConfig> {
  requiredInEnv?: (keyof T)[] | "all" | undefined;
  getEnv?: () => Record<string, string>;
}

declare const injectedEnv: Record<string, any>;

export const getProcessEnv = (): Record<string, string> => {
  let vars = {};

  // There are a couple of different way "env" vars can get into the app, lets gracefully handle them
  if (typeof process != "undefined" && process.env) vars = { ...vars, ...process.env };
  if (typeof injectedEnv != "undefined") vars = { ...vars, ...injectedEnv };

  // Lets strip out anything that is undefined
  return Object.fromEntries(
    Object.entries(vars).filter((e): e is [string, string] => e[1] != undefined),
  );
};

export const findEnvVar = (name: string): string | undefined => getProcessEnv()[name];

export const getEnvVar = (name: string, err?: string): string =>
  ensure(findEnvVar(name), err ?? `Could not find variable '${name}' in the environment`);

// export const produceConfig = <T extends BaseConfig>(
//   base: T,
//   { requiredInEnv, getEnv = getProcessEnv }: Options<T> = {}
// ): Readonly<T> => {
//   const envVars = getEnv();
//   const definedEnvKeys = Object.keys(envVars).filter((k) => k in base);
//   const baseKeys = Object.keys(base);
//
//   if (requiredInEnv) {
//     const baseKeysSet = new Set(baseKeys);
//     const definedKeysSet = new Set(definedEnvKeys);
//     const requiredKeys = new Set(requiredInEnv == "all" ? baseKeysSet : requiredInEnv);
//
//     if (!areSetsEqual(requiredKeys, definedKeysSet)) {
//       const difference = Array.from(getDifferenceBetweenSets(requiredKeys, definedKeysSet)).join(
//         ", "
//       );
//       throw new Error(
//         `Cannot produce config, missing the expected environment variables: '${difference}'`
//       );
//     }
//   }
//
//   return Object.freeze({
//     ...base,
//     ...pick(envVars, ...definedEnvKeys),
//   }) as any;
// };

export const selectBasedOnEnvironment = <T extends Record<string, string>>(
  values: {
    local: T;
    staging: T;
    main: T;
  },
  {
    environmentVarName = `BT_ENVIRONMENT`,
    defaultEnvironment = "local",
  }: {
    environmentVarName?: string;
    defaultEnvironment?: "local" | "staging" | "main";
  } = {},
): T => {
  const environment = findEnvVar(environmentVarName);
  const config = findInObj(values, environment ?? defaultEnvironment);
  if (!config) return ensure(values[defaultEnvironment]);
  return config;
};
