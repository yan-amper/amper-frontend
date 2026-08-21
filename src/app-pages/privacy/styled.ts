"use client";

import Link from "next/link";
import styled from "styled-components";
import { media } from "@/shared";

export const Section = styled.section`
  flex: 1;
  background: var(--surface-muted);
  padding: 3rem 0 4rem;

  ${media.sm} {
    padding: 2rem 0 2.5rem;
  }
`;

export const Container = styled.div`
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const Card = styled.article`
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 2.5rem;

  ${media.sm} {
    padding: 1.5rem 1.25rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

export const Updated = styled.p`
  color: var(--text-subtle);
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

export const Heading = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 2rem 0 0.75rem;
`;

export const Text = styled.p`
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-bottom: 0.75rem;

  a {
    color: var(--color-brand);
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const List = styled.ul`
  margin: 0 0 0.75rem 1.25rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;

  li {
    margin-bottom: 0.35rem;
  }
`;

/* Явно подсвеченные места, которые владелец обязан заполнить своими
   реквизитами. Не убирать, пока данные не подставлены. */
export const Todo = styled.mark`
  background: #fff4cc;
  border-bottom: 1px dashed #b58100;
  color: #7a5600;
  padding: 0 0.15rem;
  font-style: italic;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  color: var(--color-brand);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
