"use client";

import { useState, useEffect, useTransition } from "react";
import { X } from "lucide-react";
import * as S from "./styled";
import {
  getDeliveryText,
  getEngineText,
  getSource,
  getStatusColor,
  Product,
  Request,
} from "@/entities";
import { formatDate, SubmitFormReturn, useHideScroll } from "@/shared";
import { sendProductsAction } from "./actions";

interface RequestModalProps {
  request: Request | null;
  products: Product[];
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

const sendMessageInitial = {
  error: false,
  message: "",
};

export const RequestModal = ({
  request,
  products,
  isOpen,
  onClose,
  onUpdate,
}: RequestModalProps) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Request["status"]>("new");
  const [hasChanges, setHasChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatteries, setSelectedBatteries] = useState<Product[]>([]);
  const [isSending, startTransition] = useTransition();
  const [sendMessage, setSendMessage] = useState(sendMessageInitial);

  useHideScroll(isOpen);

  useEffect(() => {
    if (request) {
      setDescription(request.description);
      setStatus(request.status);
      setHasChanges(false);
      setSelectedBatteries([]);
      setSendMessage({
        error: false,
        message: "",
      });
      setSearchTerm("");
      setIsPending(false);
      setErrorMessage("");
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

  const sendProductsToUser = () => {
    setSendMessage(sendMessageInitial);
    startTransition(async () => {
      const result = await sendProductsAction(request, selectedBatteries);
      if (result.ok) {
        setSendMessage({
          error: false,
          message: "Аккумуляторы отправлены",
        });
      } else {
        setSendMessage({
          error: true,
          message: result.message,
        });
      }
    });
  };

  const handleBatterySelect = (battery: Product) => {
    const alreadySelected = selectedBatteries.some((b) => b.id === battery.id);
    if (!alreadySelected) {
      setSelectedBatteries((prev) => [...prev, battery]);
    }
  };

  const handleBatteryRemove = (battery: Product) => {
    setSelectedBatteries((prev) => prev.filter((b) => b.id !== battery.id));
  };

  const filteredBatteries = products.filter((battery) => {
    const alreadySelected = selectedBatteries.some((b) => b.id === battery.id);

    return (
      battery.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alreadySelected
    );
  });

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
                <S.InfoLabel>Объём двигателя:</S.InfoLabel>
                <S.InfoValue>{request.engine_volume} л</S.InfoValue>
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
              {request.phone && (
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
              )}
              <S.InfoItem>
                <S.InfoLabel>Откуда</S.InfoLabel>
                <S.InfoValue>{getSource(request.source)}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Дата создания:</S.InfoLabel>
                <S.InfoValue>{formatDate(request.created_at)}</S.InfoValue>
              </S.InfoItem>
              {request.address && (
                <S.InfoItem>
                  <S.InfoLabel>Адрес</S.InfoLabel>
                  <S.InfoValue>{request.address}</S.InfoValue>
                </S.InfoItem>
              )}
              {request.selected_battery && (
                <S.InfoItem>
                  <S.InfoLabel>Аккумулятор</S.InfoLabel>
                  <S.InfoValue>{request.selected_battery}</S.InfoValue>
                </S.InfoItem>
              )}
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
              <S.SaveButton onClick={handleSave} $disabled={isPending}>
                Сохранить изменения
              </S.SaveButton>
            )}

            {errorMessage && (
              <S.SendMessage $isError>{errorMessage}</S.SendMessage>
            )}
          </S.EditableSection>

          {request.source === "tg" && (
            <S.BatterySelectionSection>
              <h3>Подбор аккумуляторов</h3>
              {request.admin_picked && (
                <S.BatteriesAlreadyPicked>
                  Вы уже выбрали аккумуляторы для этой заявки
                </S.BatteriesAlreadyPicked>
              )}

              <S.FormGroup>
                <S.Label>Поиск аккумуляторов</S.Label>
                <S.SearchInput
                  type="text"
                  placeholder="Введите название аккумулятора..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </S.FormGroup>

              {filteredBatteries.length > 0 ? (
                <S.BatteryList>
                  {filteredBatteries.map((p) => (
                    <S.BatteryItem
                      key={p.id}
                      $isSelected={false}
                      onClick={() => handleBatterySelect(p)}
                    >
                      {p.title}
                    </S.BatteryItem>
                  ))}
                </S.BatteryList>
              ) : searchTerm ? (
                <S.NoBatteriesMessage>
                  Аккумуляторы не найдены
                </S.NoBatteriesMessage>
              ) : null}

              {selectedBatteries.length > 0 && (
                <>
                  <S.FormGroup>
                    <S.Label>
                      Выбранные аккумуляторы ({selectedBatteries.length})
                    </S.Label>
                    <S.SelectedBatteriesContainer>
                      {selectedBatteries.map((p) => (
                        <S.SelectedBatteryTag key={p.id}>
                          {p.title}
                          <S.RemoveBatteryButton
                            onClick={() => handleBatteryRemove(p)}
                          >
                            <X size={12} />
                          </S.RemoveBatteryButton>
                        </S.SelectedBatteryTag>
                      ))}
                    </S.SelectedBatteriesContainer>
                  </S.FormGroup>

                  <S.SaveButton
                    onClick={sendProductsToUser}
                    $disabled={isSending}
                  >
                    Отправить пользователю
                  </S.SaveButton>

                  {!!sendMessage.message && (
                    <S.SendMessage $isError={sendMessage.error}>
                      {sendMessage.message}
                    </S.SendMessage>
                  )}
                </>
              )}
            </S.BatterySelectionSection>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
