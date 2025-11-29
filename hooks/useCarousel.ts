import { useQuery } from "@tanstack/react-query";
import { fetchCarouselItems, fetchGoldRate, fetchOffers } from "@/lib/firebase/firebaseQueries";

export const useCarousel = () => {
  return useQuery({
    queryKey: ["homeCarousel"],
    queryFn: fetchCarouselItems,
  });
};

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: fetchOffers,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};

export const useGoldRate = () => {
  return useQuery({
    queryKey: ["goldRate"],
    queryFn: fetchGoldRate,
    staleTime: 1000 * 60 * 5,
  });
};