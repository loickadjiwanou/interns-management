import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { InternForm } from './InternForm';
import { InternDetail } from './InternDetail';
import { InternsTable } from '../Dashboard/InternsTable';
import { Intern } from '../../types';

interface InternsSectionProps {
  interns: Intern[];
  onAddIntern: (intern: Omit<Intern, 'id'>) => void;
  onEditIntern: (intern: Intern) => void;
  onDeleteIntern: (internId: string) => void;
}

export function InternsSection({ interns, onAddIntern, onEditIntern, onDeleteIntern }: InternsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingIntern, setEditingIntern] = useState<Intern | null>(null);
  const [viewingIntern, setViewingIntern] = useState<Intern | null>(null);

  const handleSave = (internData: Omit<Intern, 'id'> | Intern) => {
    if ('id' in internData) {
      onEditIntern(internData);
    } else {
      onAddIntern(internData);
    }
    setShowForm(false);
    setEditingIntern(null);
  };

  const handleEdit = (intern: Intern) => {
    setEditingIntern(intern);
    setShowForm(true);
  };

  const handleView = (intern: Intern) => {
    setViewingIntern(intern);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Stagiaires
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez tous les stagiaires et leurs informations
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau stagiaire</span>
        </button>
      </div>

      {showForm ? (
        <InternForm
          intern={editingIntern || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingIntern(null);
          }}
        />
      ) : (
        <InternsTable
          interns={interns}
          onViewIntern={handleView}
          onEditIntern={handleEdit}
          onDeleteIntern={onDeleteIntern}
        />
      )}

      {viewingIntern && (
        <InternDetail
          intern={viewingIntern}
          onClose={() => setViewingIntern(null)}
        />
      )}
    </div>
  );
}