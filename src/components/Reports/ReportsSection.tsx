import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  BarChart3, 
  Filter,
  Printer,
  Mail,
  Eye,
  Settings,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { Intern, Evaluation, KPI } from '../../types';

interface ReportsSectionProps {
  interns: Intern[];
  evaluations: Evaluation[];
  kpis: KPI;
}

export function ReportsSection({ interns, evaluations, kpis }: ReportsSectionProps) {
  const [selectedReportType, setSelectedReportType] = useState('general');
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'general',
      name: 'Rapport Général',
      description: 'Vue d\'ensemble complète des stagiaires et performances',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'evaluations',
      name: 'Rapport d\'Évaluations',
      description: 'Analyse détaillée des évaluations et compétences',
      icon: Award,
      color: 'green'
    },
    {
      id: 'contracts',
      name: 'Rapport Contractuel',
      description: 'Suivi des contrats, renouvellements et échéances',
      icon: Clock,
      color: 'orange'
    },
    {
      id: 'departments',
      name: 'Rapport par Département',
      description: 'Analyse comparative entre départements',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'trends',
      name: 'Rapport de Tendances',
      description: 'Évolution temporelle et prédictions',
      icon: TrendingUp,
      color: 'indigo'
    }
  ];

  const periods = [
    { value: 'current_month', label: 'Mois en cours' },
    { value: 'last_month', label: 'Mois dernier' },
    { value: 'current_quarter', label: 'Trimestre en cours' },
    { value: 'last_quarter', label: 'Trimestre dernier' },
    { value: 'current_year', label: 'Année en cours' },
    { value: 'last_year', label: 'Année dernière' },
    { value: 'all_time', label: 'Toute la période' }
  ];

  const departments = ['all', ...Array.from(new Set(interns.map(i => i.department)))];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulation de génération de rapport
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Ici, vous intégreriez une vraie génération de PDF/Excel
    const reportData = generateReportData();
    
    if (selectedFormat === 'pdf') {
      downloadPDF(reportData);
    } else {
      downloadExcel(reportData);
    }
    
    setIsGenerating(false);
  };

  const generateReportData = () => {
    const filteredInterns = interns.filter(intern => 
      selectedDepartment === 'all' || intern.department === selectedDepartment
    );

    return {
      type: selectedReportType,
      period: selectedPeriod,
      department: selectedDepartment,
      generatedAt: new Date().toISOString(),
      data: {
        interns: filteredInterns,
        evaluations: evaluations.filter(e => 
          filteredInterns.some(i => i.id === e.internId)
        ),
        kpis: kpis,
        summary: {
          totalInterns: filteredInterns.length,
          activeInterns: filteredInterns.filter(i => i.status === 'active').length,
          averageScore: evaluations.length > 0 
            ? evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length 
            : 0
        }
      }
    };
  };

  const downloadPDF = (data: any) => {
    // Simulation de téléchargement PDF
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_${selectedReportType}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadExcel = (data: any) => {
    // Simulation de téléchargement Excel
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_${selectedReportType}_${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const previewReport = () => {
    const data = generateReportData();
    console.log('Aperçu du rapport:', data);
    alert('Aperçu du rapport affiché dans la console (F12)');
  };

  const sendByEmail = () => {
    alert('Fonctionnalité d\'envoi par email à implémenter avec un service de messagerie');
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Génération de Rapports
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Créez et exportez des rapports détaillés sur vos stagiaires
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rapports générés</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargements</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ce mois</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Utilisateurs actifs</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration du rapport */}
        <div className="lg:col-span-2 space-y-6">
          {/* Types de rapports */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Type de rapport
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedReportType === type.id;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? getColorClasses(type.color)
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-6 w-6 mt-1 ${
                        isSelected 
                          ? '' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      <div>
                        <h4 className={`font-medium ${
                          isSelected 
                            ? '' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {type.name}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          isSelected 
                            ? 'opacity-80' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Filtres et paramètres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Période
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {periods.map(period => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Département
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les départements</option>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={previewReport}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Aperçu</span>
              </button>

              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Génération...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Générer et Télécharger</span>
                  </>
                )}
              </button>

              <button
                onClick={sendByEmail}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Envoyer par email</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimer</span>
              </button>
            </div>
          </div>

          {/* Informations du rapport */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Informations
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {reportTypes.find(t => t.id === selectedReportType)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Période:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {periods.find(p => p.value === selectedPeriod)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Département:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {selectedDepartment === 'all' ? 'Tous' : selectedDepartment}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Format:</span>
                <span className="text-gray-900 dark:text-white font-medium uppercase">
                  {selectedFormat}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Stagiaires inclus:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {selectedDepartment === 'all' 
                    ? interns.length 
                    : interns.filter(i => i.department === selectedDepartment).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historique des rapports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Historique des rapports récents
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Période
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Généré le
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Format
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Rapport Général', period: 'Novembre 2024', date: '2024-11-15', format: 'PDF' },
                { type: 'Évaluations', period: 'Octobre 2024', date: '2024-11-01', format: 'Excel' },
                { type: 'Contractuel', period: 'Q3 2024', date: '2024-10-15', format: 'PDF' }
              ].map((report, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {report.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {report.period}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(report.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium">
                      {report.format}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}