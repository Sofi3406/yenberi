const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://slma.onrender.com/api';

export async function fetchGalleries(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/galleries?${qs}`);
  if (!res.ok) throw new Error('Failed to fetch galleries');
  return res.json();
}

export async function fetchGallery(id: string) {
  const res = await fetch(`${API_BASE}/galleries/${id}`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function createGallery(formData: FormData, token: string) {
  const res = await fetch(`${API_BASE}/galleries`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
}

export async function updateGallery(id: string, data: FormData, token: string, isForm: true): Promise<any>;
export async function updateGallery(id: string, data: Record<string, unknown>, token: string, isForm?: false): Promise<any>;
export async function updateGallery(id: string, data: FormData | Record<string, unknown>, token: string, isForm = false) {
  const body: BodyInit = isForm
    ? (data as FormData)
    : JSON.stringify(data as Record<string, unknown>);
  const res = await fetch(`${API_BASE}/galleries/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isForm ? {} : { 'Content-Type': 'application/json' })
    },
    body,
  });
  return res.json();
}

export async function deleteGallery(id: string, token: string) {
  const res = await fetch(`${API_BASE}/galleries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export default { fetchGalleries, fetchGallery, createGallery, updateGallery, deleteGallery };
