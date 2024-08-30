import jwt from 'jsonwebtoken';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ message: 'Yetkisiz erişim' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Token doğrulama
    const decoded = jwt.verify(token, 'gizliAnahtar');
    
    return new Response(JSON.stringify({ message: 'Korumalı verilere erişildi', user: decoded }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Geçersiz token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
