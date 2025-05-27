import React, { Suspense } from "react";
import { AppLoading } from "./common/AppLoading";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import ProductPage from "./pages/Product";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import VisitedProducts from "./pages/VisitedProducts";
import Favorites from "./pages/Favorites";
import Information from "./pages/Information";
import Payment from "./pages/Payment";
import Order from "./pages/Order";
import Trace from "./pages/Trace";
import CategoriesTree from "./components/CategoriesTree/CategoriesTree";
import SBPayment from "./pages/SBPayment/SBPayment";
import HomeV2 from "./pages/HomeV2";
import CategoryPage from "./pages/CategoryPage";
import ProfileInfo from "./pages/ProfileInfo";

export function PrivateAppRouter({
                                   searchValue,
                                   setSearchValue,
                                   cartItems,
                                   onChangeSearchInput,
                                   onAddToFavorite,
                                   onAddToCart,
                                   isLoading
                                 }) {
  const gendersList = ["women", "men", "kid"];

  const genderParamUrl = window.location.href.split("/")[3];
  const genderParam = genderParamUrl.split("-")[0];
  const gender = gendersList.includes(genderParam)
      ? genderParam
      : localStorage.getItem("gender") || "men";
  localStorage.setItem("gender", gender);

  function MenProductsWrapper(props) {
    const [searchParams] = useSearchParams();
    const spuId = searchParams.get("spuId");
    const category1Id = searchParams.get("category1Id");
    const category2Id = searchParams.get("category2Id");
    const category3Id = searchParams.get("category3Id");
    const search = searchParams.get("search");

    const selectedCategory = category1Id || category2Id || category3Id;

    /*if (spuId) {
      return <ProductPage spuId={spuId} />;
    }*/

    return selectedCategory || search ? (
        <CategoryPage categoryId={selectedCategory} {...props} />
    ) : (
        <HomeV2 {...props} />
    );
  }

  return (
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/men-products" />} />
          <Route path="/products" element={<Navigate to="/men-products" />} />

          <Route
              path="/men-products"
              element={
                <MenProductsWrapper
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />
              }
          />

          <Route
              path="/women-products"
              element={
                <HomeV2
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />
              }
          />

          {/* Остальные страницы */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/*" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-info" element={<ProfileInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/trace" element={<Trace />} />
          <Route path="/visited" element={<VisitedProducts />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sbp" element={<SBPayment />} />
          <Route path="/men-categories/" element={<CategoriesTree />} replace />
          <Route path="/women-categories/" element={<CategoriesTree />} replace />
          <Route path="/info" element={<Information />} />

          {/* Опционально, если не найден маршрут */}
          {/* <Route path="*" element={<Navigate to={`/${gender}-products`} />} replace /> */}
        </Routes>
      </Suspense>
  );
}
