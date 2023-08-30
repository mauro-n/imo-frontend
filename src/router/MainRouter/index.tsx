import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import { HomePage } from "../../pages/HomePage";
import { AuthProvider } from "../../context/AuthProvider";
import { SearchPage } from "../../pages/SearchPage";
import { RequireAuth } from "../../components/RequireAuth";
import { ProfileInfo } from "../../components/Organisms/ProfileInfo";
import { ProfilePage } from "../../pages/ProfilePage";
import { ProfileDetails } from "../../components/Molecules/ProfileDetails";
import { AppProvider } from "../../context/AppProvider";
import { CreateAd } from "../../components/Organisms/CreateAd";
import { PostPage } from "../../pages/PostPage";
import { MyPostsTemplate } from "../../templates/MyPostsTemplate";

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />

                        <Route element={<RequireAuth />}>
                            <Route path="/profile" element={<ProfilePage />}>
                                <Route path="" element={<ProfileInfo />}>
                                    <Route path="details" element={<ProfileDetails />} />
                                </Route>
                                <Route path="create-ad" element={<CreateAd />} />
                                <Route path="my-posts" element={<MyPostsTemplate />} />
                            </Route>
                            <Route path="/posts">
                                <Route path="see-post" element={<PostPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </AppProvider>
        </BrowserRouter>
    )
}