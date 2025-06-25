import { useState } from "react";
import { useLocation } from "wouter";
import { useUser, SignInButton } from "@clerk/clerk-react";
import ProgressIndicator from "@/components/wizard/progress-indicator";
import Step1 from "@/components/wizard/step-1";
import Step2 from "@/components/wizard/step-2";
import Step3 from "@/components/wizard/step-3";
import Step4 from "@/components/wizard/step-4";
import { Button } from "@/components/ui/button";

interface ChildData {
  name: string;
  age: number;
}

interface Step2Data {
  photos: File[];
  artStyle: string;
  values: string[];
}

interface Step3Data {
  theme: string;
  customTheme?: string;
}

export default function Wizard() {
  const [, setLocation] = useLocation();
  const { isSignedIn } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [childData, setChildData] = useState<ChildData>({ name: "", age: 0 });
  const [step2Data, setStep2Data] = useState<Step2Data>({
    photos: [],
    artStyle: "",
    values: [],
  });
  const [step3Data, setStep3Data] = useState<Step3Data>({ theme: "" });

  const totalSteps = 4;

  const handleStep1Complete = (data: ChildData) => {
    if (!isSignedIn) {
      return;
    }
    setChildData(data);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    if (!isSignedIn) {
      return;
    }
    setStep2Data(data);
    setCurrentStep(3);
  };

  const handleStep3Complete = (data: Step3Data) => {
    if (!isSignedIn) {
      return;
    }
    setStep3Data(data);
    setCurrentStep(4);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleWizardComplete = () => {
    // Reset wizard and go to home
    setCurrentStep(1);
    setChildData({ name: "", age: 0 });
    setStep2Data({ photos: [], artStyle: "", values: [] });
    setStep3Data({ theme: "" });
    setLocation("/");
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-navy">
            Sign in to Create Your Story
          </h1>
          <p className="text-gray-600">
            Please sign in to start creating your personalized story.
          </p>
          <SignInButton mode="modal">
            <Button className="bg-coral text-white hover:bg-coral/90 rounded-full font-medium">
              Sign In to Continue
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <div className="py-8">
        {currentStep === 1 && (
          <Step1
            onNext={handleStep1Complete}
            initialData={childData.name ? childData : undefined}
          />
        )}

        {currentStep === 2 && (
          <Step2
            childData={childData}
            onNext={handleStep2Complete}
            onPrevious={handlePreviousStep}
            initialData={step2Data.artStyle ? step2Data : undefined}
          />
        )}

        {currentStep === 3 && (
          <Step3
            childData={childData}
            step2Data={step2Data}
            onNext={handleStep3Complete}
            onPrevious={handlePreviousStep}
            initialData={step3Data.theme ? step3Data : undefined}
          />
        )}

        {currentStep === 4 && (
          <Step4
            childData={childData}
            step2Data={step2Data}
            step3Data={step3Data}
            onPrevious={handlePreviousStep}
            onComplete={handleWizardComplete}
          />
        )}
      </div>
    </div>
  );
}
