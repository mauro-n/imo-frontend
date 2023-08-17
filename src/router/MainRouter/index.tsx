import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "../../pages/HomePage";
import { AuthProvider } from "../../context/AuthProvider";
import { SearchPage } from "../../pages/SearchPage";
import { RequireAuth } from "../../components/RequireAuth";
import { ProfileInfo } from "../../components/ProfileInfo";
import { ProfilePage } from "../../pages/ProfilePage";
import { ProfileDetails } from "../../components/ProfileDetails";

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/profile" element={<ProfilePage />}>
                            <Route path="info" element={<ProfileInfo />}>
                                <Route path="details" element={<ProfileDetails />} />
                            </Route>
                        </Route>
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}