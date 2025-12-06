// firebaseQueries.js
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebaseConfig";
import { Category, ProductCategory } from "@/types";
import { Product } from "@/types";
import moment from "moment";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from "firebase/auth";

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



// export const fetchCategories = async (): Promise<Category[]> => {
//   try {
//     const snapshot = await getDocs(collection(db, "categories"));

//     if (snapshot.empty) {
//       console.warn("⚠️ No categories found");
//       return []; // Safe empty return
//     }

//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Category[];

//     return data.reverse();  ;
//   } catch (error: unknown) {
//     console.error("❌ Category Fetch Error:", error);

//     // throw readable error for UI
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to fetch categories"
//     );
//   }
// };







export const fetchCategories = async (): Promise<ProductCategory[]> => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));

    if (snapshot.empty) {
      console.warn("⚠️ No categories found");
      return [];
    }

    const data = snapshot.docs.map((doc) => {
      const docData = doc.data() as Omit<ProductCategory, "id">;

      return {
        id: doc.id,
        ...docData,
      };
    });

    return data.reverse();
  } catch (error: unknown) {
    console.error("❌ Category Fetch Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch categories"
    );
  }
};


// export const fetchProductsByCategory = async (categoryId: string) => {
//   try {
//     const productsRef = collection(db, "products");

//     // try direct category_id
//     const directQuery = query(productsRef, where("category_id", "==", categoryId));
//     const directSnap = await getDocs(directQuery);
//     if (!directSnap.empty) {
//       return directSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     }

//     // try nested category.id
//     const nestedQuery = query(productsRef, where("category.id", "==", categoryId));
//     const nestedSnap = await getDocs(nestedQuery);
//     return nestedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("❌ Product Fetch Error:", error);
//     throw new Error("Failed to fetch products");
//   }
// };



export const fetchProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");

    const mapSnapToProducts = (snap: any): Product[] =>
      snap.docs.map((doc: any) => {
        const data = doc.data() as Omit<Product, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });

    // 1️⃣ Try direct category_id
    const directQuery = query(
      productsRef,
      where("category_id", "==", categoryId)
    );
    const directSnap = await getDocs(directQuery);

    if (!directSnap.empty) {
      return mapSnapToProducts(directSnap);
    }

    // 2️⃣ Try nested category.id
    const nestedQuery = query(
      productsRef,
      where("category.id", "==", categoryId)
    );
    const nestedSnap = await getDocs(nestedQuery);

    return mapSnapToProducts(nestedSnap);
  } catch (error) {
    console.error("❌ Product Fetch Error:", error);
    throw new Error("Failed to fetch products");
  }
};


// export const fetchProductById = async (productId: string) => {
//   try {
//     const productRef = doc(db, "products", productId);
//     const productSnap = await getDoc(productRef);

//     if (!productSnap.exists()) {
//       return null;
//     }

//     const data = productSnap.data();

//     // 👉 Serialize Firestore timestamps (to prevent Next.js client error)
//     return {
//       id: productSnap.id,
//       ...data,
//       createdAt: data.createdAt?.toDate?.().toISOString() || null,
//       updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
//     };
//   } catch (error) {
//     console.error("❌ Product Fetch Error:", error);
//     throw new Error("Failed to fetch product");
//   }
// };



// lib/firebase/firebaseQueries.ts
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return null;
    }

    const data = productSnap.data();

    return {
      id: productSnap.id,
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
      shortDescription: data.shortDescription || "",
      price: data.price || 0,
      originalPrice: data.originalPrice || data.price,
      discount: data.discount || 0,
      rating: data.rating || 0,
      reviewCount: data.reviewCount || 0,
      inStock: data.inStock ?? true,
      stock: data.stock || null,
      isFeatured: data.isFeatured || false,
      isNew: data.isNew || false,
      isOnSale: data.isOnSale || false,
      images: data.images || [],
      features: data.features || [],
      specifications: data.specifications || {},
      tags: data.tags || [],
      sku: data.sku || "",
      
      // ✅ Add the status property that ProductDetail expects
      status: data.status || data.availability || (data.inStock ? "In Stock" : "Out of Stock"),
      availability: data.availability || (data.inStock ? "In Stock" : "Out of Stock"),
      
      category: data.category || { 
        id: "", 
        name: "", 
        slug: "", 
        image: "", 
        productCount: 0,
        description: "",
        isActive: true 
      },
      brand: data.brand || "",
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
    } as Product;
  } catch (error) {
    console.error("❌ Product Fetch Error:", error);
    throw new Error("Failed to fetch product");
  }
};

export const fetchOffers = async () => {
  console.log("🔥 Fetching offers data...");

  try {
    const snapshot = await getDocs(collection(db, "offer"));
    console.log("📌 Docs fetched count:", snapshot.size);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Firebase Fetch Error (offers):", error);
    throw error; // so React Query or your caller can handle it
  }
};


export const fetchGoldRate = async () => {
  console.log("🔥 Fetching today's gold rate...");

  const todayDate = moment().format("YYYY-MM-DD");

  try {
    const q = query(
      collection(db, "goldRates"),
      orderBy("createdAt", "desc"), 
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("⚠️ No gold rate found for today");
      return null;
    }

    const docData = snapshot.docs[0].data();
    console.log("📌 Gold rate fetched:", docData);

    return { id: snapshot.docs[0].id, ...docData };
  } catch (error) {
    console.error("❌ Firebase Fetch Error (gold rate):", error);
    throw error;
  }
};



export const signupUser = async (
  name: string,
  email: string,
  mobile:string,
  password: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store name in user profile
  await updateProfile(user, { displayName: name });

  return user;
};
// Login
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};