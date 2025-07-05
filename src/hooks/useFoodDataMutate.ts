import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodData): Promise<any> => {
  const response = await axios.post(`${API_URL}/food`, data);
  return response.data;
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food-data"] });
    },
  });

  return mutation;
}
