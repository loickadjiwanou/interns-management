import React, { useState } from 'react';
import { ChevronDown, Filter, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Intern } from '../../types';

interface InternsTableProps {
  interns: Intern[];
  onViewIntern: (intern: Intern) => void;
  onEditIntern: (intern: Intern) => void;
  onDeleteIntern: (internId: string) => void;
}

export function InternsTable({ interns, onViewIntern, onEditIntern, onDeleteIntern }: InternsTableProps) {
  const [sortField, setSortField] = useState<keyof Intern>('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Intern) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedInterns = interns
    .filter(intern => {
      const matchesSearch = (
        `${intern.firstName} ${intern.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.tutor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = filterStatus === 'all' || intern.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      return 0;
    });

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof statusConfig]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Liste des Stagiaires
          </h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="ending_soon">Fin proche</option>
              <option value="completed">Terminé</option>
              <option value="renewed">Renouvelé</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastName')}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span>Nom</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span>Département</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('tutor')}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span>Tuteur</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Période
                </span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Statut
                </span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedInterns.map((intern) => (
              <tr key={intern.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    {intern.profileImage && (
                      <img
                        src={intern.profileImage}
                        alt={`${intern.firstName} ${intern.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {intern.firstName} {intern.lastName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {intern.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {intern.department}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {intern.tutor}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-xs">
                    <p className="text-gray-900 dark:text-white">
                      {new Date(intern.startDate).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      au {new Date(intern.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(intern.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewIntern(intern)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      title="Voir les détails"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditIntern(intern)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteIntern(intern.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedInterns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun stagiaire trouvé avec ces critères.
          </p>
        </div>
      )}
    </div>
  );
}