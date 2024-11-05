import type { UseFetchOptions } from 'nuxt/app';
import type {
  NitroFetchRequest,
  AvailableRouterMethod as _AvailableRouterMethod,
} from 'nitropack';
export interface UseFetchyOptions<
  _ResT,
  DataT,
  PickKeys extends KeysOf<DataT>,
  DefaultT,
  ReqT extends NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT>,
> extends UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method> {
  suppressErrorToast?: boolean;
}

export type PickFrom<T, K extends Array<string>> =
  T extends Array<any>
    ? T
    : T extends Record<string, any>
      ? keyof T extends K[number]
        ? T
        : K[number] extends never
          ? T
          : Pick<T, K[number]>
      : T;

export type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>;

export type AvailableRouterMethod<R extends NitroFetchRequest> =
  _AvailableRouterMethod<R>;
