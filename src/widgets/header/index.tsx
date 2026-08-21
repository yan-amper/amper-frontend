"use client";

import { Phone, Menu, X, LayoutGrid, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "./styled";
import {
  formattedPhoneNumber,
  phoneNumber,
  SHOP_HOURS,
  useHideScroll,
} from "@/shared";
import { BatterySelectionButton } from "@/features";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  useHideScroll(menuOpen);

  // Переход по ссылке внутри меню не размонтирует шапку — закрываем руками.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.LogoContainer href={"/"} aria-label="Ампер — на главную">
            <S.Logo
              width={114}
              height={44}
              src={"/header-logo.svg"}
              alt="логотип Ампер"
              priority
            />
          </S.LogoContainer>

          <S.Nav>
            <S.NavLink href="/catalog?sort=ASC">Каталог</S.NavLink>
            <S.NavLink href="/#address">Наши адреса</S.NavLink>
          </S.Nav>

          <S.HeaderActions>
            <S.PhoneContainer>
              <Phone size={16} />
              <S.PhoneText
                href={`tel:${phoneNumber}`}
                aria-label={`Позвонить: ${formattedPhoneNumber}`}
              >
                {formattedPhoneNumber}
              </S.PhoneText>
            </S.PhoneContainer>

            <S.BatterySelectionButtonContainer>
              <BatterySelectionButton />
            </S.BatterySelectionButtonContainer>

            <S.BurgerButton
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </S.BurgerButton>
          </S.HeaderActions>
        </S.HeaderContent>
      </S.HeaderContainer>

      <S.MobileOverlay $open={menuOpen} onClick={closeMenu} aria-hidden="true" />

      <S.MobileMenu id="mobile-menu" $open={menuOpen}>
        <S.MobileLink href="/catalog?sort=ASC" onClick={closeMenu}>
          <LayoutGrid size={20} />
          Каталог
        </S.MobileLink>
        <S.MobileLink href="/#address" onClick={closeMenu}>
          <MapPin size={20} />
          Наши адреса
        </S.MobileLink>

        <S.MobileDivider />

        <S.MobilePhone href={`tel:${phoneNumber}`}>
          <Phone size={20} />
          {formattedPhoneNumber}
        </S.MobilePhone>
        <S.MobileHours>{SHOP_HOURS}</S.MobileHours>

        <S.MobileCta onClick={closeMenu}>
          <BatterySelectionButton />
        </S.MobileCta>
      </S.MobileMenu>
    </>
  );
};
