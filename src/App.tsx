import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/shop"
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