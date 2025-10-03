import Image from "next/image";
import styled from "styled-components";

export const BatteryCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0px 10px 20px 0px rgba(8, 9, 9, 0.2);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 10px 20px 8px rgba(8, 9, 9, 0.2);
  }
`;

export const BatteryImageContainer = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
  padding: 30px;
  position: relative;
`;

export const BatteryImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid #dc2626;
  border-radius: 10px;
`;

export const CardLogo = styled(Image)`
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 4px;
`;

export const BatteryContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
`;

export const BatteryName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

export const SpecsList = styled.div`
  margin-bottom: 1.5rem;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

export const SpecLabel = styled.span`
  color: #6b7280;
`;

export const SpecValue = styled.span`
  color: #111827;
  font-weight: 500;
  text-align: end;
`;

export const PriceSection = styled.div`
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceInfo = styled.div``;

export const OriginalPrice = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: line-through;
`;

export const CurrentPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc2626;
`;

export const PriceNote = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const BuyButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #b91c1c;
  }
`;
