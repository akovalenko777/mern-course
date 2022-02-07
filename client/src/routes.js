import React from 'react';
import {Routes, Route} from "react-router-dom";

import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function useRoutes(isAuth){
    if(isAuth){
        return (
            <Routes>
                <Route path="/" exact element={<CreatePage />} />
                <Route path="/links" exact element={<LinksPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="*" exact element={<NotFoundPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" exact element={<AuthPage />} />
            <Route path="*" exact element={<NotFoundPage />} />
        </Routes>
    )
}