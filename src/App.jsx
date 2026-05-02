import { useState } from 'react';
import { ReservasView } from './components/ReservasView';
import { UsuariosView } from './components/UsuariosView';

const API_URL = 'https://clase38-mongodb.vercel.app/';

export default function App() {
  const [view, setView] = useState('reservas');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ correo: '', clave: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
        setLoginData({ correo: '', clave: '' });
      } else {
        setLoginError(data.mensaje || 'Credenciales incorrectas');
      }
    } catch {
      setLoginError('No se pudo conectar con el backend');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const viewConfig = {
    reservas: { label: 'ReservaMaster', icon: 'R', color: 'bg-blue-600' },
    usuarios: { label: 'UsuariosMaster', icon: 'U', color: 'bg-violet-600' },
  };
  

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${viewConfig[view].color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>{viewConfig[view].icon}</div>
            <span className="font-bold text-lg">{viewConfig[view].label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${token
              ? 'bg-green-50 text-green-700 border-green-100'
              : 'bg-red-50 text-red-600 border-red-100'}`}>
              {token ? '● Autenticado' : '● Sin sesión'}
            </span>
            <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {['reservas', 'usuarios'].map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all
                    ${view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                  {v}
                </button>
              ))}
            </nav>
            <button onClick={token ? handleLogout : () => setShowLogin(true)}
              className="text-sm font-semibold px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              {token ? 'Cerrar sesión' : 'Iniciar sesión'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === 'reservas' ? <ReservasView token={token} /> : <UsuariosView token={token} />}
      </main>

      {showLogin && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8">
            <h3 className="text-xl font-bold mb-1">Iniciar sesión</h3>
            <p className="text-slate-500 text-sm mb-6">Usá tu correo y clave registrados</p>
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="email" placeholder="Correo" required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.correo}
                onChange={e => setLoginData({ ...loginData, correo: e.target.value })} />
              <input type="password" placeholder="Clave" required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.clave}
                onChange={e => setLoginData({ ...loginData, clave: e.target.value })} />
              {loginError && <p className="text-red-600 text-sm font-medium">{loginError}</p>}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setShowLogin(false); setLoginError(''); }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl font-semibold text-sm">
                  Cancelar
                </button>
                <button type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-200">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
