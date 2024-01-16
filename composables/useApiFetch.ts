import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <T>(
  url: string,
  options: UseFetchOptions<T> = {}
): any => {
  const config = useRuntimeConfig()
  options.baseURL = config.public.apiBaseUrl
  options.key = url

  return useFetch(url, {
    ...options,
    onRequest: ({ options }: { options: any }) => {
      options.headers = options.headers || {}
      // if (accessToken.value) {
      //   options.headers.authorization = `Bearer ${accessToken.value}`
      // }
    },
    onResponseError: ({
      response
    }: {
      response: any
    }) => {
      if (response.status === 401) {
        // logic to refresh token
      }
    }
  })
}
