export class Path {
  public static GET_JSON_URL = import.meta.env.VITE_GET_JSON_URL

  public static media = (username: string, fileName: string) =>
    [import.meta.env.VITE_MEDIA_BASE_URL, username, fileName].join('/')
}
