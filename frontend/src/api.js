const API = "http://127.0.0.1:8000";

export const addDoctor = async (data) => {
  const res = await fetch(`${API}/doctors/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getDoctors = async () => {
  const res = await fetch(`${API}/doctors/`);
  return res.json();
};
