let allowProgrammaticPop = false

const allowNextProgrammaticPop = () => {
  allowProgrammaticPop = true
}

const shouldBlockPopNavigation = () => {
  if (allowProgrammaticPop) {
    allowProgrammaticPop = false
    return false
  }

  return true
}

export const programmaticNavigation = {
  allowNextProgrammaticPop,
  shouldBlockPopNavigation
}
