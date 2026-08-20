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
  useHideScroll,
} from "@/shared";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export const ProductModal = () => {
  const product = useUnit(productsModel.$selectedProduct);
  const setSelectedProduct = useUnit(productsModel.setSelectedProduct);
  const getCurrentProductData = useUnit(productsModel.getCurrentProductData);

  const [mounted, setMounted] = useState(false);
  const [displayedProduct, setDisplayedProduct] = useState(product);

  const productId = Query.get("product");
  const isOpen = !!productId;
  const isLoading = isOpen && !displayedProduct;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      setDisplayedProduct(product);
    }
  }, [product]);

  useHideScroll(isOpen);

  useEffect(() => {
    if (isOpen && !product) {
      getCurrentProductData({ params: { id: +productId } });
    }
  }, [productId, isOpen, product, getCurrentProductData]);

  const onClose = () => setSelectedProduct(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <S.ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContent $isOpen={isOpen}>
        <S.ModalBody $isLoading={isLoading}>
          {displayedProduct ? (
            <>
              <S.ImageSection>
                <S.BatteryImage
                  width={376}
                  height={376}
                  src={createImagePath(displayedProduct.image)}
                  alt={displayedProduct.title}
                />
              </S.ImageSection>

              <S.DetailsSection>
                <S.BatteryTitleContainer>
                  <S.BatteryTitle>{displayedProduct.title}</S.BatteryTitle>
                  <S.CloseButton onClick={onClose}>
                    <X size={20} />
                  </S.CloseButton>
                </S.BatteryTitleContainer>

                <S.SpecsContainer>
                  <S.SpecItem>
                    <S.SpecLabel>Ёмкость:</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.capacity}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Пусковой ток:</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.current}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Полярность:</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.polarity}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Габариты:</S.SpecLabel>
                    <S.SpecValue>
                      {displayedProduct.longitude}x{displayedProduct.width}x
                      {displayedProduct.height}
                    </S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Изготовитель:</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.manufacturer}</S.SpecValue>
                  </S.SpecItem>
                </S.SpecsContainer>

                <S.PriceSection>
                  <S.PriceContainer>
                    <S.PriceRow>
                      <S.PriceLabel>Обычная цена:</S.PriceLabel>
                      <S.OriginalPrice>
                        {displayedProduct.standardPrice} ₽
                      </S.OriginalPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Цена со сдачей:</S.PriceLabel>
                      <S.CurrentPrice>
                        {displayedProduct.priceWithChange} ₽
                      </S.CurrentPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Экономия:</S.PriceLabel>
                      <S.SavingsAmount>
                        {displayedProduct.standardPrice -
                          displayedProduct.priceWithChange}{" "}
                        ₽
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
