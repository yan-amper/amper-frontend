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
  useModalA11y,
} from "@/shared";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

export const ProductModal = () => {
  const product = useUnit(productsModel.$selectedProduct);
  const setSelectedProduct = useUnit(productsModel.setSelectedProduct);
  const getCurrentProductData = useUnit(productsModel.getCurrentProductData);

  const [mounted, setMounted] = useState(false);
  const [displayedProduct, setDisplayedProduct] = useState(product);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const onClose = useCallback(
    () => setSelectedProduct(null),
    [setSelectedProduct]
  );

  useHideScroll(isOpen);
  useModalA11y(isOpen, onClose, contentRef);

  useEffect(() => {
    if (isOpen && !product) {
      getCurrentProductData({ params: { id: +productId } });
    }
  }, [productId, isOpen, product, getCurrentProductData]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <S.ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContent
        $isOpen={isOpen}
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={displayedProduct?.title ?? "Карточка товара"}
      >
        <S.CloseButton onClick={onClose} aria-label="Закрыть карточку товара">
          <X size={20} aria-hidden="true" />
        </S.CloseButton>

        <S.ModalBody $isLoading={isLoading}>
          {displayedProduct ? (
            <>
              <S.ImageSection>
                <S.ImageFrame>
                  <S.BatteryImage
                    width={376}
                    height={376}
                    sizes="(max-width: 768px) 260px, 360px"
                    src={createImagePath(displayedProduct.image)}
                    alt={displayedProduct.title}
                  />
                </S.ImageFrame>
              </S.ImageSection>

              <S.DetailsSection>
                <S.BatteryTitle>{displayedProduct.title}</S.BatteryTitle>

                <S.SpecsContainer>
                  <S.SpecItem>
                    <S.SpecLabel>Ёмкость</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.capacity} Ач</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Пусковой ток</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.current} А</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Полярность</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.polarity}</S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Габариты</S.SpecLabel>
                    <S.SpecValue>
                      {displayedProduct.longitude}×{displayedProduct.width}×
                      {displayedProduct.height} мм
                    </S.SpecValue>
                  </S.SpecItem>
                  <S.SpecItem>
                    <S.SpecLabel>Изготовитель</S.SpecLabel>
                    <S.SpecValue>{displayedProduct.manufacturer}</S.SpecValue>
                  </S.SpecItem>
                </S.SpecsContainer>

                <S.PriceSection>
                  <S.PriceContainer>
                    <S.PriceRow>
                      <S.PriceLabel>Обычная цена</S.PriceLabel>
                      <S.OriginalPrice>
                        {displayedProduct.standardPrice} ₽
                      </S.OriginalPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Цена со сдачей старого</S.PriceLabel>
                      <S.CurrentPrice>
                        {displayedProduct.priceWithChange} ₽
                      </S.CurrentPrice>
                    </S.PriceRow>
                    <S.PriceRow>
                      <S.PriceLabel>Экономия</S.PriceLabel>
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
                    Для заказа или уточнения деталей звоните:
                  </S.ContactText>
                  <S.PhoneLink href={`tel:${phoneNumber}`}>
                    <Phone size={20} aria-hidden="true" />
                    {formattedPhoneNumber}
                  </S.PhoneLink>
                </S.ContactSection>
              </S.DetailsSection>
            </>
          ) : (
            <S.LoadingTitle>Загружаем карточку…</S.LoadingTitle>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  );
};
