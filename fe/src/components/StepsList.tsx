import { CheckCircle, Circle, Clock } from 'lucide-react';
import type { Step } from '../types/index';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className=" px-3 py-1 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="text-sm">
        {steps.map((step) => (
          <div
            key={`${step.id}-${step.status}-${step.title}`}
            className={`rounded-lg cursor-pointer transition-colors ${
              currentStep === step.id
                ? 'bg-gray-800 border border-gray-700'
                : 'hover:bg-gray-800'
            }`}
            onClick={() => onStepClick(step.id)}
          >
            <div className="flex items-center gap-2">
              {step.status === 'completed' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : step.status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-blue-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="font-medium text-gray-100">{step.title}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}