import type { OnboardingStep } from "@/lib/types/onboarding"

interface StepIndicatorProps {
  steps: OnboardingStep[]
  currentStep: number
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  index <= currentStep ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}>
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Description */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">{steps[currentStep]?.description}</p>
      </div>
    </div>
  )
}
