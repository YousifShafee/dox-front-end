import { useState, useEffect } from "react";

export const useLogin = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserLogin, setIsUserLogin] = useState(false);
  
  const [adminEmail, setAdminEmail] = useState('');
  const [adminId, setAdminId] = useState(0);
  const [adminMission, setAdminMission] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    setUserEmail((sessionStorage.getItem('userEmail')));
    setUserId(sessionStorage.getItem('userId'));
    setIsUserLogin(() => {return ((sessionStorage.getItem('userEmail')) ? true : false)});

    setAdminEmail((sessionStorage.getItem('userEmail')));
    setAdminId(sessionStorage.getItem('userId'));
    setAdminMission(sessionStorage.getItem('adminMission'));
    setIsAdminLogin(() => {return ((sessionStorage.getItem('userEmail')) ? true : false)});
  }, [])
  return {isUserLogin, userEmail, userId, adminEmail, adminId, isAdminLogin, adminMission};
}
