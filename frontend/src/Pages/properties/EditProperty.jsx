import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPropertyForm from "./AddPropertyForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { fetchProperties } from "../../services/api";

export default function EditProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties().then((data) => {
      const item = data.find((p) => String(p.id) === String(id));
      if (item) {
        let amenities = [];
        try {
          amenities = typeof item.amenities === "string" ? JSON.parse(item.amenities) : item.amenities || [];
        } catch { amenities = []; }
        setProperty({ ...item, amenities });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!property) return <div className="alert alert-warning">Property not found</div>;

  return <AddPropertyForm editData={property} />;
}
