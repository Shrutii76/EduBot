import React, { useState, useEffect } from 'react';

// Types
interface StatCard {
  id: string;
  title: string;
  value: string | number;
  trend: string;
  icon: string;
  color: string;
}

interface FAQ {
  id: string;
  question: string;
  category: string;
  language: string;
  lastUpdated: string;
}

interface LiveFeedItem {
  id: string;
  time: string;
  question: string;
}

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const CampusAdminDashboard: React.FC = () => {
  // State management
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('google-sheets');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    { id: '1', label: 'Course Registration Reminders', enabled: true },
    { id: '2', label: 'Library Due Date Alerts', enabled: true },
    { id: '3', label: 'Event Announcements', enabled: false },
  ]);
  const [customAnnouncement, setCustomAnnouncement] = useState<string>('');

  // Sample data
  const statsData: StatCard[] = [
    { id: '1', title: 'Active Students', value: 2847, trend: '↗ +12% from last month', icon: '👥', color: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { id: '2', title: 'Inactive Students', value: 153, trend: '↘ -5% from last month', icon: '👤', color: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { id: '3', title: 'Total Questions Asked', value: 15624, trend: '↗ +23% from last month', icon: '💬', color: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
    { id: '4', title: 'User Satisfaction', value: '94.5%', trend: '↗ +2.1% from last month', icon: '⭐', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  ];

  const faqData: FAQ[] = [
    { id: '1', question: 'What are the library hours?', category: 'Facilities', language: 'English', lastUpdated: 'Sep 24, 2025' },
    { id: '2', question: 'How to register for courses?', category: 'Academic', language: 'English, Hindi', lastUpdated: 'Sep 23, 2025' },
    { id: '3', question: 'Campus map and directions', category: 'Facilities', language: 'English', lastUpdated: 'Sep 22, 2025' },
  ];

  const liveFeedData: LiveFeedItem[] = [
    { id: '1', time: '10:45', question: 'What are the library hours for weekends?' },
    { id: '2', time: '10:42', question: 'How do I register for spring courses?' },
    { id: '3', time: '10:38', question: 'Where is the computer science department?' },
    { id: '4', time: '10:35', question: "What's the deadline for scholarship applications?" },
    { id: '5', time: '10:32', question: 'How to access the student portal?' },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'faq', label: 'FAQ Management', icon: '❓' },
    { id: 'monitoring', label: 'Chatbot Monitoring', icon: '🤖' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'analytics', label: 'User Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Event handlers
  const handleNavClick = (navId: string): void => {
    setActiveNav(navId);
  };

  const handleToggleNotification = (id: string): void => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleFAQAction = (action: string, faqId?: string): void => {
    alert(`${action} FAQ${faqId ? ` ID: ${faqId}` : ''}`);
  };

  const handleAnnouncementAction = (action: string): void => {
    if (action === 'send' && !customAnnouncement.trim()) {
      alert('Please enter an announcement message.');
      return;
    }
    alert(`${action} announcement: ${customAnnouncement.substring(0, 50)}...`);
  };

  const handleLogout = (): void => {
    alert('Logging out...');
  };

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-5 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            CC
          </div>
          <h1 className="text-xl font-semibold text-gray-800">EduBot Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full cursor-pointer transition-all hover:bg-indigo-100 hover:-translate-y-0.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              AD
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-md shadow-xl overflow-y-auto">
          <div className="p-6 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border-l-4 border-indigo-500 translate-x-1'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:translate-x-1'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-64 mt-16 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat) => (
              <div
                key={stat.id}
                className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl"
                    style={{ background: stat.color }}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatValue(stat.value)}
                </div>
                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Dashboard Panels */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Chatbot Monitoring */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🤖 Live Chatbot Monitoring
                </h3>
                <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-all">
                  View All
                </button>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {liveFeedData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
                  >
                    <div className="text-xs text-gray-500 min-w-[45px]">{item.time}</div>
                    <div className="text-sm text-gray-700 flex-1">{item.question}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Analytics */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  📈 User Analytics Overview
                </h3>
                <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-all">
                  Detailed Report
                </button>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-indigo-600 font-medium">
                  📊 Active vs Inactive Students Chart
                </div>
                <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-indigo-600 font-medium">
                  🌐 Languages Used Distribution
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Management Panel */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                ❓ FAQ Management (CRUD)
              </h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleFAQAction('Add New')}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  + Add New FAQ
                </button>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg border-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="all">All Categories</option>
                  <option value="academic">Academic</option>
                  <option value="facilities">Facilities</option>
                  <option value="admissions">Admissions</option>
                </select>
                <select 
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg border-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="google-sheets">Google Sheets</option>
                  <option value="airtable">Airtable</option>
                  <option value="firestore">Firestore</option>
                </select>
              </div>
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full p-3 border-2 border-indigo-200 rounded-lg mb-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Question</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Category</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Language</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Last Updated</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqData
                    .filter(faq => 
                      (selectedCategory === 'all' || faq.category.toLowerCase() === selectedCategory) &&
                      (searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((faq) => (
                    <tr key={faq.id} className="hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-700 border-b border-gray-100">{faq.question}</td>
                      <td className="p-3 text-sm text-gray-700 border-b border-gray-100">{faq.category}</td>
                      <td className="p-3 text-sm text-gray-700 border-b border-gray-100">{faq.language}</td>
                      <td className="p-3 text-sm text-gray-700 border-b border-gray-100">{faq.lastUpdated}</td>
                      <td className="p-3 border-b border-gray-100">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleFAQAction('Edit', faq.id)}
                            className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded text-sm hover:bg-indigo-200 transition-all"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleFAQAction('Delete', faq.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                📢 Notifications & Announcements
              </h3>
              <button 
                onClick={() => handleAnnouncementAction('create')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Create Announcement
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-4">Automated Notifications</h4>
              <div className="space-y-3">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                    <button
                      onClick={() => handleToggleNotification(setting.id)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        setting.enabled ? 'bg-indigo-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Custom Announcement</h4>
              <textarea
                value={customAnnouncement}
                onChange={(e) => setCustomAnnouncement(e.target.value)}
                placeholder="Type your announcement here..."
                className="w-full p-3 border-2 border-indigo-200 rounded-lg mb-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none h-20"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => handleAnnouncementAction('send')}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Send Now
                </button>
                <button 
                  onClick={() => handleAnnouncementAction('schedule')}
                  className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-all"
                >
                  Schedule
                </button>
                <button 
                  onClick={() => handleAnnouncementAction('preview')}
                  className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200 transition-all"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-5">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>Last updated: September 26, 2025 at 10:47 AM</div>
              <div className="flex items-center gap-4">
                <span>Admin Support: support@campusconnect.edu</span>
                <span className="flex items-center gap-1">
                  System Status: <span className="text-green-600">✅ All systems operational</span>
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default CampusAdminDashboard;