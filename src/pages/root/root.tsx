import { useBlocker } from 'react-router'

import { Layout } from '@components'
import { programmaticNavigation } from '@utils'

import { Spinner } from '../../components/spinner'
import { UserProvider } from '../../contexts/user-context'

import { useRootQuery } from './query'

const Root = () => {
  useBlocker(
    ({ historyAction }) =>
      historyAction === 'POP' && programmaticNavigation.shouldBlockPopNavigation()
  )
  const { data, isFetching } = useRootQuery()
  const isLoading = isFetching && !data

  return isLoading ? (
    <Spinner fullscreen />
  ) : (
    <UserProvider value={data}>
      <Layout />
    </UserProvider>
  )
}

export default Root
