// firebaseQueries.js
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Fetch Home Carousel Data
export const fetchHomeCarousel = async () => {
  const snapshot = await getDocs(collection(db, "homeCarousel"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Fetch Gold Rate for Today
export const fetchTodaysGoldRate = async (todayDate: string) => {
  const goldQuery = query(
    collection(db, "goldRates"),
    where("date", "==", todayDate),
    limit(1)
  );

  const goldSnapshot = await getDocs(goldQuery);

  if (goldSnapshot.empty) return null;

  const docData = goldSnapshot.docs[0].data();
  return {
    perGram: docData.perGram,
    perPavan: docData.perPavan,
    date: docData.date,
    id: goldSnapshot.docs[0].id,
  };
};

// Combined Fetch if Needed
export const fetchHomePageData = async (todayDate: string) => {
  const [carouselData, goldRate] = await Promise.all([
    fetchHomeCarousel(),
    fetchTodaysGoldRate(todayDate),
  ]);

  return { carouselData, goldRate };
};

export const fetchCarouselItems = async () => {
  console.log("🔥 Fetching carousel data...");
  
  try {
    const snapshot = await getDocs(collection(db, "homeCarousel"));
    console.log("📌 Docs fetched count:", snapshot.size);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Firebase Fetch Error:", error);
    throw error; // important so React Query shows the error
  }
};
