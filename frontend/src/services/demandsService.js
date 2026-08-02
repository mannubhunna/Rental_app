const DEMANDS_KEY = "tricity_customer_demands";
const ACTIVITIES_KEY = "tricity_activities";

const seedDemands = [
  {
    id: 1001,
    customerName: "Rajesh Kumar",
    phone: "9876543210",
    preferredArea: "Mohali Sector 70",
    budget: 20000,
    bedrooms: "2 BHK",
    bathrooms: 2,
    familyType: "Family",
    parking: true,
    pets: false,
    additionalRequirements: "Near school and market",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1002,
    customerName: "Priya Sharma",
    phone: "9988776655",
    preferredArea: "Chandigarh Sector 22",
    budget: 25000,
    bedrooms: "3 BHK",
    bathrooms: 2,
    familyType: "Family",
    parking: true,
    pets: true,
    additionalRequirements: "Pet-friendly society preferred",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    customerName: "Amit Singh",
    phone: "9123456780",
    preferredArea: "Zirakpur",
    budget: 15000,
    bedrooms: "1 BHK",
    bathrooms: 1,
    familyType: "Bachelor",
    parking: false,
    pets: false,
    additionalRequirements: "Fully furnished preferred",
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
];

const initDemands = () => {
  if (!localStorage.getItem(DEMANDS_KEY)) {
    localStorage.setItem(DEMANDS_KEY, JSON.stringify(seedDemands));
  }
};

export const getDemands = () => {
  initDemands();
  return JSON.parse(localStorage.getItem(DEMANDS_KEY) || "[]");
};

export const saveDemands = (demands) => {
  localStorage.setItem(DEMANDS_KEY, JSON.stringify(demands));
};

export const addDemand = (demand) => {
  const demands = getDemands();
  const newDemand = { ...demand, id: Date.now(), createdAt: new Date().toISOString() };
  demands.unshift(newDemand);
  saveDemands(demands);
  logActivity(`New customer demand from ${newDemand.customerName}`);
  return newDemand;
};

export const updateDemand = (id, updates) => {
  const demands = getDemands();
  const index = demands.findIndex((d) => d.id === id);
  if (index === -1) throw new Error("Demand not found");
  demands[index] = { ...demands[index], ...updates };
  saveDemands(demands);
  return demands[index];
};

export const deleteDemand = (id) => {
  const demands = getDemands().filter((d) => d.id !== id);
  saveDemands(demands);
};

export const logActivity = (message) => {
  const activities = getActivities();
  activities.unshift({
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities.slice(0, 50)));
};

export const getActivities = () => {
  const raw = localStorage.getItem(ACTIVITIES_KEY);
  return raw ? JSON.parse(raw) : [];
};
