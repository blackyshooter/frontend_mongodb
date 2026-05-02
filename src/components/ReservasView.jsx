import { useState, useEffect } from 'react';
import { Table } from './Table';

const API_URL = 'http://localhost:3001';

export const ReservasView = ({ token }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/reservas`);
    setData(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

 const handleCreate = async (formData) => {
  const res = await fetch(`${API_URL}/reservas`, {
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
    await fetch(`${API_URL}/reservas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reservas</h2>
      <Table
        data={data}
       columns={[
          { key: 'lugar', label: 'Lugar' },
          { key: 'nombre', label: 'Solicitante' },  // en MongoDB se guarda como nombre
          { key: 'fechaInicio', label: 'Fecha inicio', format: (v) => v ? new Date(v).toLocaleDateString() : '—' },
          { key: 'fechaFin', label: 'Fecha fin', format: (v) => v ? new Date(v).toLocaleDateString() : '—' },
        ]}
        onDelete={handleDelete}
        onCreate={handleCreate}
        fields={[
          { key: 'lugar', label: 'Lugar', type: 'text' },
          { key: 'solicitante', label: 'Solicitante', type: 'text' },  // ← nombre → solicitante
          { key: 'fecha_ini', label: 'Fecha inicio', type: 'datetime-local' },  // ← fechaInicio → fecha_ini
          { key: 'fecha_fin', label: 'Fecha fin', type: 'datetime-local' },     // ← fechaFin → fecha_fin
        ]}
      />
    </div>
  );
};
