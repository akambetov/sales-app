import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import { useEffect, useMemo, useRef } from 'react'

import { routeCoordinatesSeed } from '@seeds'
import { cn, statusTone } from '@utils'
import './style.css'

import type { IStore } from '@types'

interface IRouteMapProperties {
  stores: IStore[]
  isLoading?: boolean
  onSelectStore: (storeId: IStore['id']) => void
}

const fallbackMarkerColor = '#64748b'

const markerColors: Partial<Record<IStore['status'], string>> = {
  'Не начат': '#64748b',
  'В процессе': '#2563eb',
  Завершен: '#059669',
  Просрочен: '#dc2626'
}

const getRoutePoints = (stores: IStore[]) =>
  stores
    .map((store) => {
      const coordinates = routeCoordinatesSeed.find((point) => point.storeId === store.id)

      return coordinates ? { store, position: coordinates.position } : null
    })
    .filter((point) => point !== null)

const RouteMap = ({ stores, isLoading, onSelectStore }: IRouteMapProperties) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const points = useMemo(() => getRoutePoints(stores), [stores])

  useEffect(() => {
    if (!mapRef.current || isLoading || points.length === 0) {
      return
    }

    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: true
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    L.polyline(
      points.map((point) => point.position),
      {
        color: '#0f172a',
        opacity: 0.58,
        weight: 3,
        dashArray: '8 8'
      }
    ).addTo(map)

    points.forEach(({ position, store }, index) => {
      const color = markerColors[store.status] ?? fallbackMarkerColor
      const marker = L.marker(position, {
        icon: L.divIcon({
          className: '',
          html: `<span class="route-map-marker" style="--route-marker-color: ${color}">${index + 1}</span>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      })

      marker
        .bindTooltip(
          `<strong>${store.name}</strong><br/><span>${store.address}</span><br/><span>${store.visitWindow}</span>`,
          {
            direction: 'top',
            offset: [0, -12],
            className: 'route-map-tooltip'
          }
        )
        .on('click', () => {
          onSelectStore(store.id)
        })
        .addTo(map)
    })

    const bounds = L.latLngBounds(points.map((point) => point.position))
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: 14 })

    return () => {
      map.remove()
    }
  }, [isLoading, onSelectStore, points])

  return (
    <>
      <div className="p-4 mb-2">
        <div className="text-xs font-medium uppercase text-slate-500">Карта маршрута</div>
        <div className="mt-1 text-lg font-semibold text-slate-950">Шымкент</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(markerColors).map(([status, color]) => (
            <span
              key={status}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
                statusTone(status as IStore['status'])
              )}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {status}
            </span>
          ))}
        </div>
      </div>
      <div className="relative min-h-105 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
        <div ref={mapRef} className="absolute inset-0 z-0" />
        {isLoading ? (
          <div className="absolute inset-0 z-1 animate-pulse bg-slate-100" />
        ) : points.length === 0 ? (
          <div className="absolute inset-0 z-1 flex items-center justify-center px-6 text-center text-sm text-slate-500">
            Нет координат для выбранных торговых точек
          </div>
        ) : null}
      </div>
    </>
  )
}

export { RouteMap }
