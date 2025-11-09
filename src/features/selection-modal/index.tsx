"use client";

import { useEffect, useState, useTransition } from "react";
import { X, CircleCheck as CheckCircle, Phone } from "lucide-react";
import * as S from "./styled";
import { formattedPhoneNumber, phoneNumber } from "@/shared";
import { useUnit } from "effector-react";
import { appState } from "@/entities";
import { submitForm } from "./actions";

export type FormData = {
  brand: string;
  model: string;
  engine: string;
  year: string;
  delivery: string;
  phone: string;
};

type FormErrors = Record<string, string>;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const formInitial = {
  brand: "",
  model: "",
  engine: "",
  year: "",
  delivery: "",
  phone: "",
};

export const SelectionModal = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(formInitial);
  const [isPending, startTransition] = useTransition();

  const form = useUnit(appState.$form);
  const setForm = useUnit(appState.setForm);

  useEffect(() => {
    if (form.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [form.open]);

  const closeModal = () => {
    setForm({ open: false });
    setIsSubmitted(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      const phone = value.replace("+", "");

      if ((/^[0-9]+$/.test(phone) && phone.length < 12) || !phone) {
        setFormData((prev) => ({
          ...prev,
          [field]: phone ? `+${phone}` : "",
        }));
      }

      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = "Укажите марку автомобиля";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Укажите модель автомобиля";
    }

    if (!formData.engine) {
      newErrors.engine = "Выберите тип двигателя";
    }

    if (!formData.year) {
      newErrors.year = "Выберите год выпуска";
    }

    if (!formData.delivery) {
      newErrors.delivery = "Выберите способ получения";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Укажите номер телефона";
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      startTransition(async () => {
        await submitForm(formData);
      });

      setIsSubmitted(true);
      setErrors({});
      setFormData(formInitial);
    }
  };

  if (isSubmitted) {
    return (
      <S.ModalOverlay $isOpen={form.open} onClick={handleOverlayClick}>
        <S.ModalContent>
          <S.CloseButton onClick={closeModal}>
            <X size={20} />
          </S.CloseButton>

          <S.SuccessMessage>
            <S.SuccessIcon>
              <CheckCircle size={32} />
            </S.SuccessIcon>
            <S.SuccessTitle>Отлично!</S.SuccessTitle>
            <S.SuccessText>
              Ян уже подбирает оптимальные варианты аккумуляторов для вашего
              автомобиля.
              <br />В ближайшее время мы свяжемся с вами для уточнения деталей.
            </S.SuccessText>
            <S.PhoneNumber>
              <S.PhoneLabel>Наш номер:</S.PhoneLabel>
              <S.PhoneLink href={`tel:+${phoneNumber}`}>
                <Phone size={20} />
                {formattedPhoneNumber}
              </S.PhoneLink>
            </S.PhoneNumber>
          </S.SuccessMessage>
        </S.ModalContent>
      </S.ModalOverlay>
    );
  }

  return (
    <S.ModalOverlay $isOpen={form.open} onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.CloseButton onClick={closeModal}>
          <X size={20} />
        </S.CloseButton>

        <S.ModalHeader>
          <S.ModalTitle>Подбор аккумулятора</S.ModalTitle>
          <S.ModalSubtitle>
            Заполните данные о вашем автомобиле, и мы подберем идеальный
            аккумулятор
          </S.ModalSubtitle>
        </S.ModalHeader>

        <S.ModalBody>
          <S.Form onSubmit={handleSubmit}>
            <S.FormGroup>
              <S.Label>Марка автомобиля *</S.Label>
              <S.Input
                type="text"
                placeholder="Например: Toyota, BMW, Lada"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                $hasError={!!errors.brand}
                $disabled={isPending}
              />
              {errors.brand && <S.ErrorMessage>{errors.brand}</S.ErrorMessage>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Модель автомобиля *</S.Label>
              <S.Input
                type="text"
                placeholder="Например: Camry, X5, Granta"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                $hasError={!!errors.model}
                $disabled={isPending}
              />
              {errors.model && <S.ErrorMessage>{errors.model}</S.ErrorMessage>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Тип двигателя *</S.Label>
              <S.RadioGroup>
                <S.RadioOption
                  $hasError={!!errors.engine}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="engine"
                    value="petrol"
                    checked={formData.engine === "petrol"}
                    onChange={(e) =>
                      handleInputChange("engine", e.target.value)
                    }
                  />
                  <S.RadioLabel>Бензин</S.RadioLabel>
                </S.RadioOption>
                <S.RadioOption
                  $hasError={!!errors.engine}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="engine"
                    value="diesel"
                    checked={formData.engine === "diesel"}
                    onChange={(e) =>
                      handleInputChange("engine", e.target.value)
                    }
                  />
                  <S.RadioLabel>Дизель</S.RadioLabel>
                </S.RadioOption>
              </S.RadioGroup>
              {errors.engine && (
                <S.ErrorMessage>{errors.engine}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Год выпуска *</S.Label>
              <S.Select
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                $hasError={!!errors.year}
                $disabled={isPending}
              >
                <option value="">Выберите год</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </S.Select>
              {errors.year && <S.ErrorMessage>{errors.year}</S.ErrorMessage>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Способ получения *</S.Label>
              <S.RadioGroup>
                <S.RadioOption
                  $hasError={!!errors.delivery}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={formData.delivery === "delivery"}
                    onChange={(e) =>
                      handleInputChange("delivery", e.target.value)
                    }
                  />
                  <S.RadioLabel>С доставкой и установкой</S.RadioLabel>
                </S.RadioOption>
                <S.RadioOption
                  $hasError={!!errors.delivery}
                  $disabled={isPending}
                >
                  <S.RadioInput
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={formData.delivery === "pickup"}
                    onChange={(e) =>
                      handleInputChange("delivery", e.target.value)
                    }
                  />
                  <S.RadioLabel>Самовывоз</S.RadioLabel>
                </S.RadioOption>
              </S.RadioGroup>
              {errors.delivery && (
                <S.ErrorMessage>{errors.delivery}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Телефон для связи *</S.Label>
              <S.Input
                type="tel"
                placeholder="+79876543210"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                $hasError={!!errors.phone}
                $disabled={isPending}
              />
              {errors.phone && <S.ErrorMessage>{errors.phone}</S.ErrorMessage>}
            </S.FormGroup>

            <S.SubmitButton disabled={isPending} type="submit">
              Подобрать аккумулятор
            </S.SubmitButton>
          </S.Form>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
