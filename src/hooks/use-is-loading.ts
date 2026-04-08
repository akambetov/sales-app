import { useIsFetching } from '@tanstack/react-query'

export const useIsLoading = () => {
  const isFetching = useIsFetching()

  return isFetching > 0
}
