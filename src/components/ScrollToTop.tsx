import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 페이지(경로)가 바뀔 때마다 스크롤을 맨 위로 이동시킨다.
// 링크를 누른 위치가 아니라 항상 새 페이지 맨 위부터 보이게 하기 위함.
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
