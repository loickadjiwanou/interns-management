import React from 'react';
import { X, Mail, Phone, Calendar, User, Building, Award, FileText } from 'lucide-react';
import { Intern } from '../../types';

interface InternDetailProps {
  intern: Intern;
  onClose: () => void;
}

export function InternDetail({ intern, onClose }: InternDetailProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      ending_soon: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      renewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    };
    
    const statusLabels = {
      active: 'Actif',
      ending_soon: 'Fin proche',
      completed: 'Terminé',
      renewed: 'Renouvelé'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status as keyof typeof statusConfig]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {intern.firstName} {intern.lastName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Header avec photo et statut */}
          <div className="flex items-start space-x-6">
            {intern.profileImage && (
              <img
                src={intern.profileImage}
                alt={`${intern.firstName} ${intern.lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {intern.contractType === 'stage' ? 'Stagiaire' : 'Apprenti(e)'} - {intern.department}
                </h3>
                {getStatusBadge(intern.status)}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Tuteur: {intern.tutor}
              </p>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informations personnelles
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{intern.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{intern.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">{intern.department}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">Tuteur: {intern.tutor}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Période de stage
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Début</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(intern.startDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fin</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(intern.endDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compétences */}
          {intern.skills.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-gray-500" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Compétences
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {intern.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projets */}
          {intern.projects.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Projets
              </h4>
              <div className="space-y-3">
                {intern.projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h5>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : project.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                      }`}>
                        {project.status === 'completed' ? 'Terminé' : 
                         project.status === 'in_progress' ? 'En cours' : 'En attente'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {project.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}
                      {project.endDate && (
                        <span> - Fin: {new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {intern.documents.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-gray-500" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Documents
                </h4>
              </div>
              <div className="space-y-2">
                {intern.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Ajouté le {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}