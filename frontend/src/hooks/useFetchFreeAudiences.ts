import { useDatePickerStore } from "../zustandStore/store";
import api from "../AxiosSetting";
import { useEffect, useState } from "react";

type AudienceData = {
  audiences: Array<{
    audienceName: string;
    audienceFreePairs: number[];
    campus: "Drago" | "Tarny";
  }>;
};

export default function useFetchFreeAudiences() {
  const { date, campus } = useDatePickerStore();
  const token = localStorage.getItem("accessToken");
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null);
  const [fetchAudienceError, setFetchAudienceError] = useState<string | null>(null);

  const defaultValue: AudienceData = {
    audiences: [
      {
        audienceName: "201 ауд.",
        audienceFreePairs: [1, 2, 3, 7],
        campus: "Drago",
      },
      {
        audienceName: "2 ауд.",
        audienceFreePairs: [1, 3, 5, 6],
        campus: "Drago",
      },
      {
        audienceName: "203 ауд.",
        audienceFreePairs: [2, 5, 6, 7],
        campus: "Drago",
      },
      {
        audienceName: "104 ауд.",
        audienceFreePairs: [1, 5, 6, 7],
        campus: "Tarny",
      },
      {
        audienceName: "103 ауд.",
        audienceFreePairs: [1, 5, 6, 7],
        campus: "Tarny",
      },
    ],
  };

  useEffect(() => {
    const fetchAudienceData = async () => {
      try {
        const params = { date, campus };
        const response = await api.get("/audiences", {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Simulate a 2-second delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setAudienceData(response.data);
        setFetchAudienceError(null);
      } catch (err) {
        // Simulate a 2-second delay even on error
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setAudienceData(defaultValue);
        setFetchAudienceError(null);
      }
    };

    fetchAudienceData();
  }, [date, campus, token]);

  return { audienceData, fetchAudienceError };
}