import axios from "axios";

const API_BASE = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
});

export const getImageUrl = (image) => {
  if (!image) return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop";
  if (image.startsWith("http")) return image;
  return `${API_BASE}/uploads/${image}`;
};

export const fetchProperties = async () => {
  const res = await api.get("/");
  return res.data.data || [];
};

export const addProperty = async (formData) => {
  const res = await api.post("/addproperty", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProperty = async (property) => {
  const res = await api.put("/updateproperty", property);
  return res.data;
};

export const deleteProperty = async (id) => {
  const res = await api.delete(`/property/${id}`);
  return res.data;
};

export const sendAiInput = async (payload) => {
  const res = await api.post("/aiinput", payload);
  return res.data;
};
