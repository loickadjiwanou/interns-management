import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Award, Target, Filter, Download } from 'lucide-react';
import { KPI, Intern, Evaluation } from '../../types';

interface StatisticsSectionProps {
  kpis: KPI;
  interns: Intern[];
  evaluations: Evaluation[];
}

export function StatisticsSection({ kpis, interns, evaluations }: StatisticsSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredInterns = interns.filter(intern => {
    if (selectedDepartment !== 'all' && intern.department !== selectedDepartment) {
      return false;
    }
    return true;
  });

  const departments = Array.from(new Set(interns.map(i => i.department)));
  
  // Calculs statistiques avancés
  const averageInternshipDuration = interns.reduce((total, intern) => {
    const start = new Date(intern.startDate);
    const end = new Date(intern.endDate);
    return total + Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, 0) / interns.length;

  const skillsDistribution = interns.reduce((acc, intern) => {
    intern.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topSkills = Object.entries(skillsDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const conversionByDepartment = departments.map(dept => {
    const deptInterns = interns.filter(i => i.department === dept);
    const converted = deptInterns.filter(i => i.status === 'completed' || i.status === 'renewed').length;
    return {
      department: dept,
      total: deptInterns.length,
      converted,
      rate: deptInterns.length > 0 ? (converted / deptInterns.length) * 100 : 0
    };
  });

  const evaluationTrends = evaluations.reduce((acc, evaluation) => {
    const month = new Date(evaluation.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    if (!acc[month]) {
      acc[month] = { total: 0, sum: 0 };
    }
    acc[month].total++;
    acc[month].sum += evaluation.overallScore;
    return acc;
  }, {} as Record<string, { total: number; sum: number }>);

  const monthlyAverages = Object.entries(evaluationTrends)
    .map(([month, data]) => ({
      month,
      average: data.sum / data.total
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-6);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Statistiques Détaillées
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Analyses approfondies et métriques de performance
          </p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Tous les départements</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 text-sm transition-colors">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Métriques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Durée moyenne</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(averageInternshipDuration)} jours
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Stage type</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compétences uniques</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.keys(skillsDistribution).length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Répertoriées</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
              <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Taux de satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {evaluations.length > 0 ? Math.round((evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length) * 20) : 0}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Basé sur évaluations</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ratio Tuteur/Stagiaire</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1:{Math.round(interns.length / new Set(interns.map(i => i.tutor)).size)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">En moyenne</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques détaillés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top compétences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Compétences les plus demandées
          </h3>
          <div className="space-y-3">
            {topSkills.map(([skill, count], index) => (
              <div key={skill} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-900 dark:text-white">{skill}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / Math.max(...topSkills.map(([,c]) => c))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taux de conversion par département */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Taux de conversion par département
          </h3>
          <div className="space-y-4">
            {conversionByDepartment.map((dept) => (
              <div key={dept.department}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {dept.department}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {dept.converted}/{dept.total} ({Math.round(dept.rate)}%)
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dept.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tendances d'évaluation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Évolution des notes d'évaluation
        </h3>
        <div className="flex items-end space-x-2 h-48">
          {monthlyAverages.map((data, index) => {
            const height = (data.average / 5) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex items-end justify-center mb-2">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-colors rounded-t w-full max-w-12 cursor-pointer flex items-end justify-center text-white text-xs font-medium pb-1"
                    style={{ height: `${Math.max(height, 8)}%` }}
                    title={`${data.month}: ${data.average.toFixed(1)}/5`}
                  >
                    {data.average.toFixed(1)}
                  </div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                  {data.month.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Note moyenne par mois (sur 5)
          </p>
        </div>
      </div>

      {/* Analyse par statut */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Répartition par statut de stage
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { status: 'active', label: 'Actifs', color: 'green' },
            { status: 'ending_soon', label: 'Fin proche', color: 'orange' },
            { status: 'completed', label: 'Terminés', color: 'gray' },
            { status: 'renewed', label: 'Renouvelés', color: 'blue' }
          ].map(({ status, label, color }) => {
            const count = interns.filter(i => i.status === status).length;
            const percentage = interns.length > 0 ? (count / interns.length) * 100 : 0;
            
            return (
              <div key={status} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${color}-100 dark:bg-${color}-900/20 mb-2`}>
                  <span className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
                    {count}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}