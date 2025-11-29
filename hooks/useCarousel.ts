import { useQuery } from "@tanstack/react-query";
import { fetchCarouselItems } from "@/lib/firebase/firebaseQueries";

export const useCarousel = () => {
  console.log("React Query Hook Running..."); // this part working on
  return useQuery({
    queryKey: ["homeCarousel"],
    queryFn: fetchCarouselItems,
  });
};