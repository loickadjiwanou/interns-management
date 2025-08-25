import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Trash2, 
  AlertTriangle, 
  Database, 
  Bell, 
  Mail,
  Clock,
  Shield,
  Save
} from 'lucide-react';
import { User, AppSettings } from '../../types';

interface SettingsSectionProps {
  user: User;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onClearAllData: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export function SettingsSection({ 
  user, 
  theme, 
  onThemeToggle, 
  onClearAllData, 
  settings,
  onUpdateSettings 
}: SettingsSectionProps) {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSettingsChange = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...localSettings, ...newSettings };
    setLocalSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    setHasUnsavedChanges(false);
  };

  const handleClearData = () => {
    onClearAllData();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration globale de l'application
        </p>
      </div>

      {/* Informations utilisateur */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Profil utilisateur
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom
            </label>
            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
              {user.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
              {user.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md capitalize">
              {user.role}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Département
            </label>
            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
              {user.department || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Apparence */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          {theme === 'light' ? (
            <Sun className="h-5 w-5 text-gray-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Apparence
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Mode sombre
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Basculer entre le thème clair et sombre
              </p>
            </div>
            <button
              onClick={onThemeToggle}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Alertes d'expiration de contrat
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recevoir des alertes quand un contrat arrive à échéance
              </p>
            </div>
            <button
              onClick={() => handleSettingsChange({
                notifications: {
                  ...localSettings.notifications,
                  contractExpiry: !localSettings.notifications.contractExpiry
                }
              })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                localSettings.notifications.contractExpiry ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  localSettings.notifications.contractExpiry ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Rappels d'évaluation
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recevoir des rappels pour les évaluations à réaliser
              </p>
            </div>
            <button
              onClick={() => handleSettingsChange({
                notifications: {
                  ...localSettings.notifications,
                  evaluationReminders: !localSettings.notifications.evaluationReminders
                }
              })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                localSettings.notifications.evaluationReminders ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  localSettings.notifications.evaluationReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Notifications par email
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recevoir les notifications par email
              </p>
            </div>
            <button
              onClick={() => handleSettingsChange({
                notifications: {
                  ...localSettings.notifications,
                  emailNotifications: !localSettings.notifications.emailNotifications
                }
              })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                localSettings.notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  localSettings.notifications.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Gestion des données */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rétention des données
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Archiver après (mois)
            </label>
            <select
              value={localSettings.dataRetention.archiveAfterMonths}
              onChange={(e) => handleSettingsChange({
                dataRetention: {
                  ...localSettings.dataRetention,
                  archiveAfterMonths: parseInt(e.target.value)
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={6}>6 mois</option>
              <option value={12}>12 mois</option>
              <option value={18}>18 mois</option>
              <option value={24}>24 mois</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Supprimer après (années)
            </label>
            <select
              value={localSettings.dataRetention.autoDeleteAfterYears}
              onChange={(e) => handleSettingsChange({
                dataRetention: {
                  ...localSettings.dataRetention,
                  autoDeleteAfterYears: parseInt(e.target.value)
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={3}>3 ans</option>
              <option value={5}>5 ans</option>
              <option value={7}>7 ans</option>
              <option value={10}>10 ans</option>
            </select>
          </div>
        </div>
      </div>

      {/* Zone de danger */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">
            Zone de danger
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-red-900 dark:text-red-400">
                Supprimer toutes les données
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                Cette action supprimera définitivement tous les stagiaires, évaluations et notifications.
                Cette action est irréversible.
              </p>
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Supprimer tout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors cursor-pointer z-50">
          <button
            onClick={handleSaveSettings}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      )}

      {/* Confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirmer la suppression
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>toutes les données</strong> ? 
              Cette action supprimera définitivement :
            </p>

            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
              <li>Tous les profils de stagiaires</li>
              <li>Toutes les évaluations</li>
              <li>Toutes les notifications</li>
              <li>Tous les documents associés</li>
            </ul>

            <p className="text-red-600 dark:text-red-400 text-sm font-semibold mb-6">
              ⚠️ Cette action est irréversible !
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}