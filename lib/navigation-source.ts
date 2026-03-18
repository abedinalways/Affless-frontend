export const NAV_SOURCE_QUERY_KEY = "source";

type SearchParamsLike = {
  get: (key: string) => string | null;
};

export const normalizeNavigationSource = (
  value?: string | null
): string | undefined => {
  const normalized = value?.trim();
  return normalized ? normalized : "";
};

export const getNavigationSource = (
  searchParams: SearchParamsLike
): string | undefined => {
  return (
    normalizeNavigationSource(searchParams.get(NAV_SOURCE_QUERY_KEY)) ||
    normalizeNavigationSource(searchParams.get("redirect")) ||
    normalizeNavigationSource(searchParams.get("return"))
  );
};

export const appendNavigationSource = (
  path: string,
  source?: string | null
): string => {
  const normalizedSource = normalizeNavigationSource(source);

  if (!normalizedSource) {
    return path;
  }

  const [pathname, query = ""] = path.split("?");
  const params = new URLSearchParams(query);

  if (!params.has(NAV_SOURCE_QUERY_KEY)) {
    params.set(NAV_SOURCE_QUERY_KEY, normalizedSource);
  }

  const serialized = params.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
};
