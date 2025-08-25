import React from 'react';
import { Users, Clock, TrendingUp, Star } from 'lucide-react';
import { KPICard } from './KPICard';
import { DepartmentChart } from './DepartmentChart';
import { HiringChart } from './HiringChart';
import { InternsTable } from './InternsTable';
import { KPI, Intern } from '../../types';

interface DashboardProps {
  kpis: KPI;
  interns: Intern[];
  onViewIntern: (intern: Intern) => void;
  onEditIntern: (intern: Intern) => void;
  onDeleteIntern: (internId: string) => void;
}

export function Dashboard({ kpis, interns, onViewIntern, onEditIntern, onDeleteIntern }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Stagiaires Actifs"
          value={kpis.totalActiveInterns}
          change="+2 ce mois"
          trend="up"
          icon={Users}
          color="blue"
          subtitle="Total en cours"
        />
        
        <KPICard
          title="Contrats Expirants"
          value={kpis.contractsEndingSoon}
          change="Dans 30 jours"
          trend="neutral"
          icon={Clock}
          color="orange"
          subtitle="Attention requise"
        />
        
        <KPICard
          title="Taux de Conversion"
          value={`${kpis.conversionRate}%`}
          change="+5% vs trimestre"
          trend="up"
          icon={TrendingUp}
          color="green"
          subtitle="Stage → Embauche"
        />
        
        <KPICard
          title="Note Moyenne"
          value={kpis.averageEvaluationScore.toFixed(1)}
          change="Stable"
          trend="neutral"
          icon={Star}
          color="blue"
          subtitle="Sur 5.0"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart data={kpis.departmentDistribution} />
        <HiringChart data={kpis.monthlyHirings} />
      </div>

      {/* Interns Table */}
      <InternsTable
        interns={interns}
        onViewIntern={onViewIntern}
        onEditIntern={onEditIntern}
        onDeleteIntern={onDeleteIntern}
      />
    </div>
  );
}