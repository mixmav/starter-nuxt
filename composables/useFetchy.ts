/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { FetchError } from 'ofetch';
import type { AsyncData, FetchResult } from 'nuxt/app';
import type {
  AvailableRouterMethod,
  NitroFetchRequest,
  AvailableRouterMethod as _AvailableRouterMethod,
} from 'nitropack';
import type { KeysOf, PickFrom, UseFetchyOptions } from './types';

export function useFetchy<
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void
    ? 'get' extends AvailableRouterMethod<ReqT>
      ? 'get'
      : AvailableRouterMethod<ReqT>
    : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = DataT,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts: UseFetchyOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method> = {},
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null> {
  let errorMessage: string | null = null;
  const { $toast } = useNuxtApp();
  const globalStore = useGlobalStore();

  const result = useFetch<
    ResT,
    ErrorT,
    ReqT,
    Method,
    _ResT,
    DataT,
    PickKeys,
    DefaultT
  >(request, {
    immediate: false,
    onRequest: () => {
      globalStore.incrementLoading();
    },
    onResponse({ response }) {
      if (!response.ok) {
        errorMessage = response._data?.message || response.statusText;
      }
      globalStore.decrementLoading();
    },
    ...opts,
  });

  if (errorMessage && !opts.suppressErrorToast) {
    $toast.error(errorMessage);
  }
  return { ...result };
}
