import { Report } from '../types';
import { storageService } from './storageService';
import { geoUtils } from '../utils/geoUtils';

export const reportService = {
  submitReport(report: Report) {
    storageService.saveReport(report);
    this.checkCriticalArea(report.location.lat, report.location.lng);
  },

  getCriticalAreas() {
    const reports = storageService.getReports();
    const locations = new Map<string, { count: number; reports: Report[] }>();

    reports.forEach(report => {
      const key = `${report.location.lat.toFixed(4)},${report.location.lng.toFixed(4)}`;
      if (!locations.has(key)) {
        locations.set(key, { count: 0, reports: [] });
      }
      const location = locations.get(key)!;
      location.count++;
      location.reports.push(report);
    });

    return Array.from(locations.entries())
      .filter(([, data]) => data.count >= 3)
      .map(([key, data]) => ({
        location: key.split(',').map(Number),
        count: data.count,
        reports: data.reports,
        severity: this.calculateSeverity(data.count)
      }));
  },

  calculateSeverity(count: number) {
    if (count >= 10) return 'critical';
    if (count >= 7) return 'high';
    if (count >= 3) return 'medium';
    return 'low';
  },

  checkCriticalArea(lat: number, lng: number) {
    const nearbyReports = storageService.getReportsByLocation(lat, lng, 1);
    if (nearbyReports.length >= 3) {
      // Automatically flag for cybercrime reporting
      return {
        isCritical: true,
        count: nearbyReports.length,
        reports: nearbyReports
      };
    }
    return {
      isCritical: false,
      count: nearbyReports.length,
      reports: []
    };
  }
};