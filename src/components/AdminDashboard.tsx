import React from 'react';
import { useData } from '../context/DataContext';
import { formatReportDate, getSeverityClass } from '../utils/reportUtils';
import { Shield, MessageCircle, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { reports } = useData();

  const getStatistics = () => {
    if (!reports) return { total: 0, anonymous: 0, identified: 0 };
    
    return {
      total: reports.length,
      anonymous: reports.filter(r => r.isAnonymous).length,
      identified: reports.filter(r => !r.isAnonymous).length
    };
  };

  const stats = getStatistics();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-600 font-semibold">Total Reports</p>
                <h3 className="text-3xl font-bold text-indigo-700">{stats.total}</h3>
              </div>
              <Shield className="text-indigo-500" size={32} />
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-semibold">Identified Reports</p>
                <h3 className="text-3xl font-bold text-green-700">{stats.identified}</h3>
              </div>
              <Users className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-semibold">Anonymous Reports</p>
                <h3 className="text-3xl font-bold text-purple-700">{stats.anonymous}</h3>
              </div>
              <MessageCircle className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">All Reports</h2>
          <div className="space-y-4">
            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={`${report.id}-${report.timestamp}`}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{report.bullyingType}</h3>
                      <p className="text-sm text-gray-500">
                        {report.isAnonymous ? 'Anonymous Report' : `Reported by: ${report.name}`}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getSeverityClass(report.severity)}`}>
                      {report.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Location:</span>{' '}
                      {[report.location.city, report.location.district, report.location.state]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                    <p>
                      <span className="font-medium">Platform:</span>{' '}
                      {report.perpetratorInfo.platform}
                    </p>
                    {report.perpetratorInfo.username && (
                      <p>
                        <span className="font-medium">Username:</span>{' '}
                        {report.perpetratorInfo.username}
                      </p>
                    )}
                    {report.evidenceLinks.length > 0 && (
                      <div>
                        <span className="font-medium">Evidence:</span>{' '}
                        <span className="text-indigo-600">
                          {report.evidenceLinks.length} attachments
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500">
                      Reported on: {formatReportDate(report.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No reports have been submitted yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;