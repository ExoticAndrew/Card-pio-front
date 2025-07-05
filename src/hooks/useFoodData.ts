import axios from "axios";
import type { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async () => {
  const response = await axios.get<FoodData[]>(`${API_URL}/food`);
  return response.data; 
};

export function useFoodData() {
  const query = useQuery({
    queryKey: ['food-data'],
    queryFn: fetchData,
    retry: 2
  });

  return {
    ...query,
    data: query.data 
  };
}
