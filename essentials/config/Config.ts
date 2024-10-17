import { ensure } from "../misc/ensure";
import { getProcessEnv } from "./configUtils";

export class Config<T extends Record<string, string>> {
  private map: Map<keyof T, string>;

  constructor(initial: T) {
    this.map = new Map(Object.entries(initial)) as any;
  }

  find<U extends keyof T>(key: U): string | undefined {
    return this.map.get(key) as any;
  }

  get<U extends keyof T>(key: U): string {
    const value = ensure(this.find(key), `Could not find key '${String(key)}' in config`);
    if (value == "") throw new Error(`Missing required key '${String(key)}' in environment`);
    return value;
  }

  has<U extends keyof T>(key: U): boolean {
    return this.map.has(key);
  }

  isTrue<U extends keyof T>(key: U): boolean {
    return this.get(key).toLowerCase().trim() == "true";
  }

  set<U extends keyof T>(key: U, value: string) {
    this.map.set(key, value);
    return this;
  }

  overlayEnv({
    requiredKeys,
    env = getProcessEnv(),
  }: {
    env?: Record<string, string>;
    requiredKeys?: (keyof T)[] | "all" | undefined;
  } = {}) {
    for (const key of this.map.keys()) {
      const envValue = env[String(key)];
      if (envValue == undefined) {
        if (requiredKeys == "all" || (requiredKeys && requiredKeys.includes(key)))
          throw new Error(`Missing required key '${String(key)}' in environment`);
      } else this.map.set(key, envValue);
    }
    return this;
  }

  toString() {
    return Object.fromEntries(this.map.entries());
  }
}
