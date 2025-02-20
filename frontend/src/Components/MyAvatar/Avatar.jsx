import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../../assets/Avatar-Default.png'; 

function Avatar() {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar); 

  useEffect(() => {
    axios.get('http://localhost:8080/api/images/1', { responseType: 'blob' }) 
      .then(response => {
        const imageUrl = URL.createObjectURL(response.data); 
        setAvatarUrl(imageUrl);
      })
      .catch(error => {
        console.error('Erro ao buscar o avatar:', error);
      });
  }, []);

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

