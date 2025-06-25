import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Book, ArrowLeft, ArrowRight, Plus, Check } from "lucide-react";

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

interface Step3Props {
  childData: ChildData;
  step2Data: Step2Data;
  onNext: (data: Step3Data) => void;
  onPrevious: () => void;
  initialData?: Partial<Step3Data>;
}

const storyThemes = [
  {
    id: "adventure",
    name: "Adventure Quest",
    description: "Magical forests, brave heroes, and exciting discoveries",
    preview: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  },
  {
    id: "space",
    name: "Space Explorer",
    description: "Rockets, planets, and cosmic adventures",
    preview: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  },
  {
    id: "fairytale",
    name: "Fairy Tale",
    description: "Castles, magic, and enchanted kingdoms",
    preview: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  },
  {
    id: "underwater",
    name: "Ocean Adventure",
    description: "Deep sea exploration and marine friends",
    preview: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  },
  {
    id: "jungle",
    name: "Jungle Explorer",
    description: "Tropical adventures with exotic animals",
    preview: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  },
  {
    id: "pirate",
    name: "Pirate Adventure",
    description: "Treasure hunts and sailing the seven seas",
    preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  }
];

export default function Step3({ childData, step2Data, onNext, onPrevious, initialData }: Step3Props) {
  const [selectedTheme, setSelectedTheme] = useState(initialData?.theme || "");
  const [customTheme, setCustomTheme] = useState(initialData?.customTheme || "");
  const [showCustomTheme, setShowCustomTheme] = useState(false);
  
  const { toast } = useToast();

  const handleNext = () => {
    if (!selectedTheme && !customTheme.trim()) {
      toast({
        title: "Theme required",
        description: "Please select a theme or create a custom one for your story",
        variant: "destructive"
      });
      return;
    }

    onNext({
      theme: selectedTheme || "custom",
      customTheme: customTheme.trim() || undefined
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Story Summary */}
      <Card className="shadow-sm border border-gray-100 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-mint/20 rounded-xl flex items-center justify-center">
              <Book className="text-mint" size={20} />
            </div>
            <div>
              <h2 className="font-poppins font-semibold text-xl text-navy">Story Preview</h2>
              <p className="text-gray-600 text-sm">Here's what we know about your story so far</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-navy mb-2">Main Character</h4>
              <p className="text-gray-600">{childData.name}, {childData.age} years old</p>
              <p className="text-sm text-gray-500 mt-1">{step2Data.photos.length} photos uploaded</p>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-2">Art Style</h4>
              <p className="text-gray-600 capitalize">{step2Data.artStyle.replace('-', ' ')}</p>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-2">Values to Teach</h4>
              <div className="flex flex-wrap gap-1">
                {step2Data.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-coral/20 rounded-xl flex items-center justify-center">
                <Book className="text-coral" size={20} />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-navy">Story Themes</h3>
                <p className="text-gray-600 text-sm">Choose your adventure setting</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCustomTheme(!showCustomTheme)}
              className="flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Custom Theme</span>
            </Button>
          </div>

          {/* Custom Theme Input */}
          {showCustomTheme && (
            <Card className="mb-6 border border-coral/20 bg-coral/5">
              <CardContent className="p-4">
                <h4 className="font-semibold text-navy mb-2">Create Your Own Theme</h4>
                <Textarea
                  placeholder={`Describe the setting for ${childData.name}'s adventure... (e.g., "A magical bakery where ${childData.name} helps bake enchanted treats that spread joy throughout the village")`}
                  value={customTheme}
                  onChange={(e) => {
                    setCustomTheme(e.target.value);
                    if (e.target.value.trim()) {
                      setSelectedTheme("");
                    }
                  }}
                  className="min-h-[100px] resize-none border-coral/30 focus:ring-coral focus:border-coral"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Describe the world, setting, or situation where {childData.name} will have their adventure.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Predefined Themes */}
          <div className="grid md:grid-cols-3 gap-4">
            {storyThemes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  setCustomTheme("");
                }}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedTheme === theme.id && !customTheme
                    ? 'border-coral bg-coral/5'
                    : 'border-gray-200 hover:border-coral/50'
                }`}
              >
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-navy mb-1">{theme.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
                
                {selectedTheme === theme.id && !customTheme && (
                  <div className="flex items-center text-coral text-sm">
                    <Check size={16} className="mr-2" />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {customTheme.trim() && (
            <div className="mt-4 p-4 bg-mint/20 rounded-xl border border-mint/30">
              <div className="flex items-center space-x-2">
                <Check className="text-mint" size={16} />
                <span className="font-medium text-navy">Custom theme selected</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {customTheme}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center space-x-2 px-6 py-3 rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        
        <div className="text-center">
          <button className="text-coral hover:underline font-medium">
            Save & Continue Later
          </button>
        </div>
        
        <Button
          onClick={handleNext}
          className="flex items-center space-x-2 bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-coral/90"
        >
          <span>Generate Preview</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
