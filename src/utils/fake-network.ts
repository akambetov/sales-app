interface FakeNetworkData {
  data: Record<string, unknown>
}

export const fakeNetwork = <Data extends FakeNetworkData>({
  delay = 500,
  data = { data: {} } as Data
}: {
  delay?: number
  data?: Data
}) =>
  new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
