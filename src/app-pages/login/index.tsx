"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import * as S from "./styled";
import { loginAction } from "./actions";

type FormData = {
  login: string;
  password: string;
};

type FormErrors = Record<string, string>;

export function LoginPage({ setShow }: { setShow(value: boolean): void }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.login.trim()) {
      newErrors.login = "Введите логин";
    } else if (formData.login.trim().length < 3) {
      newErrors.login = "Логин должен содержать минимум 3 символа";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      startTransition(async () => {
        const response = await loginAction(formData.login, formData.password);

        if (response.ok) {
          setShow(true);
        } else {
          setErrors({ form: response.message });
        }
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <S.PageContainer>
      <S.LoginCard>
        <S.LoginForm onSubmit={handleSubmit}>
          <S.Title>Вход в систему</S.Title>
          <S.Subtitle>Введите свои данные для входа</S.Subtitle>

          <S.FormGroup>
            <S.Label>Логин</S.Label>
            <S.Input
              type="text"
              placeholder="Введите логин"
              value={formData.login}
              onChange={(e) => handleInputChange("login", e.target.value)}
              $hasError={!!errors.login}
              disabled={isPending}
            />
            {errors.login && <S.ErrorMessage>{errors.login}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Пароль</S.Label>
            <S.InputContainer>
              <S.Input
                type={showPassword ? "text" : "password"}
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                $hasError={!!errors.password}
                disabled={isPending}
                $hasIcon
              />
              <S.PasswordToggle
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isPending}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </S.PasswordToggle>
            </S.InputContainer>
            {errors.password && (
              <S.ErrorMessage>{errors.password}</S.ErrorMessage>
            )}
          </S.FormGroup>

          {errors.form && <S.ErrorMessage>{errors.form}</S.ErrorMessage>}

          <S.LoginButton type="submit" disabled={isPending}>
            {isPending ? "Вход..." : "Войти"}
          </S.LoginButton>
        </S.LoginForm>

        <S.Footer>
          <S.BackLink href="/" passHref>
            <ArrowLeft size={16} />
            Вернуться на главную
          </S.BackLink>
        </S.Footer>
      </S.LoginCard>
    </S.PageContainer>
  );
}
