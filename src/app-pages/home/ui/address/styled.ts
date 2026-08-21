"use client";

import Image from "next/image";
import styled from "styled-components";
import { media } from "@/shared";

export const Section = styled.section`
  padding: 4rem 0;
  background: var(--surface);

  ${media.sm} {
    padding: 2.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const ContentGrid = styled.div`
  display: grid;
  gap: 2rem;

  ${media.lgUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  min-height: 400px;

  ${media.lg} {
    min-height: 320px;
  }
`;

export const Map = styled.iframe`
  border-radius: var(--radius-lg);
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 320px;
  border: 1px solid var(--border-default);
`;

export const MapFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const RouteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border: 1.5px solid var(--color-brand);
  border-radius: var(--radius-md);
  color: var(--color-brand);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-soft);
    transform: translateY(-1px);
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StoreImage = styled(Image)`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  border-radius: var(--radius-lg);

  ${media.sm} {
    height: 12rem;
  }
`;

export const ContactCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactIcon = styled.div`
  color: var(--color-brand);
  margin-top: 0.15rem;
  flex-shrink: 0;
`;

export const ContactContent = styled.div``;

export const ContactTitle = styled.h3`
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

export const ContactText = styled.p`
  color: var(--text-muted);
  margin: 0;
`;

/* Телефон раньше красился в тот же серый, что и обычный текст рядом,
   и по нему было не видно, что это ссылка. */
export const ContactPhone = styled.a`
  color: var(--color-brand);
  font-weight: 700;
  font-size: 1.125rem;
  text-decoration: none;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand-hover);
    text-decoration: underline;
  }
`;

export const WorkingHours = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-default);

  p {
    margin: 0.25rem 0;
  }

  strong {
    color: var(--text-primary);
  }
`;

export const RatingBadge = styled.iframe`
  border: none;
  flex-shrink: 0;
`;
