"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import * as S from "./styled";
import {
  getDeliveryText,
  getEngineText,
  getSource,
  getStatusColor,
  Request,
} from "@/entities";
import { formatDate, SubmitFormReturn, useHideScroll } from "@/shared";

interface RequestModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (request: Request) => Promise<SubmitFormReturn>;
}

const statusOptions = [
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Выполнена" },
  { value: "cancelled", label: "Отменена" },
];

export const RequestModal = ({
  request,
  isOpen,
  onClose,
  onUpdate,
}: RequestModalProps) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Request["status"]>("new");
  const [hasChanges, setHasChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  useHideScroll(isOpen);

  useEffect(() => {
    if (request) {
      setDescription(request.description);
      setStatus(request.status);
      setHasChanges(false);
    }
  }, [request]);

  useEffect(() => {
    if (request) {
      const changed =
        description !== request.description || status !== request.status;
      setHasChanges(changed);
    }
  }, [description, status, request]);

  if (!request) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    const updatedRequest: Request = {
      ...request,
      description,
      status,
    };

    setIsPending(true);
    const result = await onUpdate(updatedRequest);
    if (result.ok) {
      setHasChanges(false);
      setErrorMessage("");
    } else {
      setErrorMessage(result.message);
    }
    setIsPending(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "У вас есть несохраненные изменения. Закрыть без сохранения?"
        )
      ) {
        setDescription(request.description);
        setStatus(request.status);
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <S.ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.CloseButton onClick={handleClose}>
          <X size={20} />
        </S.CloseButton>

        <S.ModalHeader>
          <S.ModalTitle>Заявка {request.id}</S.ModalTitle>
          <S.StatusBadge $color={getStatusColor(status)}>
            {statusOptions.find((opt) => opt.value === status)?.label}
          </S.StatusBadge>
        </S.ModalHeader>

        <S.ModalBody>
          <S.InfoSection>
            <h3>Информация об автомобиле</h3>
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>Марка:</S.InfoLabel>
                <S.InfoValue>{request.car_brand}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Модель:</S.InfoLabel>
                <S.InfoValue>{request.car_model}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Тип двигателя:</S.InfoLabel>
                <S.InfoValue>{getEngineText(request.engine_type)}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Год выпуска:</S.InfoLabel>
                <S.InfoValue>{request.production_year}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Способ получения:</S.InfoLabel>
                <S.InfoValue>
                  {getDeliveryText(request.delivery_method)}
                </S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Телефон:</S.InfoLabel>
                <S.InfoValue>
                  <a
                    href={`tel:${request.phone}`}
                    style={{ color: "#dc2626", textDecoration: "none" }}
                  >
                    {request.phone}
                  </a>
                </S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Дата создания:</S.InfoLabel>
                <S.InfoValue>{formatDate(request.created_at)}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Откуда</S.InfoLabel>
                <S.InfoValue>{getSource(request.source)}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>
          </S.InfoSection>

          <S.EditableSection>
            <S.FormGroup>
              <S.Label>Статус заявки</S.Label>
              <S.Select
                value={status}
                onChange={(e) => setStatus(e.target.value as Request["status"])}
                disabled={isPending}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Описание / Комментарий</S.Label>
              <S.Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Добавьте описание или комментарий к заявке..."
                rows={4}
                disabled={isPending}
              />
            </S.FormGroup>

            {hasChanges && (
              <S.SaveButton onClick={handleSave} disabled={isPending}>
                Сохранить изменения
              </S.SaveButton>
            )}

            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
          </S.EditableSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
