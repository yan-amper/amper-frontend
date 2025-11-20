"use client";

import { X, Phone } from "lucide-react";
import * as S from "./styled";
import { useUnit } from "effector-react";
import { productsModel } from "@/entities";
import {
  createImagePath,
  formattedPhoneNumber,
  phoneNumber,
  Query,
} from "@/shared";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export const ProductModal = () => {
  const product = useUnit(productsModel.$selectedProduct);
  const setSelectedProduct = useUnit(productsModel.setSelectedProduct);
  const getCurrentProductData = useUnit(productsModel.getCurrentProductData);

  const productId = Query.get("product");
  const isOpen = !!productId;
  const isLoading = !!productId && !product;

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !product) {
      getCurrentProductData({ params: { id: +productId } });
    }
  }, [productId, isOpen, product, getCurrentProductData]);

  if (!isOpen) return null;

  const onClose = () => setSelectedProduct(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <S.ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.ModalBody $isLoading={isLoading}>
          {product ? (
            <>
              <S.ImageSection>
                <S.BatteryImage
                  width={376}
                  height={376}
                  src={createImagePath(product.image)}
                  alt={product.title}
                />
                <S.CardLogo
                  width={100}
                  height={50}
                  src={"/header-logo.svg"}
                  alt="логотип Ампер"
                />
                <S.CardLine />
              </S.ImageSection>

              <S.DetailsSection>
                <S.BatteryTitleContainer>
                  <S.BatteryTitle>{product.title}</S.BatteryTitle>
                  <S.CloseButton onClick={onClose}>
                    <X size={20} />
                  </S.CloseButton>
                </S.BatteryTitleContainer>

                <S.SpecsContainer>
                  <S.SpecItem>
                    <S.SpecLabel>Ёмкость:</S.SpecLabel>
                    <S.SpecValue>{product.capacity}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Пусковой ток:</S.SpecLabel>
                    <S.SpecValue>{product.current}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Полярность:</S.SpecLabel>
                    <S.SpecValue>{product.polarity}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Габариты:</S.SpecLabel>
                    <S.SpecValue>
                      {product.longitude}x{product.width}x{product.height}
                    </S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Изготовитель:</S.SpecLabel>
                    <S.SpecValue>{product.manufacturer}</S.SpecValue>
                  </S.SpecItem>
                </S.SpecsContainer>

                <S.PriceSection>
                  <S.PriceContainer>
                    <S.PriceRow>
                      <S.PriceLabel>Обычная цена:</S.PriceLabel>
                      <S.OriginalPrice>
                        {product.standardPrice} ₽
                      </S.OriginalPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Цена со сдачей:</S.PriceLabel>
                      <S.CurrentPrice>
                        {product.priceWithChange} ₽
                      </S.CurrentPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Экономия:</S.PriceLabel>
                      <S.SavingsAmount>
                        {product.standardPrice - product.priceWithChange} ₽
                      </S.SavingsAmount>
                    </S.PriceRow>
                  </S.PriceContainer>
                </S.PriceSection>

                <S.ContactSection>
                  <S.ContactText>
                    Для заказа или уточнения деталей обращайтесь по номеру
                    телефона:
                  </S.ContactText>
                  <S.PhoneLink href={`tel:${phoneNumber}`}>
                    <Phone size={20} />
                    {formattedPhoneNumber}
                  </S.PhoneLink>
                </S.ContactSection>
              </S.DetailsSection>
            </>
          ) : (
            <S.LoadingTitle>Загрузка...</S.LoadingTitle>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  );
};
