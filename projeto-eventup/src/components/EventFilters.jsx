import React, { useState } from "react";

const EVENT_TYPES = [
  { value: '', label: 'Todos os tipos' },
  { value: 'Music', label: 'Música' },
  { value: 'Sports', label: 'Esportes' },
  { value: 'Arts & Theatre', label: 'Artes e Teatro' },
  { value: 'Film', label: 'Cinema' },
  { value: 'Miscellaneous', label: 'Diversos' },
  { value: 'Comedy', label: 'Comédia' },
  { value: 'Family', label: 'Família' }
];

const TIME_PERIODS = [
  { value: '', label: 'Qualquer horário' },
  { value: 'morning', label: 'Manhã (06:00 - 12:00)' },
  { value: 'afternoon', label: 'Tarde (12:00 - 18:00)' },
  { value: 'evening', label: 'Noite (18:00 - 24:00)' }
];

const DATE_FILTERS = [
  { value: '', label: 'Todas as datas' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mês' },
  { value: 'future', label: 'Futuro' }
];

export default function EventFilters({ filters, onFilterChange, onClearFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = filters.type || filters.timePeriod || filters.dateFilter;

  const handleFilterChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value
    });
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsOpen(false);
  };

  return (
    <div className={`event-filters-container ${isOpen ? 'filters-open' : ''}`}>
      <button
        className={`filters-toggle-btn ${isOpen ? 'active' : ''} ${hasActiveFilters ? 'has-filters' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir filtros"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/>
        </svg>
        <span>Filtros</span>
        {hasActiveFilters && <span className="filter-badge">{Object.values(filters).filter(f => f).length}</span>}
      </button>

      {isOpen && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filtrar Eventos</h3>
            {hasActiveFilters && (
              <button
                className="clear-filters-btn"
                onClick={handleClearFilters}
                aria-label="Limpar filtros"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="filters-content">
            <div className="filter-group">
              <label htmlFor="event-type">Tipo de Evento</label>
              <select
                id="event-type"
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                {EVENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="date-filter">Data</label>
              <select
                id="date-filter"
                value={filters.dateFilter || ''}
                onChange={(e) => handleFilterChange('dateFilter', e.target.value)}
                className="filter-select"
              >
                {DATE_FILTERS.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="time-period">Horário</label>
              <select
                id="time-period"
                value={filters.timePeriod || ''}
                onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                className="filter-select"
              >
                {TIME_PERIODS.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



