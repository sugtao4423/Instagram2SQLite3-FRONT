export const getJsonUrl = import.meta.env.VITE_GET_JSON_URL

export const createUserPath = (username: string) => `/${username}`

export const createMediaPath = (username: string, fileName: string) =>
  `${import.meta.env.VITE_MEDIA_BASE_URL}/${username}/${fileName}`
