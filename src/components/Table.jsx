import { useState } from 'react';

export const Table = ({ data, columns, onDelete, onCreate, fields = [], requiresAuth = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await onCreate(formData);
    setSaving(false);
    if (!res || res.ok || res.status === 201) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <>
      {/* Botón crear */}
      {fields.length > 0 && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              if (requiresAuth) {
                alert('Necesitás iniciar sesión primero');
                return;
              }
              setFormData({});
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nuevo
          </button>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-6 py-4">{col.label}</th>
              ))}
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No hay registros aún.
                </td>
              </tr>
            ) : data.map((item) => (
              <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-sm text-slate-700">
                    {col.format ? col.format(item[col.key]) : (item[col.key] || '—')}
                  </td>
                ))}
                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      if (window.confirm('¿Eliminar este registro?')) onDelete(item._id);
                    }}
                    className="text-red-400 hover:text-red-600 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal crear */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8">
            <h3 className="text-lg font-bold mb-5">Nuevo registro</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="text-xs text-slate-500 mb-1 block">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.label}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData[field.key] || ''}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
