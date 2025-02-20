import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../../assets/Avatar-Default.png';

function Avatar() {
  // Estado para armazenar o parâmetro de refresh
  const [refresh, setRefresh] = useState(window.localStorage.getItem("avatarRefresh") || 0);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);

  useEffect(() => {
    const fetchAvatar = () => {
      axios.get(`http://localhost:8080/api/images/1?t=${refresh}`, { responseType: 'blob' })
        .then(response => {
          const imageUrl = URL.createObjectURL(response.data);
          setAvatarUrl(imageUrl);
        })
        .catch(error => {
          console.error('Erro ao buscar o avatar:', error);
        });
    };

    fetchAvatar();

    // Listener para mudanças no localStorage
    const handleStorageChange = (event) => {
      if (event.key === "avatarRefresh") {
        setRefresh(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refresh]);

  return (
    <div>
      <img 
        src={avatarUrl} 
        alt="Avatar" 
        onError={(e) => e.target.src = defaultAvatar}
        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default Avatar;
