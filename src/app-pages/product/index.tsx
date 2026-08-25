import { ChevronRight, ArrowLeft, Phone } from "lucide-react";
import { Product } from "@/entities";
import {
  createImagePath,
  formattedPhoneNumber,
  phoneNumber,
  SHOP_STREET,
} from "@/shared";
import * as S from "./styled";

type ProductPageProps = {
  product: Product;
};

/**
 * Страница одного товара.
 *
 * Серверный компонент без единого «use client»: весь контент обязан быть
 * в исходном HTML — ради этого страница и заводилась. Интерактива здесь
 * нет, кроме ссылок, так что клиентский JS не нужен.
 *
 * Содержимое намеренно повторяет модалку из features/product-modal:
 * человек, пришедший из каталога по клику, и человек, пришедший из поиска
 * по прямой ссылке, должны увидеть одно и то же.
 */
export const ProductPage = ({ product }: ProductPageProps) => {
  const savings = product.standardPrice - product.priceWithChange;

  return (
    <S.ContentContainer>
      <S.Breadcrumbs aria-label="Хлебные крошки">
        <S.Crumb href="/">Главная</S.Crumb>
        <ChevronRight size={14} aria-hidden="true" />
        <S.Crumb href="/catalog?sort=ASC">Каталог</S.Crumb>
        <ChevronRight size={14} aria-hidden="true" />
        <S.CrumbCurrent aria-current="page">{product.title}</S.CrumbCurrent>
      </S.Breadcrumbs>

      <S.Card>
        <S.ImageSection>
          <S.BatteryImage
            width={520}
            height={520}
            sizes="(max-width: 1024px) 90vw, 420px"
            src={createImagePath(product.image)}
            alt={product.title}
            priority
          />
          <S.BrandBar aria-hidden="true">
            <S.BrandLogo src="/header-logo.svg" alt="" width={110} height={42} />
          </S.BrandBar>
        </S.ImageSection>

        <S.DetailsSection>
          <S.Title>{product.title}</S.Title>

          <S.SpecsContainer>
            <S.SpecItem>
              <S.SpecLabel>Ёмкость</S.SpecLabel>
              <S.SpecValue>{product.capacity} Ач</S.SpecValue>
            </S.SpecItem>
            <S.SpecItem>
              <S.SpecLabel>Пусковой ток</S.SpecLabel>
              <S.SpecValue>{product.current} А</S.SpecValue>
            </S.SpecItem>
            <S.SpecItem>
              <S.SpecLabel>Полярность</S.SpecLabel>
              <S.SpecValue>{product.polarity}</S.SpecValue>
            </S.SpecItem>
            <S.SpecItem>
              <S.SpecLabel>Габариты (Д×Ш×В)</S.SpecLabel>
              <S.SpecValue>
                {product.longitude}×{product.width}×{product.height} мм
              </S.SpecValue>
            </S.SpecItem>
            <S.SpecItem>
              <S.SpecLabel>Изготовитель</S.SpecLabel>
              <S.SpecValue>{product.manufacturer}</S.SpecValue>
            </S.SpecItem>
          </S.SpecsContainer>

          <S.PriceSection>
            <S.PriceRow>
              <S.PriceLabel>Обычная цена</S.PriceLabel>
              <S.OriginalPrice>{product.standardPrice} ₽</S.OriginalPrice>
            </S.PriceRow>
            <S.PriceRow>
              <S.PriceLabel>Цена со сдачей старого</S.PriceLabel>
              <S.CurrentPrice>{product.priceWithChange} ₽</S.CurrentPrice>
            </S.PriceRow>
            <S.PriceRow>
              <S.PriceLabel>Экономия</S.PriceLabel>
              <S.SavingsAmount>{savings} ₽</S.SavingsAmount>
            </S.PriceRow>
            <S.PriceNote>
              Цена со скидкой действует при сдаче старого аккумулятора
              ёмкостью {product.capacity} Ач.
            </S.PriceNote>
          </S.PriceSection>

          <S.ContactSection>
            <S.ContactText>
              Забрать можно в Таганроге, {SHOP_STREET}. Звоните — проверим
              аккумулятор и установим на месте.
            </S.ContactText>
            <S.PhoneLink href={`tel:${phoneNumber}`}>
              <Phone size={20} aria-hidden="true" />
              {formattedPhoneNumber}
            </S.PhoneLink>
          </S.ContactSection>

          <S.BackLink href="/catalog?sort=ASC">
            <ArrowLeft size={16} aria-hidden="true" />
            Вернуться в каталог
          </S.BackLink>
        </S.DetailsSection>
      </S.Card>
    </S.ContentContainer>
  );
};
