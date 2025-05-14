import React, { useEffect } from "react";
import { Button, Input, Layout, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import { LeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store";
import {useDeleteAccountMutation, useGetAccountQuery} from "../store/accounts.store";
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

  const [deleteAccountMutation, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const deleteAccount = async () => {
    try {
      await deleteAccountMutation(token).unwrap();
      localStorage.removeItem("token");
      message.success("Аккаунт удалён");
      navigate("/");
    } catch (error) {
      message.error(error?.data?.message || "Ошибка при удалении аккаунта");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    message.success("Вы вышли из аккаунта");
    navigate("/");
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
      title: "Удалить аккаунт?",
      content: "Вы уверены, что хотите удалить профиль? Это действие необратимо.",
      okText: "Удалить",
      cancelText: "Отмена",
      okType: "danger",
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
                onClick={onDeleteClick}
                style={{ marginTop: "30px", fontSize: "17px",
                  color: "gray",
                  margin: "0 auto",
                  padding: "10px 20px"
            }}
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
