import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { username, password } = await request.json();

  // Basit bir kullanıcı doğrulaması (hardcoded)
  if (username === 'user' && password === 'pass') {
    // Token oluşturma
    const token = jwt.sign({ username }, 'gizliAnahtar', { expiresIn: '1h' });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Geçersiz kullanıcı adı veya şifre' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
