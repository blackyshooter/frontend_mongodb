import { useState, useEffect } from 'react';
import { Table } from './Table';

const API_URL = 'http://localhost:3001';

export const UsuariosView = ({ token }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/usuarios`);
    setData(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (formData) => {
    if (!token) {
      alert('Necesitás iniciar sesión para crear usuarios');
      return;
    }
    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) fetchData();
    return res;
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <Table
        data={data}
        columns={[
          { key: 'nombre', label: 'Nombre' },
          { key: 'correo', label: 'Correo' }, // ← correo, no email
        ]}
        onDelete={handleDelete}
        onCreate={handleCreate}
        fields={[
          { key: 'nombre', label: 'Nombre', type: 'text' },
          { key: 'correo', label: 'Correo', type: 'email' },
          { key: 'clave', label: 'Clave', type: 'password' },
        ]}
        requiresAuth={!token}
      />
    </div>
  );
};
