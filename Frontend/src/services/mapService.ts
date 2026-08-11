import type { Location } from '../types';

export const mapService = {
  calculateDistanceKm(loc1: Location, loc2: Location): number {
    const R = 6371; // Earth radius in km
    const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
    const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.lat * Math.PI) / 180) *
        Math.cos((loc2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return parseFloat(d.toFixed(1));
  },

  getStaticMapBounds(locations: Location[]) {
    if (!locations.length) return { center: { lat: 28.6139, lng: 77.2090 }, zoom: 12 };
    const avgLat = locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;
    return {
      center: { lat: avgLat, lng: avgLng },
      zoom: 13,
    };
  }
};
