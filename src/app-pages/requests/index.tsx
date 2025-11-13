"use client";

import { useEffect, useState } from "react";
import * as S from "./styled";
import { RequestModal } from "@/features";
import {
  getDeliveryText,
  getStatusColor,
  getStatusText,
  Product,
  Request,
} from "@/entities";
import { formatDate, SubmitFormReturn, supabase } from "@/shared";
import { CheckCircle, Clock, Home, Truck } from "lucide-react";

type FilterType = "all" | "active" | "completed";

export type RequestsPageProps = {
  requests: Request[];
  products: Product[];
};

export default function RequestsPage({
  requests: initialRequests,
  products,
}: RequestsPageProps) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const subscription = supabase
      .channel("public:battery_requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "battery_requests" },
        (payload) => {
          const newRequest = payload.new as Request;

          setRequests((prev) => {
            const exists = prev.find((r) => r.id === newRequest.id);
            if (exists) {
              return prev.map((r) => (r.id === newRequest.id ? newRequest : r));
            } else {
              return [...prev, newRequest];
            }
          });

          setSelectedRequest((prev) =>
            prev?.id === newRequest.id ? newRequest : prev
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleUpdateRequest = async (
    updatedRequest: Request
  ): Promise<SubmitFormReturn> => {
    const { error } = await supabase
      .from("battery_requests")
      .update({
        status: updatedRequest.status,
        description: updatedRequest.description,
      })
      .eq("id", updatedRequest.id);

    if (error) {
      return { ok: false, message: "Произошла ошибка при обновлении данных" };
    } else {
      setRequests((prev) =>
        prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
      );
      return { ok: true };
    }
  };

  const filteredRequests = requests
    .filter((request) => {
      if (filter === "active") {
        return request.status === "new" || request.status === "in_progress";
      }
      if (filter === "completed") {
        return request.status === "completed" || request.status === "cancelled";
      }
      return true;
    })
    .sort((a, b) => a.id - b.id);

  filteredRequests.reverse();

  return (
    <S.PageContainer>
      <S.ContentContainer>
        <S.MainContent>
          <S.PageTitle>Заявки пользователей</S.PageTitle>

          <S.FilterContainer>
            <S.FilterButton
              $isActive={filter === "all"}
              onClick={() => setFilter("all")}
            >
              Все заявки ({requests.length})
            </S.FilterButton>
            <S.FilterButton
              $isActive={filter === "active"}
              onClick={() => setFilter("active")}
            >
              <Clock size={16} />В работе (
              {
                requests.filter(
                  (r) => r.status === "new" || r.status === "in_progress"
                ).length
              }
              )
            </S.FilterButton>
            <S.FilterButton
              $isActive={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              <CheckCircle size={16} />
              Готовые (
              {
                requests.filter(
                  (r) => r.status === "completed" || r.status === "cancelled"
                ).length
              }
              )
            </S.FilterButton>
          </S.FilterContainer>

          {filteredRequests.length === 0 ? (
            <S.NoRequests>
              <h3>Заявок пока нет</h3>
              <p>
                Когда пользователи начнут оставлять заявки на подбор
                аккумуляторов, они появятся здесь
              </p>
            </S.NoRequests>
          ) : (
            <S.RequestsGrid>
              {filteredRequests.map((request) => (
                <S.RequestCard
                  key={request.id}
                  onClick={() => handleRequestClick(request)}
                >
                  <S.RequestHeader>
                    <S.RequestNumber># {request.id}</S.RequestNumber>
                    <S.RequestStatus $color={getStatusColor(request.status)}>
                      {getStatusText(request.status)}
                    </S.RequestStatus>
                  </S.RequestHeader>

                  <S.RequestInfo>
                    <S.DeliveryInfo>
                      <S.DeliveryIcon
                        $isDelivery={request.delivery_method === "delivery"}
                      >
                        {request.delivery_method === "delivery" ? (
                          <Truck size={16} />
                        ) : (
                          <Home size={16} />
                        )}
                      </S.DeliveryIcon>
                      {getDeliveryText(request.delivery_method)}
                    </S.DeliveryInfo>
                  </S.RequestInfo>

                  <S.RequestDescription>
                    {request.description ||
                      `${request.car_brand} ${request.car_model} (${request.production_year})`}
                  </S.RequestDescription>

                  <S.RequestDescription>
                    {formatDate(request.created_at)}
                  </S.RequestDescription>
                </S.RequestCard>
              ))}
            </S.RequestsGrid>
          )}
        </S.MainContent>
      </S.ContentContainer>

      <RequestModal
        request={selectedRequest}
        products={products}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
        onUpdate={handleUpdateRequest}
      />
    </S.PageContainer>
  );
}
