import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-navy">Create Your Story</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                
                return (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted 
                        ? 'bg-coral text-white' 
                        : isCurrent 
                          ? 'bg-coral text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check size={12} /> : stepNumber}
                    </div>
                    {stepNumber < totalSteps && (
                      <div className={`w-12 h-1 rounded ${
                        stepNumber < currentStep ? 'bg-coral' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
