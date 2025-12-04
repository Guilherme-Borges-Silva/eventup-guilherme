import React, { useState } from "react";
import EventList from "../components/EventList";
import { useGeolocation } from "../hooks/useGeolocation";

export default function Home({ onViewDetails, onToggleFavorite, isFavorite }) {
  const { location, error, loading, permissionDenied, getCurrentPosition, clearLocation } = useGeolocation();
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleToggleLocation = () => {
    if (locationEnabled) {
      clearLocation();
      setLocationEnabled(false);
    } else {
      getCurrentPosition();
      setLocationEnabled(true);
    }
  };

  return (
    <section>
      <div className="page-header">
        <h2>Próximos Eventos</h2>
        <p>Descubra os principais eventos do momento!</p>
        {error && (
          <div className="location-error">
            <small>⚠️ {error}</small>
            {permissionDenied && (
              <small className="location-help">
                Para ativar, permita o acesso à localização nas configurações do navegador.
              </small>
            )}
          </div>
        )}
      </div>
      <EventList 
        onViewDetails={onViewDetails}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        userLocation={location}
        locationEnabled={locationEnabled}
        onToggleLocation={handleToggleLocation}
        locationLoading={loading}
        onClearLocation={() => {
          clearLocation();
          setLocationEnabled(false);
        }}
      />
    </section>
  );
}
