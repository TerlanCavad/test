'use client';

import { useEffect, useState } from 'react';

export default function ProtectedPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage('Erişim reddedildi');
      }
    };

    fetchProtectedData();
  }, []);

  return <div>{message}</div>;
}
