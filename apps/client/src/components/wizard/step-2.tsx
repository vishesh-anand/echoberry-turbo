import React, { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  Palette,
  Heart,
  Users,
  HandHeart,
  Scale,
  Mountain,
  Gift,
  X,
  Upload,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";

interface ChildData {
  name: string;
  age: number;
}

interface Step2Data {
  photos: File[];
  artStyle: string;
  values: string[];
}

interface Step2Props {
  childData: ChildData;
  onNext: (data: Step2Data) => void;
  onPrevious: () => void;
  initialData?: Partial<Step2Data>;
}

const artStyles = [
  {
    id: "3d-animation",
    name: "3D Animation",
    description: "Pixar-style colorful and vibrant characters",
    preview:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "soft-anime",
    name: "Soft Anime",
    description: "Gentle manga-inspired illustrations",
    preview:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft, dreamy painted illustrations",
    preview:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "mixed-media",
    name: "Mixed Media",
    description: "Textured collage and craft-style art",
    preview:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

const availableValues = [
  { id: "courage", name: "Courage", icon: Heart, color: "coral" },
  { id: "kindness", name: "Kindness", icon: HandHeart, color: "teal" },
  { id: "friendship", name: "Friendship", icon: Users, color: "sky" },
  { id: "honesty", name: "Honesty", icon: Scale, color: "mint" },
  { id: "perseverance", name: "Perseverance", icon: Mountain, color: "coral" },
  { id: "sharing", name: "Sharing", icon: Gift, color: "teal" },
];

export default function Step2({
  childData,
  onNext,
  onPrevious,
  initialData,
}: Step2Props) {
  const [photos, setPhotos] = useState<File[]>(initialData?.photos || []);
  const [artStyle, setArtStyle] = useState(initialData?.artStyle || "");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialData?.values || []
  );
  const [customValue, setCustomValue] = useState("");
  const [showCustomValueInput, setShowCustomValueInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Generate stable object URLs for each photo
  const photoPreviews = useMemo(() => {
    return photos.map((photo) => ({
      file: photo,
      url: URL.createObjectURL(photo),
    }));
  }, [photos]);

  // Cleanup object URLs on unmount or when photos change
  useEffect(() => {
    return () => {
      photoPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [photoPreviews]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newPhotos = [...photos, ...validFiles].slice(0, 10);
    setPhotos(newPhotos);

    if (validFiles.length > 0) {
      toast({
        title: "Photos added",
        description: `${validFiles.length} photo(s) added successfully`,
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const toggleValue = (valueId: string) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter((v) => v !== valueId));
    } else if (selectedValues.length < 3) {
      setSelectedValues([...selectedValues, valueId]);
    } else {
      toast({
        title: "Maximum values selected",
        description: "You can select up to 3 values for your story",
        variant: "destructive",
      });
    }
  };

  const addCustomValue = () => {
    if (customValue.trim() && !selectedValues.includes(customValue.trim())) {
      if (selectedValues.length < 3) {
        setSelectedValues([...selectedValues, customValue.trim()]);
        setCustomValue("");
        setShowCustomValueInput(false);
      } else {
        toast({
          title: "Maximum values selected",
          description: "You can select up to 3 values for your story",
          variant: "destructive",
        });
      }
    }
  };

  const handleNext = () => {
    if (photos.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo of your child",
        variant: "destructive",
      });
      return;
    }
    if (!artStyle) {
      toast({
        title: "Art style required",
        description: "Please select an art style for your story",
        variant: "destructive",
      });
      return;
    }
    if (selectedValues.length === 0) {
      toast({
        title: "Values required",
        description: "Please select at least one value to teach",
        variant: "destructive",
      });
      return;
    }

    onNext({ photos, artStyle, values: selectedValues });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Photo Upload */}
        <div className="space-y-6">
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-sky/20 rounded-xl flex items-center justify-center">
                  <Camera className="text-sky" size={20} />
                </div>
                <div>
                  <h2 className="font-poppins font-semibold text-xl text-navy">
                    Upload Photos
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Add 3-5 photos of {childData.name} for the best results
                  </p>
                </div>
              </div>

              {/* Photo Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-coral/30 rounded-xl p-8 text-center bg-coral/5 hover:bg-coral/10 transition-colors cursor-pointer mb-4"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center">
                    <Upload className="text-coral" size={32} />
                  </div>
                  <div>
                    <p className="font-medium text-navy mb-1">
                      Drop photos here or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Uploaded Photos */}
              {photoPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview.url}
                        alt={`${childData.name} photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="text-white" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-3 bg-mint/20 rounded-lg border border-mint/30">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="text-mint mt-0.5" size={16} />
                  <div className="text-xs text-gray-700">
                    <strong>Tip:</strong> Use clear, well-lit photos where{" "}
                    {childData.name}'s face is clearly visible for the best AI
                    illustrations.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Art Style & Values */}
        <div className="space-y-6">
          {/* Art Style Selection */}
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center">
                  <Palette className="text-teal" size={20} />
                </div>
                <div>
                  <h2 className="font-poppins font-semibold text-xl text-navy">
                    Choose Art Style
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Select how you want your story illustrated
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {artStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setArtStyle(style.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      artStyle === style.id
                        ? "border-coral bg-coral/5"
                        : "border-gray-200 hover:border-coral/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={style.preview}
                        alt={style.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-navy">
                          {style.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {style.description}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          artStyle === style.id
                            ? "bg-coral"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {artStyle === style.id && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Values Selection */}
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-6">
              <h3 className="font-poppins font-semibold text-lg text-navy mb-4">
                Values to Teach
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Select up to 3 values for your story
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {availableValues.map((value) => {
                  const Icon = value.icon;
                  const isSelected = selectedValues.includes(value.id);
                  const colorClass = isSelected
                    ? `bg-${value.color} text-white`
                    : "border border-gray-200 hover:bg-gray-50";

                  return (
                    <button
                      key={value.id}
                      onClick={() => toggleValue(value.id)}
                      className={`flex items-center space-x-2 p-3 rounded-xl font-medium transition-colors ${colorClass}`}
                    >
                      <Icon size={16} />
                      <span>{value.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Values */}
              <div className="space-y-2">
                {selectedValues
                  .filter(
                    (value) => !availableValues.some((av) => av.id === value)
                  )
                  .map((customVal, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {customVal}
                      <button
                        onClick={() =>
                          setSelectedValues(
                            selectedValues.filter((v) => v !== customVal)
                          )
                        }
                        className="ml-2 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
              </div>

              {showCustomValueInput ? (
                <div className="flex space-x-2 mt-4">
                  <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="Enter custom value"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-coral focus:border-coral"
                    onKeyPress={(e) => e.key === "Enter" && addCustomValue()}
                  />
                  <Button
                    onClick={addCustomValue}
                    size="sm"
                    disabled={!customValue.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCustomValueInput(false);
                      setCustomValue("");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowCustomValueInput(true)}
                    className="text-coral font-medium text-sm hover:underline flex items-center justify-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add Custom Value</span>
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

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
          <span>Continue</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
