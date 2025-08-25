import React, { useState } from 'react';
import { Plus, Star, Calendar, User } from 'lucide-react';
import { Evaluation, Intern } from '../../types';

interface EvaluationsSectionProps {
  evaluations: Evaluation[];
  interns: Intern[];
  onAddEvaluation: (evaluation: Omit<Evaluation, 'id'>) => void;
}

export function EvaluationsSection({ evaluations, interns, onAddEvaluation }: EvaluationsSectionProps) {
  const [showForm, setShowForm] = useState(false);

  const getEvaluationTypeLabel = (type: string) => {
    const labels = {
      tutor: 'Tuteur',
      self: 'Auto-évaluation',
      '360_feedback': 'Feedback 360°',
      manager: 'Manager'
    };
    return labels[type as keyof typeof labels];
  };

  const getInternName = (internId: string) => {
    const intern = interns.find(i => i.id === internId);
    return intern ? `${intern.firstName} ${intern.lastName}` : 'Inconnu';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Évaluations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Suivi des évaluations et performances des stagiaires
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle évaluation</span>
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
              <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {evaluations.length > 0 
                  ? (evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <User className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total évaluations</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{evaluations.length}</p>
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
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {evaluations.filter(e => 
                  new Date(e.date).getMonth() === new Date().getMonth()
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
              <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Excellentes (≥4.5)</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {evaluations.filter(e => e.overallScore >= 4.5).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des évaluations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Historique des évaluations
          </h3>
        </div>

        <div className="p-6">
          {evaluations.length === 0 ? (
            <div className="text-center py-12">
              <Star className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                Aucune évaluation
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Commencez par créer une première évaluation.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 mx-auto transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Première évaluation</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {getInternName(evaluation.internId)}
                        </h4>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium">
                          {getEvaluationTypeLabel(evaluation.type)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Évaluateur: {evaluation.evaluatorName}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(evaluation.date).toLocaleDateString('fr-FR')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>Note: {evaluation.overallScore.toFixed(1)}/5</span>
                        </span>
                      </div>
                      
                      {evaluation.comments && (
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 italic">
                          "{evaluation.comments}"
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= evaluation.overallScore
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {evaluation.overallScore.toFixed(1)}/5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}