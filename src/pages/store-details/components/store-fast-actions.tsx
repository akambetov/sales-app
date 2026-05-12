import { FileText, Phone, Route, Wallet } from 'lucide-react'
import { useState } from 'react'

import { twoGisLogo, yandexMapsLogo } from '@assets'
import { Card, Modal, SectionTitle } from '@components'
import { routeCoordinatesSeed } from '@seeds'

import type { IStore } from '@types'

export const StoreFastActions = ({ store }: { store: IStore }) => {
  const [routeModalOpen, setRouteModalOpen] = useState(false)

  const storeCoordinates = routeCoordinatesSeed.find(
    (point) => point.storeId === store.id
  )?.position

  const pointCoordinates = storeCoordinates
    ? `${storeCoordinates.lng},${storeCoordinates.lat}`
    : null
  const yandexMapsUrl = pointCoordinates
    ? `https://yandex.ru/maps/?whatshere[point]=${pointCoordinates}&whatshere[zoom]=17`
    : null
  const twoGisUrl = pointCoordinates
    ? `https://2gis.kz/shymkent/geo/${pointCoordinates}?m=${pointCoordinates}/17`
    : null

  const handleRouteModalOpen = () => {
    setRouteModalOpen(true)
  }

  const handleRouteModalClose = () => {
    setRouteModalOpen(false)
  }

  return (
    <Card className="p-4">
      <SectionTitle title="Быстрые действия" />
      <div className="grid grid-cols-4 gap-3 text-center text-xs">
        <button className="rounded-3xl bg-slate-50 p-3">
          <Phone className="mx-auto mb-2" size={18} />
          <a href={`tel:${store.phone}`} className="block">
            Позвонить
          </a>
        </button>
        <button className="rounded-3xl bg-slate-50 p-3" onClick={handleRouteModalOpen}>
          <Route className="mx-auto mb-2" size={18} />
          Маршрут
        </button>
        <button className="rounded-3xl bg-slate-50 p-3">
          <FileText className="mx-auto mb-2" size={18} />
          История
        </button>
        <button
          className="rounded-3xl bg-slate-50 p-3"
          onClick={() => {
            // setSelectedDebtStoreId(selectedStore.id)
            // setPage('debtInvoices')
          }}
        >
          <Wallet className="mx-auto mb-2" size={18} />
          Долги
        </button>
      </div>
      <Modal open={routeModalOpen} title="Построить маршрут" onClose={handleRouteModalClose}>
        <div className="flex flex-col gap-6 mb-6">
          {yandexMapsUrl ? (
            <a
              href={yandexMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <img src={yandexMapsLogo} alt="Yandex Maps" width="30" height="30" />
              Яндекс.Карты
            </a>
          ) : null}
          {twoGisUrl ? (
            <a
              href={twoGisUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <img src={twoGisLogo} alt="2GIS" width="30" height="30" />
              2GIS
            </a>
          ) : null}
          {!storeCoordinates ? (
            <div className="text-sm text-slate-500">Координаты магазина не указаны</div>
          ) : null}
        </div>
        <button
          type="button"
          className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          onClick={handleRouteModalClose}
        >
          Закрыть
        </button>
      </Modal>
    </Card>
  )
}
