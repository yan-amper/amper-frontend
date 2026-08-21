"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import {
  X,
  CircleCheck as CheckCircle,
  Phone,
  Globe,
  ArrowLeft,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as S from "./styled";
import {
  formattedPhoneNumber,
  phoneNumber,
  useHideScroll,
  useModalA11y,
} from "@/shared";
import { useUnit } from "effector-react";
import { appState } from "@/entities";
import { submitForm } from "./actions";

export type FormData = {
  car_brand: string;
  car_model: string;
  engine_type: string;
  engine_volume: string;
  production_year: string;
  delivery_method: string;
  phone: string;
};

type FormErrors = Record<string, string>;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const formInitial: FormData = {
  car_brand: "",
  car_model: "",
  engine_type: "",
  engine_volume: "",
  production_year: "",
  delivery_method: "",
  phone: "",
};

type ModalStep = "choice" | "form" | "success";

/** Длительность анимации закрытия — сбрасываем состояние только после неё,
 *  иначе пользователь видит, как содержимое подменяется на глазах. */
const CLOSE_ANIMATION_MS = 300;

export const SelectionModal = () => {
  const [currentStep, setCurrentStep] = useState<ModalStep>("choice");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(formInitial);
  // Согласие держим отдельно от formData: submitForm рассыпает объект
  // прямо в insert в Supabase, лишнее поле сломало бы запрос.
  const [consent, setConsent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const contentRef = useRef<HTMLDivElement>(null);

  const form = useUnit(appState.$form);
  const setForm = useUnit(appState.setForm);

  const closeModal = useCallback(() => {
    setForm({ open: false });

    setTimeout(() => {
      setIsSubmitted(false);
      // Шаг раньше не сбрасывался: один раз выбрав «Подбор на сайте»,
      // пользователь при каждом следующем открытии попадал сразу в форму
      // и больше никогда не видел экран выбора способа.
      setCurrentStep("choice");
      setErrors({});
      setConsent(false);
    }, CLOSE_ANIMATION_MS);
  }, [setForm]);

  useHideScroll(form.open);
  useModalA11y(form.open, closeModal, contentRef);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleChoiceSelect = (choice: "website" | "telegram" | "max") => {
    if (choice === "website") {
      setCurrentStep("form");
    } else if (choice === "telegram") {
      window.open("https://t.me/amper_tgn_bot?start=start", "_blank");
      closeModal();
    } else {
      window.open("https://max.ru/id615426315675_bot", "_blank");
      closeModal();
    }
  };

  const clearError = (field: string) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Ошибку гасим для ЛЮБОГО поля. Раньше ветка с телефоном делала ранний
    // return до этого блока, и красная подпись под номером висела до
    // повторной отправки формы, даже когда номер уже исправлен.
    clearError(field);

    if (field === "phone") {
      const digits = value.replace(/\D/g, "");

      if (digits.length <= 11) {
        setFormData((prev) => ({
          ...prev,
          phone: digits ? `+${digits}` : "",
        }));
      }

      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.car_brand.trim()) {
      newErrors.car_brand = "Укажите марку автомобиля";
    }

    if (!formData.car_model.trim()) {
      newErrors.car_model = "Укажите модель автомобиля";
    }

    if (!formData.engine_type) {
      newErrors.engine_type = "Выберите тип двигателя";
    }

    if (!formData.production_year) {
      newErrors.production_year = "Выберите год выпуска";
    }

    if (!formData.delivery_method) {
      newErrors.delivery_method = "Выберите способ получения";
    }

    const digits = formData.phone.replace(/\D/g, "");
    if (!digits) {
      newErrors.phone = "Укажите номер телефона";
    } else if (digits.length < 11) {
      newErrors.phone = "Введите номер полностью — 11 цифр";
    }

    if (!consent) {
      newErrors.consent = "Без согласия мы не можем принять заявку";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      startTransition(async () => {
        const response = await submitForm(formData);

        if (response.ok) {
          setIsSubmitted(true);
          setErrors({});
          setFormData(formInitial);
          setConsent(false);
        } else {
          setErrors({ form: response.message });
        }
      });
    }
  };

  const renderBody = () => {
    if (isSubmitted) {
      return (
        <S.SuccessMessage>
          <S.SuccessIcon>
            <CheckCircle size={32} aria-hidden="true" />
          </S.SuccessIcon>
          <S.SuccessTitle>Заявка принята</S.SuccessTitle>
          <S.SuccessText>
            Наш специалист уже подбирает подходящие аккумуляторы для вашего
            автомобиля.
            <br />В ближайшее время мы свяжемся с вами для уточнения деталей.
          </S.SuccessText>
          <S.PhoneNumber>
            <S.PhoneLabel>Если удобнее позвонить самому:</S.PhoneLabel>
            <S.PhoneLink href={`tel:${phoneNumber}`}>
              <Phone size={20} aria-hidden="true" />
              {formattedPhoneNumber}
            </S.PhoneLink>
          </S.PhoneNumber>
        </S.SuccessMessage>
      );
    }

    if (currentStep === "choice") {
      return (
        <>
          <S.ModalHeader>
            <S.ModalTitle>Подбор аккумулятора</S.ModalTitle>
            <S.ModalSubtitle>
              Выберите удобный для вас способ подбора аккумулятора
            </S.ModalSubtitle>
          </S.ModalHeader>

          <S.ModalBody>
            <S.ChoiceContainer>
              <S.ChoiceOption
                type="button"
                onClick={() => handleChoiceSelect("website")}
              >
                <S.ChoiceButton>
                  <Globe
                    size={20}
                    aria-hidden="true"
                    style={{ marginRight: "0.5rem" }}
                  />
                  Подбор на сайте
                </S.ChoiceButton>
                <S.ChoiceTitle>Быстро и удобно</S.ChoiceTitle>
                <S.ChoiceDescription>
                  Заполните форму прямо на сайте. Наш специалист перезвонит вам
                  и подберет идеальный аккумулятор для вашего автомобиля.
                </S.ChoiceDescription>
              </S.ChoiceOption>

              {/* <S.ChoiceOption type="button" onClick={() => handleChoiceSelect("telegram")}>
                <S.ChoiceButton>
                  <Image
                    src="/telegram_logo.webp"
                    alt=""
                    width={32}
                    height={32}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Подбор в Telegram
                </S.ChoiceButton>
                <S.ChoiceTitle>Персональный консультант</S.ChoiceTitle>
                <S.ChoiceDescription>
                  Общайтесь с нашим ботом в Telegram. Получите персональные
                  рекомендации, фото аккумуляторов и ответы на все вопросы в
                  удобном мессенджере.
                </S.ChoiceDescription>
              </S.ChoiceOption> */}

              <S.ChoiceOption
                type="button"
                onClick={() => handleChoiceSelect("max")}
              >
                <S.ChoiceButton>
                  <Image
                    src="/max_logo.webp"
                    alt=""
                    width={30}
                    height={30}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Подбор в Макс
                </S.ChoiceButton>
                <S.ChoiceTitle>Персональный консультант</S.ChoiceTitle>
                <S.ChoiceDescription>
                  Общайтесь с нашим ботом в мессенджере Макс. Получите
                  персональные рекомендации и ответы на все вопросы.
                </S.ChoiceDescription>
              </S.ChoiceOption>
            </S.ChoiceContainer>
          </S.ModalBody>
        </>
      );
    }

    return (
      <>
        <S.ModalHeader>
          <S.ModalTitle>Подбор аккумулятора</S.ModalTitle>
          <S.ModalSubtitle>
            Заполните данные о вашем автомобиле, и мы подберем идеальный
            аккумулятор
          </S.ModalSubtitle>
        </S.ModalHeader>

        <S.ModalBody>
          <S.BackButton type="button" onClick={() => setCurrentStep("choice")}>
            <ArrowLeft size={16} aria-hidden="true" />
            Назад к выбору способа
          </S.BackButton>

          <S.Form onSubmit={handleSubmit} noValidate>
            <S.FormGroup>
              <S.Label htmlFor="car_brand">Марка автомобиля *</S.Label>
              <S.Input
                id="car_brand"
                type="text"
                autoComplete="off"
                placeholder="Например: Toyota, BMW, Lada"
                value={formData.car_brand}
                onChange={(e) => handleInputChange("car_brand", e.target.value)}
                $hasError={!!errors.car_brand}
                $disabled={isPending}
                aria-invalid={!!errors.car_brand}
              />
              {errors.car_brand && (
                <S.ErrorMessage>{errors.car_brand}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="car_model">Модель автомобиля *</S.Label>
              <S.Input
                id="car_model"
                type="text"
                autoComplete="off"
                placeholder="Например: Camry, X5, Granta"
                value={formData.car_model}
                onChange={(e) => handleInputChange("car_model", e.target.value)}
                $hasError={!!errors.car_model}
                $disabled={isPending}
                aria-invalid={!!errors.car_model}
              />
              {errors.car_model && (
                <S.ErrorMessage>{errors.car_model}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup
              role="radiogroup"
              aria-labelledby="engine-type-label"
            >
              <S.Label as="span" id="engine-type-label">
                Тип двигателя *
              </S.Label>
              <S.RadioGroup>
                <S.RadioOption
                  $hasError={!!errors.engine_type}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="engine_type"
                    value="petrol"
                    checked={formData.engine_type === "petrol"}
                    onChange={(e) =>
                      handleInputChange("engine_type", e.target.value)
                    }
                  />
                  <S.RadioLabel>Бензин</S.RadioLabel>
                </S.RadioOption>
                <S.RadioOption
                  $hasError={!!errors.engine_type}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    // Было name="engine" — вторая радиокнопка оказывалась
                    // в отдельной группе, и стрелками между «Бензин»
                    // и «Дизель» переключиться было нельзя.
                    name="engine_type"
                    value="diesel"
                    checked={formData.engine_type === "diesel"}
                    onChange={(e) =>
                      handleInputChange("engine_type", e.target.value)
                    }
                  />
                  <S.RadioLabel>Дизель</S.RadioLabel>
                </S.RadioOption>
              </S.RadioGroup>
              {errors.engine_type && (
                <S.ErrorMessage>{errors.engine_type}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="engine_volume">Объём двигателя</S.Label>
              <S.Input
                id="engine_volume"
                type="text"
                autoComplete="off"
                placeholder="Например: 5.5л, 2л"
                value={formData.engine_volume}
                onChange={(e) =>
                  handleInputChange("engine_volume", e.target.value)
                }
                $hasError={!!errors.engine_volume}
                $disabled={isPending}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="production_year">Год выпуска *</S.Label>
              <S.Select
                id="production_year"
                value={formData.production_year}
                onChange={(e) =>
                  handleInputChange("production_year", e.target.value)
                }
                $hasError={!!errors.production_year}
                $disabled={isPending}
                aria-invalid={!!errors.production_year}
              >
                <option value="">Выберите год</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </S.Select>
              {errors.production_year && (
                <S.ErrorMessage>{errors.production_year}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup
              role="radiogroup"
              aria-labelledby="delivery-method-label"
            >
              <S.Label as="span" id="delivery-method-label">
                Способ получения *
              </S.Label>
              <S.RadioGroup>
                <S.RadioOption
                  $hasError={!!errors.delivery_method}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="delivery_method"
                    value="delivery"
                    checked={formData.delivery_method === "delivery"}
                    onChange={(e) =>
                      handleInputChange("delivery_method", e.target.value)
                    }
                  />
                  <S.RadioLabel>С доставкой и установкой</S.RadioLabel>
                </S.RadioOption>
                <S.RadioOption
                  $hasError={!!errors.delivery_method}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="delivery_method"
                    value="pickup"
                    checked={formData.delivery_method === "pickup"}
                    onChange={(e) =>
                      handleInputChange("delivery_method", e.target.value)
                    }
                  />
                  <S.RadioLabel>Самовывоз</S.RadioLabel>
                </S.RadioOption>
              </S.RadioGroup>
              {errors.delivery_method && (
                <S.ErrorMessage>{errors.delivery_method}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="phone">Телефон для связи *</S.Label>
              <S.Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 987 654 32 10"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                $hasError={!!errors.phone}
                $disabled={isPending}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <S.ErrorMessage>{errors.phone}</S.ErrorMessage>}
            </S.FormGroup>

            <S.FormGroup>
              <S.ConsentRow $hasError={!!errors.consent}>
                <S.ConsentCheckbox
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    clearError("consent");
                  }}
                  aria-invalid={!!errors.consent}
                />
                <span>
                  Я согласен на обработку персональных данных в соответствии с{" "}
                  <Link href="/privacy" target="_blank">
                    политикой конфиденциальности
                  </Link>
                  .
                </span>
              </S.ConsentRow>
              {errors.consent && (
                <S.ErrorMessage>{errors.consent}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {errors.form && (
              <S.FormError role="alert">
                <TriangleAlert size={18} aria-hidden="true" />
                {errors.form}
              </S.FormError>
            )}

            <S.SubmitButton disabled={isPending} type="submit">
              {isPending ? "Отправляем…" : "Подобрать аккумулятор"}
            </S.SubmitButton>
          </S.Form>
        </S.ModalBody>
      </>
    );
  };

  return (
    <S.ModalOverlay $isOpen={form.open} onClick={handleOverlayClick}>
      <S.ModalContent
        $isOpen={form.open}
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Подбор аккумулятора"
      >
        <S.CloseButton onClick={closeModal} aria-label="Закрыть окно подбора">
          <X size={20} aria-hidden="true" />
        </S.CloseButton>

        {renderBody()}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
