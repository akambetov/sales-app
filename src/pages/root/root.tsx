import { useBlocker } from 'react-router'

import { Layout } from '@components'
import { programmaticNavigation } from '@utils'

import { UserProvider } from '../../contexts/user-context'

import { useRootQuery } from './query'

const Root = () => {
  useBlocker(
    ({ historyAction }) =>
      historyAction === 'POP' && programmaticNavigation.shouldBlockPopNavigation()
  )
  const { data } = useRootQuery()

  if (!data) {
    return null
  }

  return (
    <UserProvider value={data}>
      <Layout />
    </UserProvider>
  )
}

export default Root
