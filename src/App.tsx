import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import ShopPage from "./pages/ShopPage";
import BrandPage from "./pages/BrandPage";

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

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/mypage"
          element={<MyPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
