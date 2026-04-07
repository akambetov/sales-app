import { Card } from '@components'

import type { IStore } from '@types'

export const StoreContacts = ({ store }: { store: IStore }) => (
  <Card className="p-4">
    <div className="text-xs text-slate-500">Адрес</div>
    <div className="mt-1 text-sm font-medium text-slate-900">{store.address}</div>
    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
      <div>
        <div className="text-xs text-slate-500">Контакт</div>
        <div className="mt-1 font-medium text-slate-900">{store.contact}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500">Телефон</div>
        <div className="mt-1 font-medium text-slate-900">{store.phone}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500">Договор</div>
        <div className="mt-1 font-medium text-slate-900">{store.contractNo}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500">Отсрочка</div>
        <div className="mt-1 font-medium text-slate-900">{store.delayDays} дней</div>
      </div>
    </div>
  </Card>
)
