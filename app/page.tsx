import { ReactElement } from "react";
import HomeClient from "@/components/home/HomeClient";
import { fetchCarouselItems, fetchCategories, fetchOffers } from "@/lib/firebase/firebaseQueries";

export default async function Home(): Promise<ReactElement> {
  // Fetch all data in parallel on the server
  const [carouselData, categories, offers] = await Promise.all([
    fetchCarouselItems(),
    fetchCategories(),
    fetchOffers(),
  ]);

  return (
    <>
      {/* <div className="max-w-7xl mx-auto"> */}

      <Navbar
        cartItemsCount={cartItemsCount}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={logout}
      />
      <div className="overflow-x-hidden">
        <main className="grow">
          <HeroBanner />
          <OfferCards />
          <CategoryGrid />
          {/* FeaturedProducts removed as requested */}
        </main>
        <Footer />
        {/* </div> */}
      </div>
      {/* {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={login} />
      )} */}
    </>
    <HomeClient
      carouselData={carouselData}
      categories={categories}
      offers={offers}
    />
  );
}
