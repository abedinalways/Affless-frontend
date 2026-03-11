import { getRouteConfig, getRouteHref } from "@/helper/routes";

export type SourceBreadcrumbLink = {
  label: string;
  href?: string;
};

type BuildSourceBreadcrumbsOptions = {
  currentLabel?: string;
  fallbackBase?: SourceBreadcrumbLink[];
};

export const buildSourceBreadcrumbs = (
  source?: string | null,
  options: BuildSourceBreadcrumbsOptions = {}
): SourceBreadcrumbLink[] => {
  const {
    currentLabel,
    fallbackBase = [{ label: "Home", href: "/" }],
  } = options;

  const parsedBase = (source?.split("_") || []).reduce<SourceBreadcrumbLink[]>(
    (acc, token) => {
      const [rawKey, ...parts] = token.split(":").filter(Boolean);

      if (!rawKey) {
        return acc;
      }

      const route = getRouteConfig(rawKey);

      if (!route) {
        return acc;
      }

      acc.push({
        label: route.label,
        href: getRouteHref(rawKey, ...parts),
      });

      return acc;
    },
    []
  );

  const base = parsedBase.length > 0 ? parsedBase : fallbackBase;

  if (!currentLabel) {
    return [...base];
  }

  return [...base, { label: currentLabel }];
};