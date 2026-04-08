import { useReducer } from 'react'

import { INITIAL_VISIT_STATE } from './constants'

import type { IVisitState, TStepStatus } from './@types'
import type { IStore } from '@types'

type TVisitAction =
  | { type: 'INIT_VISIT'; payload: { stores: IStore[] } }
  | { type: 'START_VISIT'; payload: { storeId: number } }
  | { type: 'UPDATE_STEP'; payload: { storeId: number; stepStatus: TStepStatus; stepId: string } }

function updateVisit({
  draft,
  storeId,
  updater
}: {
  draft: Record<number, IVisitState> | null
  storeId: number
  updater: (draft: IVisitState) => IVisitState
}) {
  return draft ? { ...draft, [storeId]: updater(draft[storeId]) } : null
}

const visitReducer = (state: Record<number, IVisitState> | null, action: TVisitAction) => {
  switch (action.type) {
    case 'INIT_VISIT':
      return Object.fromEntries(
        action.payload.stores.map((s) => {
          if (state?.[s.id]) {
            return [s.id, state[s.id]]
          }

          return [s.id, INITIAL_VISIT_STATE]
        })
      )

    case 'START_VISIT':
      return updateVisit({
        draft: state ?? {},
        storeId: action.payload.storeId,
        updater: (visit) => ({ ...visit, status: 'В процессе', started: true })
      })

    case 'UPDATE_STEP':
      return updateVisit({
        draft: state ?? {},
        storeId: action.payload.storeId,
        updater: (draft) => ({
          ...draft,
          status: 'В процессе',
          started: true,
          stepStatuses: {
            ...draft.stepStatuses,
            [action.payload.stepId]: action.payload.stepStatus
          }
        })
      })

    default:
      return state
  }
}

export const useVisitStore = () => {
  const [visitState, dispatch] = useReducer(visitReducer, null)

  const initVisit = (stores: IStore[]) => {
    dispatch({ type: 'INIT_VISIT', payload: { stores: stores } })
  }

  const startVisit = (storeId: number) => {
    dispatch({ type: 'START_VISIT', payload: { storeId } })
  }

  const updateVisitStep = (storeId: number, stepStatus: TStepStatus, stepId: string) => {
    dispatch({ type: 'UPDATE_STEP', payload: { storeId, stepStatus, stepId } })
  }

  return {
    visitState,
    initVisit,
    startVisit,
    updateVisitStep
  }
}
