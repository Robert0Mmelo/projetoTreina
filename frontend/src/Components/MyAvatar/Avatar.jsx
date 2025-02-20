import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../../assets/Avatar-Default.png';

function Avatar() {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [refresh, setRefresh] = useState(window.localStorage.getItem("avatarRefresh") || 0);

  useEffect(() => {
    const imageId = window.localStorage.getItem("avatarImageId") || "1";
    axios.get(`http://localhost:8080/api/images/${imageId}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setAvatarUrl(url);
      })
      .catch(error => {
        console.error('Erro ao buscar o avatar:', error);
        setAvatarUrl(defaultAvatar);
      });
  }, [refresh]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "avatarRefresh") {
        setRefresh(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      <img 
        src={avatarUrl} 
        alt="Avatar" 
        onError={(e) => { e.target.src = defaultAvatar; }}
        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default Avatar;
