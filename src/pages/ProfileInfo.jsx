import React, { useEffect } from "react";
import { Button, Input, Layout, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import { LeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store";
import { useGetAccountQuery } from "../store/accounts.store";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const gender = localStorage.getItem("gender") || "men";

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const { data: accountData } = useGetAccountQuery(token, {
    skip: cartItems.length && addresses.length,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    message.success("Вы вышли из аккаунта");
    navigate("/");
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`/api/account?token=${token}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        message.success("Аккаунт удалён");
        navigate("/");
      } else {
        message.error(data.message || "Ошибка при удалении аккаунта");
      }
    } catch (error) {
      message.error("Ошибка при подключении к серверу");
    }
  };

  const onLogoutClick = () => {
    Modal.confirm({
      title: "Выйти из аккаунта?",
      content: "Вы уверены, что хотите выйти?",
      okText: "Выйти",
      cancelText: "Отмена",
      onOk: logout,
    });
  };

  const onDeleteClick = () => {
    Modal.confirm({
      title: "Удалить профиль?",
      content: "Это действие невозможно отменить. Вы уверены?",
      okText: "Удалить",
      okButtonProps: { danger: true },
      cancelText: "Отмена",
      onOk: deleteAccount,
    });
  };

  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        {isDesktopScreen ? (
            <HeaderInfoWrapper />
        ) : (
            <div className="content-block-header border-radius">
              <LeftOutlined onClick={() => window.history.go(-1)} />
              Аккаунт
              <div style={{ width: "19px" }} />
            </div>
        )}
        <div className="content-block-wrapper" style={{ height: !isDesktopScreen && "100vh" }}>
          <div
              className="content-block content-block-profile"
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "space-between",
              }}
          >
            <div className="content-wrapper" style={{ marginTop: "70px" }}>
              <div className="address-item">
                <div className="field-name">Номер телефона</div>
                <Input value={`+${accountData?.account?.phone}`} disabled />
              </div>
            </div>
            <div style={{ fontSize: "17px", margin: "0 auto", display: "flex", gap: "8px", padding: "20px" }}
                 onClick={onLogoutClick}>
              <LogoutOutlined style={{ fontSize: "22px", margin: "0 auto" }} />
              Выйти
            </div>
            <div
                style={{ fontSize: "17px", margin: "0 auto", color: "gray", cursor: "pointer",padding: "10px 20px" }}
                onClick={onDeleteClick}
            >
              Удалить профиль
            </div>
          </div>
        </div>

        {!isDesktopScreen && <PhoneFooter tab="profile" />}
      </Layout>
  );
};

export default ProfileInfo;
