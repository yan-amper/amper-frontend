"use client";

import Link from "next/link";
import styled from "styled-components";
import { BatterySelectionButton } from "@/features";
import { media } from "@/shared";

export const Section = styled.section`
  background: var(--surface);
  padding: 3rem 0 0;

  ${media.sm} {
    padding: 2rem 0 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const Intro = styled.div`
  max-width: 46rem;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1rem;

  ${media.md} {
    font-size: 2rem;
  }

  ${media.sm} {
    font-size: 1.625rem;
  }
`;

export const Accent = styled.span`
  color: var(--color-brand);
`;

export const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: var(--text-muted);
  max-width: 40rem;
  margin: 0 auto 2rem;

  ${media.sm} {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const PrimaryAction = styled(BatterySelectionButton)`
  height: 56px;
  padding: 0 2rem;
  font-size: 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-brand);

  ${media.sm} {
    /* На телефоне главный CTA занимает всю ширину — по нему проще попасть,
       и он читается как основное действие экрана. */
    width: 100%;
    height: 52px;
  }
`;

export const SecondaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 56px;
  padding: 0 1.75rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-brand);
  background: transparent;
  color: var(--color-brand);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-soft);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.sm} {
    width: 100%;
    height: 52px;
  }
`;

export const TrustStrip = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 1.5rem;
  list-style: none;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-default);

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

export const TrustItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.35;

  ${media.sm} {
    font-size: 0.875rem;
  }
`;

export const TrustIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  background: var(--color-brand-soft);
  color: var(--color-brand);

  ${media.sm} {
    width: 2.25rem;
    height: 2.25rem;
  }
`;
