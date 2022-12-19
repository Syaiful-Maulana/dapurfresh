import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Index";
import NavLayout from "./layout/NavLayout";
import Home from "./pages/homepage/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Checkout from "./pages/Checkout";
import History from "./pages/history/History";
import HistoryDetail from "./pages/history/HistoryDetail";
import Products from "./pages/product/Product";
import Search from "./pages/product/Search";
import Popular from "./pages/product/Popular";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<Home />} />
                        <Route element={<NavLayout title="Profil" />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route
                            element={<NavLayout title="Riwayat Pemesanan" />}
                        >
                            <Route path="/history" element={<History />} />
                        </Route>
                        <Route path="/profile/edit" element={<EditProfile />} />
                        <Route
                            path="/product/:category"
                            element={<Products />}
                        />
                        <Route path="/product-popular" element={<Popular />} />
                        <Route path="/product-search" element={<Search />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/history/:id" element={<HistoryDetail />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
