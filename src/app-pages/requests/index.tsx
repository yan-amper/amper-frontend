"use client";

import { useState } from "react";
import {
  PageContainer,
  ContentContainer,
  MainContent,
  PageTitle,
  RequestsGrid,
  RequestCard,
  RequestHeader,
  RequestNumber,
  RequestStatus,
  RequestDescription,
  NoRequests,
} from "./styled";
import { RequestModal } from "@/features";
import { getStatusColor, getStatusText, Request } from "@/entities";
import { SubmitFormReturn, supabase } from "@/shared";

export type RequestsPageProps = {
  requests: Request[];
};

export default function RequestsPage({
  requests: initialRequests,
}: RequestsPageProps) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

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

  return (
    <PageContainer>
      <ContentContainer>
        <MainContent>
          <PageTitle>Заявки пользователей</PageTitle>

          {requests.length === 0 ? (
            <NoRequests>
              <h3>Заявок пока нет</h3>
              <p>
                Когда пользователи начнут оставлять заявки на подбор
                аккумуляторов, они появятся здесь
              </p>
            </NoRequests>
          ) : (
            <RequestsGrid>
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  onClick={() => handleRequestClick(request)}
                >
                  <RequestHeader>
                    <RequestNumber># {request.id}</RequestNumber>
                    <RequestStatus $color={getStatusColor(request.status)}>
                      {getStatusText(request.status)}
                    </RequestStatus>
                  </RequestHeader>

                  <RequestDescription>
                    {request.description ||
                      `${request.car_brand} ${request.car_model} (${request.production_year})`}
                  </RequestDescription>
                </RequestCard>
              ))}
            </RequestsGrid>
          )}
        </MainContent>
      </ContentContainer>

      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
        onUpdate={handleUpdateRequest}
      />
    </PageContainer>
  );
}
