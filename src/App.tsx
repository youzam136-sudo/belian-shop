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
import RefundPage from "./pages/RefundPage";
import RecentViewedPage from "./pages/RecentViewedPage";
import ShopPage from "./pages/ShopPage";
import BrandPage from "./pages/BrandPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import InquiryBoardPage from "./pages/InquiryBoardPage";
import EventPage from "./pages/EventPage";
import NoticePage from "./pages/NoticePage";
import ReviewPage from "./pages/ReviewPage";
import CouponPage from "./pages/CouponPage";
import CheckoutPage from "./pages/CheckoutPage";

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

        <Route
          path="/find-id"
          element={<FindIdPage />}
        />

        <Route
          path="/find-password"
          element={<FindPasswordPage />}
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

        <Route
          path="/mypage/refund"
          element={<RefundPage />}
        />

        <Route
          path="/mypage/recent"
          element={<RecentViewedPage />}
        />

        <Route
          path="/mypage/review"
          element={<ReviewPage />}
        />

        <Route
          path="/mypage/coupon"
          element={<CouponPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/community/inquiry"
          element={<InquiryBoardPage />}
        />

        <Route
          path="/community/event"
          element={<EventPage />}
        />

        <Route
          path="/community/notice"
          element={<NoticePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
