type TStepStatus = 'Не начат' | 'Выполнен' | 'Выполнен с отклонением'

type TVisitStatus =
  | 'Не начат'
  | 'В процессе'
  | 'Завершен'
  | 'Просрочен'
  | 'Выполнен с отклонением'
  | 'Выполнен'

export type { TStepStatus, TVisitStatus }
