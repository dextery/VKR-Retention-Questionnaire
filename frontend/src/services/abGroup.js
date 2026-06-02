const STORAGE_KEY = "survey_group"

export function getABGroup() {
  const savedGroup =
    localStorage.getItem(STORAGE_KEY)

  if (savedGroup) {
    return savedGroup
  }

  const random = Math.random()

  const group =
    random < 0.5
      ? "FPS"
      : "RPG"

  localStorage.setItem(
    STORAGE_KEY,
    group
  )

  return group
}