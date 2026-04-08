import { useNavigate } from 'react-router'

import { programmaticNavigation } from '@utils'

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const goBack = () => {
    programmaticNavigation.allowNextProgrammaticPop()
    navigate(-1)
  }

  return { goBack }
}
