interface FakeNetworkData {
  data: Record<string, unknown>
}

export const fakeNetwork = <Data extends FakeNetworkData>({
  delay = 500,
  response = { data: {} } as Data
}: {
  delay?: number
  response?: Data
}) =>
  new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, delay)
  })
