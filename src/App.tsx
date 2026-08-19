import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import DeliveryPage from "./pages/DeliveryPage";
import ShopPage from "./pages/ShopPage";
import BrandPage from "./pages/BrandPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/brand"
          element={<BrandPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* /shop 으로 들어오면 기본 카테고리(스킨)로 이동 */}
        <Route
          path="/shop"
          element={<Navigate to="/shop/skin" replace />}
        />

        {/* 카테고리별 실제 URL: /shop/skin, /shop/serum, /shop/mask 등 */}
        <Route
          path="/shop/:categoryId"
          element={<ShopPage />}
        />

        {/* 상품 상세: /product/1, /product/305 등 */}
        <Route
          path="/product/:productId"
          element={<ProductDetailPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/mypage"
          element={<MyPage />}
        />

        <Route
          path="/mypage/delivery"
          element={<DeliveryPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
