import type { Project } from '@/types';
import { isPast, parseISO } from 'date-fns';

/**
 * Calculates client-side metrics for a project that can change over time.
 * - Progress: Percentage of completed stages.
 * - Alerts: Number of delayed stages.
 * - Status: 'Delayed' if any stage is past its deadline, otherwise 'On Track'.
 */
export function calculateClientProjectMetrics(project: Project, setStatus: boolean = false): Project {
    if (project.status === 'Quotation' || project.status === 'Completed') {
        return { ...project, progress: project.status === 'Completed' ? 100 : 0, alerts: 0 };
    }

    const allStages = project.interventions.flatMap(i => i.stages);
    const totalStages = allStages.length;
    
    if (totalStages === 0) {
        return { ...project, progress: 0, alerts: 0 };
    }

    const completedStages = allStages.filter(s => s.status === 'completed').length;
    const progress = Math.round((completedStages / totalStages) * 100);

    const delayedStages = allStages.filter(s => s.status !== 'completed' && isPast(parseISO(s.deadline)));
    const alerts = delayedStages.length;

    let status = project.status;
    if (setStatus) {
        status = alerts > 0 ? 'Delayed' : 'On Track';
    }
    
    return {
        ...project,
        progress,
        alerts,
        status,
    };
}
