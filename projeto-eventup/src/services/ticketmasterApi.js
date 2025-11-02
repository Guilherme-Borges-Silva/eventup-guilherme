const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || 'DEMO_KEY';

export async function fetchEvents({ countryCode = 'BR', size = 20, keyword = '' } = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/events.json`);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('countryCode', countryCode);
    url.searchParams.append('size', size);
    url.searchParams.append('sort', 'date,asc');
    
    if (keyword) {
      url.searchParams.append('keyword', keyword);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data._embedded && data._embedded.events) {
      return formatEvents(data._embedded.events);
    }

    return [];
  } catch (error) {
    console.error('Erro ao buscar eventos da Ticketmaster:', error);
    throw error;
  }
}

function formatEvents(events) {
  return events.map((event, index) => {
    const startDate = event.dates?.start?.localDate || event.dates?.start?.dateTime;
    const startTime = event.dates?.start?.localTime || '';
    
    let formattedDate = '';
    if (startDate) {
      const date = new Date(startDate);
      formattedDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    let formattedTime = '';
    if (startTime) {
      const timeParts = startTime.split(':');
      formattedTime = `${timeParts[0]}:${timeParts[1]}`;
    } else if (event.dates?.start?.dateTime) {
      const date = new Date(event.dates.start.dateTime);
      formattedTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    const venue = event._embedded?.venues?.[0] || {};
    const city = venue.city?.name || '';
    const state = venue.state?.stateCode || venue.state?.name || '';
    const venueName = venue.name || '';
    
    let location = venueName;
    if (city && state) {
      location += ` - ${city}, ${state}`;
    } else if (city) {
      location += ` - ${city}`;
    }

    const classification = event.classifications?.[0]?.segment?.name || 
                          event.classifications?.[0]?.genre?.name || 
                          'Evento';

    const image = event.images?.find(img => img.ratio === '16_9' && img.width > 600) || 
                  event.images?.[0] || 
                  null;

    return {
      id: event.id || `event-${index}`,
      title: event.name || 'Evento sem nome',
      date: formattedDate || 'Data a definir',
      time: formattedTime || 'Horário a definir',
      location: location || 'Localização a definir',
      description: event.info || event.description || 
                   `Venha participar deste evento incrível! ${event.name || ''}`,
      category: classification,
      imageUrl: image?.url || null,
      url: event.url || null,
      _raw: event
    };
  });
}

export async function fetchEventDetails(eventId) {
  try {
    const url = new URL(`${API_BASE_URL}/events/${eventId}.json`);
    url.searchParams.append('apikey', API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const event = await response.json();
    const formattedEvents = formatEvents([event]);
    return formattedEvents[0] || null;
  } catch (error) {
    console.error('Erro ao buscar detalhes do evento:', error);
    throw error;
  }
}

