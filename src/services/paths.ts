export const getJsonUrl = './getjson.php'

export const createUserPath = (username: string) => `/${username}`

export const createMediaPath = (username: string, mediaName: string) =>
  `./data/${username}/${mediaName}`
