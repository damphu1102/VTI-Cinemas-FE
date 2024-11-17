import MemberTabs from "./MemberTabs/MemberTabs";
import "./Members.modul.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Members = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập hoặc trang chủ
      // Nên sử dụng Token hơn là Trạng thái isLoggedIn trong Redux
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="content">{isLoggedIn ? <MemberTabs /> : navigate("/")}</div>
  );
};

export default Members;
