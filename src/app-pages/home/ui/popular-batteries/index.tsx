import * as S from "./styled";

const popularBatteries = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/159293/car-engine-motor-clean-159293.jpeg",
    name: "VARTA Silver Dynamic",
    capacity: "85 Ah",
    price: 14500,
    priceWithTrade: 11800,
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg",
    name: "Bosch S5 Silver Plus",
    capacity: "63 Ah",
    price: 12800,
    priceWithTrade: 10200,
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
    name: "Banner Starting Bull",
    capacity: "44 Ah",
    price: 7900,
    priceWithTrade: 6400,
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/159293/car-engine-motor-clean-159293.jpeg",
    name: "Exide Premium",
    capacity: "77 Ah",
    price: 13200,
    priceWithTrade: 10500,
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg",
    name: "Tudor High-Tech",
    capacity: "50 Ah",
    price: 9600,
    priceWithTrade: 7800,
  },
];

export const PopularBatteries = () => (
  <S.Section>
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Популярные аккумуляторы</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.FirstRow>
        {popularBatteries.slice(0, 3).map((battery) => (
          <S.BatteryCard key={battery.id}>
            <S.BatteryImageContainer>
              <S.BatteryImage src={battery.image} alt={battery.name} />
            </S.BatteryImageContainer>

            <S.BatteryContent>
              <S.BatteryName>{battery.name}</S.BatteryName>
              <S.BatteryCapacity>Ёмкость: {battery.capacity}</S.BatteryCapacity>

              <S.BatteryFooter>
                <S.PriceInfo>
                  <S.OriginalPrice>
                    {battery.price.toLocaleString()} ₽
                  </S.OriginalPrice>
                  <S.CurrentPrice>
                    {battery.priceWithTrade.toLocaleString()} ₽
                  </S.CurrentPrice>
                </S.PriceInfo>
              </S.BatteryFooter>
            </S.BatteryContent>
          </S.BatteryCard>
        ))}
      </S.FirstRow>

      <S.SecondRow>
        {popularBatteries.slice(3).map((battery) => (
          <S.BatteryCard key={battery.id}>
            <S.BatteryImageContainer>
              <S.BatteryImage src={battery.image} alt={battery.name} />
            </S.BatteryImageContainer>

            <S.BatteryContent>
              <S.BatteryName>{battery.name}</S.BatteryName>
              <S.BatteryCapacity>Ёмкость: {battery.capacity}</S.BatteryCapacity>

              <S.BatteryFooter>
                <S.PriceInfo>
                  <S.OriginalPrice>
                    {battery.price.toLocaleString()} ₽
                  </S.OriginalPrice>
                  <S.CurrentPrice>
                    {battery.priceWithTrade.toLocaleString()} ₽
                  </S.CurrentPrice>
                </S.PriceInfo>
              </S.BatteryFooter>
            </S.BatteryContent>
          </S.BatteryCard>
        ))}
      </S.SecondRow>
    </S.Container>
  </S.Section>
);
