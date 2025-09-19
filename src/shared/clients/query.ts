export class Query {
  static get(key: string): string | null {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get(key);
  }

  static set(key: string, value: string) {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.history.replaceState({}, "", "?" + params.toString());
  }

  static remove(key: string) {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    const query = params.toString();
    window.history.replaceState(
      {},
      "",
      query ? "?" + query : window.location.pathname
    );
  }
}
