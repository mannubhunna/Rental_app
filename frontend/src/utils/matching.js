const parseBudget = (value) => {
  if (typeof value === "number") return value;
  const num = parseInt(String(value).replace(/[^\d]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

const extractBedrooms = (type) => {
  if (!type) return 0;
  const match = String(type).match(/(\d+)\s*BHK/i);
  return match ? parseInt(match[1], 10) : 0;
};

const areaMatch = (demandArea, propertyLocation) => {
  if (!demandArea || !propertyLocation) return false;
  const d = demandArea.toLowerCase();
  const p = propertyLocation.toLowerCase();
  return p.includes(d) || d.includes(p.split(",")[0].trim());
};

export const calculateMatch = (demand, property) => {
  let score = 0;
  const weights = {
    area: 25,
    budget: 30,
    bedrooms: 20,
    parking: 10,
    familyType: 10,
    availability: 5,
  };

  if (areaMatch(demand.preferredArea, property.location)) score += weights.area;

  const propRent = parseBudget(property.budget);
  const demandBudget = parseBudget(demand.budget);
  if (propRent > 0 && demandBudget > 0) {
    if (propRent <= demandBudget) score += weights.budget;
    else if (propRent <= demandBudget * 1.1) score += weights.budget * 0.5;
  }

  const propBeds = extractBedrooms(property.type);
  const demandBeds = extractBedrooms(demand.bedrooms);
  if (propBeds >= demandBeds && demandBeds > 0) score += weights.bedrooms;

  const hasParking =
    property.parking?.toLowerCase?.().includes("available") ||
    property.parking === true;
  if (!demand.parking || hasParking) score += weights.parking;

  if (
    !demand.familyType ||
    !property.availableFor ||
    property.availableFor.toLowerCase().includes(demand.familyType.toLowerCase()) ||
    demand.familyType.toLowerCase() === "bachelor"
  ) {
    score += weights.familyType;
  }

  const isAvailable =
    property.available === "true" || property.available === true;
  if (isAvailable) score += weights.availability;

  return Math.min(Math.round(score), 100);
};

export const getMatches = (demands, properties, filters = {}) => {
  const matches = [];

  demands.forEach((demand) => {
    properties.forEach((property) => {
      const percentage = calculateMatch(demand, property);
      if (percentage < (filters.minMatch || 0)) return;

      const matchData = {
        demand,
        property,
        percentage,
        areaMatch: areaMatch(demand.preferredArea, property.location),
        budgetMatch: parseBudget(property.budget) <= parseBudget(demand.budget),
        bedroomsMatch:
          extractBedrooms(property.type) >= extractBedrooms(demand.bedrooms),
      };

      if (filters.perfectOnly && percentage < 90) return;
      if (filters.areaOnly && !matchData.areaMatch) return;
      if (filters.budgetOnly && !matchData.budgetMatch) return;
      if (filters.bedroomsOnly && !matchData.bedroomsMatch) return;

      matches.push(matchData);
    });
  });

  return matches.sort((a, b) => b.percentage - a.percentage);
};

export const getMatchedCount = (demands, properties) => {
  return getMatches(demands, properties, { minMatch: 70 }).length;
};
