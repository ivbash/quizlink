/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export type DIToken = string | symbol | Function;

type ResolveToken<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends Function
    ? any
    : any;

export interface DIProvider<T extends DIToken[] = DIToken[]> {
  factory: (...deps: { [K in keyof T]: ResolveToken<T[K]> }) => any;
  inject?: [...T];
}

export class DIContainer {
  private instances = new Map<DIToken, any>();
  private providers = new Map<DIToken, DIProvider>();

  register<T extends DIToken[]>(token: DIToken, provider: DIProvider<T>) {
    this.providers.set(token, provider);
    return this;
  }

  resolve<T>(token: DIToken): T {
    return this._resolve(token, new Set<DIToken>());
  }

  private _resolve(token: DIToken, resolvingTokens: Set<DIToken>) {
    if (resolvingTokens.has(token)) {
      const chain = formatChain([...resolvingTokens, token]);
      throw new Error(`Circular dependency detected: ${chain}.`);
    }
    resolvingTokens.add(token);

    if (this.instances.has(token)) {
      return this.instances.get(token);
    }

    const provider = this.providers.get(token);
    if (!provider) {
      throw new Error(`Provider for token "${formatToken(token)}" not found.`);
    }

    try {
      const resolvedDeps =
        provider.inject?.map((token) =>
          this._resolve(token, resolvingTokens),
        ) ?? [];
      const instance = provider.factory(...resolvedDeps);
      this.instances.set(token, instance);
      return instance;
    } finally {
      resolvingTokens.delete(token);
    }
  }
}

export function formatChain(chain: DIToken[]) {
  return chain.map(formatToken).join(' > ');
}

export function formatToken(token: DIToken) {
  switch (typeof token) {
    case 'string':
      return token;
    case 'function':
      return token.name;
    default:
      return token.toString();
  }
}
