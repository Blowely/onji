// src/components/AuthModal.jsx

import React, { useState } from "react";
import { Input, Modal, notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useLazyGetCodeQuery, useAddCodeMutation } from "../store/accounts.store";
import { useAppDispatch } from "../store";
import { addPhone } from "../common/accountSlice";
import { useNavigate } from "react-router-dom";
import "./authModal.scss";

// Тестовые данные для Apple Review
const TEST_PHONE = "9202972447";
const TEST_TOKEN = "NzkyMDI5NzI0NDc6Njk2OA==";

const AuthModal = ({
                     open,
                     onCancel,
                     setModalOpen = () => {},
                     setRemotePhone,
                     isCodeModalOpen,
                     setCodeModalOpen
                   }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [getCode] = useLazyGetCodeQuery();
  const [sendCode, { error }] = useAddCodeMutation({}, { refetchOnMountOrArgChange: true });

  const phoneInputHandler = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setPhone(cleaned);
    }
  };

  const codeInputHandler = (value) => {
    const num = Number(value);
    if (value?.length === 4 && !isNaN(num)) {
      setOtp(value);
      onOkHandler(value);
    }
  };

  const onOkHandler = async (enteredOtp) => {
    // Тестовый режим для Apple Review
    if (phone === TEST_PHONE) {
      localStorage.setItem("token", TEST_TOKEN);
      dispatch(addPhone({ phone: TEST_PHONE }));
      navigate("/profile");
      onCancel();
      setModalOpen(true);
      return;
    }

    // Обычный поток получения/подтверждения кода
    if (!isCodeModalOpen) {
      const userAgent = window.navigator.userAgent;
      await getCode({ phone, userAgent });
      setCodeModalOpen(true);
      setRemotePhone(phone);
    } else {
      if (phone.length !== 10) {
        notification.warning({ message: "Заполните все поля", duration: 1.5 });
        return;
      }
      try {
        const res = await sendCode({ phone: "7" + phone, code: enteredOtp }).unwrap();
        if (res.token) {
          dispatch(addPhone({ phone: "7" + phone }));
          localStorage.setItem("token", res.token);
          navigate("/profile");
        } else {
          setOtp("");
          notification.error({ message: "Неверный код", duration: 1.5 });
          return;
        }
        onCancel();
        setModalOpen(true);
      } catch {
        notification.success({ message: "Вход выполнен", duration: 1.5 });
        onCancel();
        setModalOpen(true);
      }
    }
  };

  const renderContent = () => (
      <div style={{ display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px' }}>
        {!isCodeModalOpen ? (
            <>
              <div style={{ fontSize: '22px', fontWeight: 500 }}>Войти или создать профиль</div>
              <Input
                  prefix="+7"
                  type="tel"
                  value={phone}
                  placeholder="000 000-00-00"
                  onChange={(e) => phoneInputHandler(e.target.value)}
              />
              <span style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <CheckCircleOutlined style={{ marginRight: '8px', color: '#000000' }} />
            Соглашаюсь с{" "}
                <a
                    href="https://storage.yandexcloud.net/pc-mediafiles/important/privacy-policy-re-poizon.ru.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '4px' }}
                >
              политикой конфиденциальности
            </a>
          </span>
            </>
        ) : (
            <>
              <div style={{ fontSize: '22px', fontWeight: 500 }}>Введите код подтверждения</div>
              <div style={{ fontSize: '15px' }}>Отправлен на +7{phone}</div>
              <Input.OTP
                  length={4}
                  type="number"
                  autoFocus
                  placeholder="Пожалуйста, введите код"
                  onChange={codeInputHandler}
              />
              {error?.data?.message && (
                  <div className="ant-form-item-explain-error" style={{ marginTop: '8px' }}>
                    {error.data.message}
                  </div>
              )}
            </>
        )}
      </div>
  );

  const isDesktop = window.innerWidth > 768;

  return (
      <Modal
          open={open}
          centered={!isDesktop}
          onOk={() => onOkHandler(otp)}
          okText={!isCodeModalOpen ? "Получить код подтверждения" : "Подтвердить"}
          onCancel={onCancel}
      >
        {renderContent()}
      </Modal>
  );
};

export default AuthModal;
