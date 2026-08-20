"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import * as S from "./styled";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

type PageToken = number | "ellipsis";

const getPageList = (current: number, total: number): PageToken[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: PageToken[] = [];

  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
};

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const pages = getPageList(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <S.PaginationNav aria-label="Страницы каталога">
      {isFirst ? (
        <S.PageButtonDisabled aria-disabled="true">
          <ChevronLeft size={18} />
        </S.PageButtonDisabled>
      ) : (
        <S.PageButton href={buildHref(currentPage - 1)}>
          <ChevronLeft size={18} />
        </S.PageButton>
      )}

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <S.Ellipsis key={`ellipsis-${i}`}>…</S.Ellipsis>
        ) : (
          <S.PageButton
            key={page}
            href={buildHref(page)}
            $active={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </S.PageButton>
        )
      )}

      {isLast ? (
        <S.PageButtonDisabled aria-disabled="true">
          <ChevronRight size={18} />
        </S.PageButtonDisabled>
      ) : (
        <S.PageButton href={buildHref(currentPage + 1)}>
          <ChevronRight size={18} />
        </S.PageButton>
      )}
    </S.PaginationNav>
  );
};
