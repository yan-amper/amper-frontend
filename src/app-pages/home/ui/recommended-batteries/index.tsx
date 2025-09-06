import * as S from "./styled";

const recommendedBatteries = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/159293/car-engine-motor-clean-159293.jpeg",
    name: "VARTA Blue Dynamic E11",
    capacity: "74 Ah",
    startCurrent: "680 A",
    polarity: "+/-",
    dimensions: "278x175x190",
    manufacturer: "VARTA",
    price: 12500,
    priceWithTrade: 9800,
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg",
    name: "Bosch S4 Silver",
    capacity: "60 Ah",
    startCurrent: "540 A",
    polarity: "+/-",
    dimensions: "242x175x190",
    manufacturer: "Bosch",
    price: 11200,
    priceWithTrade: 8900,
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
    name: "Mutlu Silver Evolution",
    capacity: "55 Ah",
    startCurrent: "450 A",
    polarity: "+/-",
    dimensions: "207x175x190",
    manufacturer: "Mutlu",
    price: 8900,
    priceWithTrade: 7200,
  },
];

export const RecommendedBatteries = () => (
  <S.Section>
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Рекомендуемые аккумуляторы</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.BatteriesGrid>
        {recommendedBatteries.map((battery) => (
          <S.BatteryCard key={battery.id}>
            <S.BatteryImageContainer>
              <S.BatteryImage src={battery.image} alt={battery.name} />
            </S.BatteryImageContainer>

            <S.BatteryContent>
              <S.BatteryName>{battery.name}</S.BatteryName>

              <S.SpecsList>
                <S.SpecItem>
                  <S.SpecLabel>Ёмкость:</S.SpecLabel>
                  <S.SpecValue>{battery.capacity}</S.SpecValue>
                </S.SpecItem>
                <S.SpecItem>
                  <S.SpecLabel>Пусковой ток:</S.SpecLabel>
                  <S.SpecValue>{battery.startCurrent}</S.SpecValue>
                </S.SpecItem>
                <S.SpecItem>
                  <S.SpecLabel>Полярность:</S.SpecLabel>
                  <S.SpecValue>{battery.polarity}</S.SpecValue>
                </S.SpecItem>
                <S.SpecItem>
                  <S.SpecLabel>Габариты:</S.SpecLabel>
                  <S.SpecValue>{battery.dimensions}</S.SpecValue>
                </S.SpecItem>
                <S.SpecItem>
                  <S.SpecLabel>Изготовитель:</S.SpecLabel>
                  <S.SpecValue>{battery.manufacturer}</S.SpecValue>
                </S.SpecItem>
              </S.SpecsList>

              <S.PriceSection>
                <S.PriceContainer>
                  <S.PriceInfo>
                    <S.OriginalPrice>
                      {battery.price.toLocaleString()} ₽
                    </S.OriginalPrice>
                    <S.CurrentPrice>
                      {battery.priceWithTrade.toLocaleString()} ₽
                    </S.CurrentPrice>
                    <S.PriceNote>со сдачей старого</S.PriceNote>
                  </S.PriceInfo>
                  <S.BuyButton>Купить</S.BuyButton>
                </S.PriceContainer>
              </S.PriceSection>
            </S.BatteryContent>
          </S.BatteryCard>
        ))}
      </S.BatteriesGrid>
    </S.Container>
  </S.Section>
);
