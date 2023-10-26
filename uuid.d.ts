declare module 'uuid' {
    export function v1(options?: any, buffer?: any, offset?: any): string;
    export function v3(name?: any, namespace?: any, buffer?: any, offset?: any): string;
    export function v4(options?: any, buffer?: any, offset?: any): string;
    export function v5(name?: any, namespace?: any, buffer?: any, offset?: any): string;
    export const NIL: string;
  }
  