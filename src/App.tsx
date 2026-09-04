import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
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
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
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
        <Route
          path="/shop"
          element={<Navigate to="/shop/skin" replace />}
        />
        <Route
          path="/shop/:categoryId"
          element={<ShopPage />}
        />
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
          path="/mypage/profile"
          element={<ProfilePage />}
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
