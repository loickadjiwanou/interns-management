import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InternsSection } from './components/Interns/InternsSection';
import { EvaluationsSection } from './components/Evaluations/EvaluationsSection';
import { StatisticsSection } from './components/Statistics/StatisticsSection';
import { ReportsSection } from './components/Reports/ReportsSection';
import { NotificationsSection } from './components/Notifications/NotificationsSection';
import { SettingsSection } from './components/Settings/SettingsSection';
import { useTheme } from './hooks/useTheme';
import { 
  mockInterns,
  mockEvaluations,
  mockNotifications,
  mockKPIs,
  mockUser
} from './data/mockData';
import { Intern, Evaluation, Notification, AppSettings } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  // State management
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [interns, setInterns] = useState<Intern[]>(mockInterns);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    notifications: {
      contractExpiry: true,
      evaluationReminders: true,
      emailNotifications: true
    },
    dataRetention: {
      archiveAfterMonths: 12,
      autoDeleteAfterYears: 5
    }
  });

  // Intern management functions
  const handleAddIntern = useCallback((internData: Omit<Intern, 'id'>) => {
    const newIntern: Intern = {
      ...internData,
      id: Date.now().toString(),
      projects: [],
      evaluations: [],
      documents: []
    };
    setInterns(prev => [...prev, newIntern]);
  }, []);

  const handleEditIntern = useCallback((updatedIntern: Intern) => {
    setInterns(prev => prev.map(intern => 
      intern.id === updatedIntern.id ? updatedIntern : intern
    ));
  }, []);

  const handleDeleteIntern = useCallback((internId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stagiaire ?')) {
      setInterns(prev => prev.filter(intern => intern.id !== internId));
      // Also remove related evaluations
      setEvaluations(prev => prev.filter(evaluation => evaluation.internId !== internId));
      // Remove related notifications
      setNotifications(prev => prev.filter(notif => notif.internId !== internId));
    }
  }, []);

  // Evaluation management functions
  const handleAddEvaluation = useCallback((evaluationData: Omit<Evaluation, 'id'>) => {
    const newEvaluation: Evaluation = {
      ...evaluationData,
      id: Date.now().toString()
    };
    setEvaluations(prev => [...prev, newEvaluation]);
  }, []);

  // Notification management functions
  const handleMarkAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const handleDeleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  }, []);

  const handleClearAllNotifications = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les notifications ?')) {
      setNotifications([]);
    }
  }, []);

  // Settings management
  const handleUpdateSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
  }, []);

  const handleClearAllData = useCallback(() => {
    setInterns([]);
    setEvaluations([]);
    setNotifications([]);
    
    // Show success message
    setTimeout(() => {
      const successNotification: Notification = {
        id: Date.now().toString(),
        type: 'hiring_recommendation',
        title: 'Données supprimées',
        message: 'Toutes les données ont été supprimées avec succès.',
        date: new Date().toISOString(),
        read: false,
        priority: 'medium'
      };
      setNotifications([successNotification]);
    }, 500);
  }, []);

  // Calculate unread notifications
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Navigation handler
  const handleNotificationClick = useCallback(() => {
    setActiveSection('notifications');
  }, []);

  // Render current section
  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            kpis={mockKPIs}
            interns={interns}
            onViewIntern={() => setActiveSection('interns')}
            onEditIntern={() => setActiveSection('interns')}
            onDeleteIntern={handleDeleteIntern}
          />
        );
      case 'interns':
        return (
          <InternsSection
            interns={interns}
            onAddIntern={handleAddIntern}
            onEditIntern={handleEditIntern}
            onDeleteIntern={handleDeleteIntern}
          />
        );
      case 'evaluations':
        return (
          <EvaluationsSection
            evaluations={evaluations}
            interns={interns}
            onAddEvaluation={handleAddEvaluation}
          />
        );
      case 'statistics':
        return (
          <StatisticsSection
            kpis={mockKPIs}
            interns={interns}
            evaluations={evaluations}
          />
        );
      case 'reports':
        return (
          <ReportsSection
            interns={interns}
            evaluations={evaluations}
            kpis={mockKPIs}
          />
        );
      case 'notifications':
        return (
          <NotificationsSection
            notifications={notifications}
            interns={interns}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
          />
        );
      case 'settings':
        return (
          <SettingsSection
            user={mockUser}
            theme={theme}
            onThemeToggle={toggleTheme}
            onClearAllData={handleClearAllData}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          unreadNotifications={unreadNotifications}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            user={{
              name: mockUser.name,
              role: mockUser.role
            }}
            theme={theme}
            onThemeToggle={toggleTheme}
            notifications={unreadNotifications}
            onNotificationClick={handleNotificationClick}
            onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            {renderCurrentSection()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;