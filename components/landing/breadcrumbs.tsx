import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export interface Crumb {
  name: string;
  /** Site-relative path. */
  path: string;
}

/** Visible breadcrumbs plus matching BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-[#475569]">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-x-2">
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.path} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <BreadcrumbJsonLd items={items} />
    </>
  );
}
