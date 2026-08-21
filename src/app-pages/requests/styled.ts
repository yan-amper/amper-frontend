import styled from "styled-components";
import { media } from "@/shared";

export const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  flex: 1;
  /* margin-top: 5rem убран. 80px было меньше реальной высоты шапки (108px),
     и заголовок «Заявки пользователей» подлезал под неё. Отступ под шапку
     теперь один на весь сайт — в <main> через --header-h. */
  padding: 2rem 0;
  background: var(--surface-muted);
`;

export const MainContent = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
`;

export const RequestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const RequestCard = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-slow);
  border: 1px solid var(--border-default);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
    border-color: var(--color-brand-border);
  }
`;

export const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const RequestNumber = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
`;

export const RequestStatus = styled.span<{ $color: string }>`
  background: ${(props) => props.$color};
  color: var(--text-on-brand);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-xl);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const RequestInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: var(--surface-sunken);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

export const DeliveryIcon = styled.div<{ $isDelivery: boolean }>`
  color: ${(props) => (props.$isDelivery ? "var(--color-brand)" : "var(--color-success)")};
  display: flex;
  align-items: center;
`;

export const RequestDescription = styled.p`
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
  font-size: 0.875rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: 2px solid ${(props) => (props.$isActive ? "var(--color-brand)" : "var(--border-default)")};
  background: ${(props) => (props.$isActive ? "var(--color-brand)" : "var(--text-on-brand)")};
  color: ${(props) => (props.$isActive ? "var(--text-on-brand)" : "var(--text-secondary)")};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: var(--color-brand);
    background: ${(props) => (props.$isActive ? "var(--color-brand-hover)" : "var(--color-brand-soft)")};
    color: ${(props) => (props.$isActive ? "var(--text-on-brand)" : "var(--color-brand)")};
  }

  ${media.md} {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const NoRequests = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
  }

  p {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.875rem;
  }
`;
