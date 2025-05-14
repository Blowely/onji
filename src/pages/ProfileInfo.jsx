import React, {useEffect} from "react";
import {Button, Input, Layout} from "antd";
import {useNavigate} from "react-router-dom";
import "./profile.scss";
import {LeftOutlined, LogoutOutlined} from "@ant-design/icons";
import {useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const ProfileInfo = () => {

  const token = localStorage.getItem('token');
  const gender = localStorage.getItem("gender") || "men";

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const {data: accountData} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});


  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  const onGoBackClick = () => {
    window.history.go(-1);
  }

  const onLogoutClick = () => {
    window.history.go(-1);
  }

  const onDeleteClick = () => {
    window.history.go(-1);
  }


  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        {isDesktopScreen
            ? <HeaderInfoWrapper/>
            : <div className="content-block-header border-radius">
              <LeftOutlined onClick={onGoBackClick}/>
              Аккаунт
              <div style={{width: '19px'}}/>
            </div>
        }
        <div className="content-block-wrapper" style={{height: !isDesktopScreen && '100vh'}}>
          <div className="content-block content-block-profile"
               style={{
                 display: 'flex',
                 height: '100%',
                 flexDirection: 'column',
                 alignItems: 'space-between',
               }}>
            <div className="content-wrapper" style={{marginTop: '70px'}}>
              <div className="address-item">
                <div className="field-name">Номер телефона</div>
                <Input
                    value={`+${accountData?.account?.phone}`}
                    disabled
                />
              </div>
            </div>
            <div style={{fontSize: '17px', margin: '0 auto', display: 'flex', gap: '8px'}}>
              <LogoutOutlined style={{fontSize: '22px', margin: '0 auto'}} onClick={onLogoutClick}/>
              Выйти
            </div>
            <div
                style={{fontSize: '17px', margin: '0 auto', marginTop:'30px', color: 'gray'}}
                onClick={onDeleteClick}
            >
              Удалить аккаунт
            </div>
          </div>
        </div>

        {!isDesktopScreen &&
            <PhoneFooter tab="profile"/>
        }
      </Layout>
  );
}
export default ProfileInfo;
