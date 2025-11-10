import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  flex: 1;
  margin-top: 5rem;
  padding: 2rem 0;
  background: #f9fafb;
`;

export const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`;

export const RequestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const RequestCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e5e7eb;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #fecaca;
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
  color: #111827;
  margin: 0;
`;

export const RequestStatus = styled.span<{ $color: string }>`
  background: ${(props) => props.$color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
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
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
`;

export const DeliveryIcon = styled.div<{ $isDelivery: boolean }>`
  color: ${(props) => (props.$isDelivery ? "#dc2626" : "#059669")};
  display: flex;
  align-items: center;
`;

export const RequestDescription = styled.p`
  color: #6b7280;
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
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.$isActive ? "#dc2626" : "#e5e7eb")};
  background: ${(props) => (props.$isActive ? "#dc2626" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#374151")};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #dc2626;
    background: ${(props) => (props.$isActive ? "#b91c1c" : "#fef2f2")};
    color: ${(props) => (props.$isActive ? "white" : "#dc2626")};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const NoRequests = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
  }
`;
