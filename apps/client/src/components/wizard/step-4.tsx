import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Book,
  ArrowLeft,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  CheckCircle,
  Clock,
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

interface Step3Data {
  theme: string;
  customTheme?: string;
}

interface GeneratedStory {
  id: number;
  title: string;
  content: string;
  artStyle: string;
  values: string[];
  theme: string;
  illustrations: string[];
  createdAt: string;
}

interface Step4Props {
  childData: ChildData;
  step2Data: Step2Data;
  step3Data: Step3Data;
  onPrevious: () => void;
  onComplete: () => void;
}

export default function Step4({
  childData,
  step2Data,
  step3Data,
  onPrevious,
  onComplete,
}: Step4Props) {
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const { toast } = useToast();

  const generateStoryMutation = useMutation({
    mutationFn: async () => {
      // First, create the child if needed
      const childResponse = await apiRequest("POST", "/api/children", {
        name: childData.name,
        age: childData.age,
      });
      const child = await childResponse.json();

      // Upload photos
      if (step2Data.photos.length > 0) {
        const formData = new FormData();
        step2Data.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        const uploadResponse = await fetch(`/api/children/${child.id}/photos`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Failed to upload photos");
        }
      }

      // Generate story
      const storyResponse = await apiRequest("POST", "/api/stories/generate", {
        childId: child.id,
        artStyle: step2Data.artStyle,
        values: step2Data.values,
        theme: step3Data.theme,
        customTheme: step3Data.customTheme,
      });

      return storyResponse.json();
    },
    onSuccess: (generatedStory) => {
      setStory(generatedStory);
      toast({
        title: "Story generated!",
        description: `${childData.name}'s personalized story is ready!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description:
          error.message || "Failed to generate story1. Please try again.",
        variant: "destructive",
      });
    },
  });

  const regenerateStory = () => {
    generateStoryMutation.mutate();
  };

  // Auto-generate story when component mounts
  React.useEffect(() => {
    if (!story && !generateStoryMutation.isPending) {
      generateStoryMutation.mutate();
    }
  }, []);

  const formatStoryContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Generation Status */}
      <Card className="shadow-sm border border-gray-100 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  generateStoryMutation.isPending
                    ? "bg-coral/20"
                    : story
                    ? "bg-mint/20"
                    : "bg-gray-100"
                }`}
              >
                {generateStoryMutation.isPending ? (
                  <Clock className="text-coral animate-spin" size={20} />
                ) : story ? (
                  <CheckCircle className="text-mint" size={20} />
                ) : (
                  <Sparkles className="text-gray-400" size={20} />
                )}
              </div>
              <div>
                <h2 className="font-poppins font-semibold text-xl text-navy">
                  {generateStoryMutation.isPending
                    ? "Creating your story..."
                    : story
                    ? "Story ready!"
                    : "Generate Story"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {generateStoryMutation.isPending
                    ? "Our AI is crafting a personalized adventure for " +
                      childData.name
                    : story
                    ? "Your personalized children's book is complete"
                    : "Ready to create your story"}
                </p>
              </div>
            </div>

            {story && (
              <Button
                onClick={regenerateStory}
                variant="outline"
                disabled={generateStoryMutation.isPending}
                className="flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Regenerate</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Story Content */}
      {generateStoryMutation.isPending ? (
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-8">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ) : story ? (
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-8">
            {/* Story Header */}
            <div className="text-center mb-8">
              <h1 className="font-poppins font-bold text-3xl text-navy mb-4">
                {story.title}
              </h1>
              <p className="text-gray-600 text-lg">
                A personalized story for {childData.name}
              </p>

              <div className="flex justify-center items-center space-x-4 mt-4">
                <Badge variant="secondary">
                  {story.artStyle.replace("-", " ")}
                </Badge>
                {story.values.map((value, index) => (
                  <Badge key={index} variant="outline">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              {formatStoryContent(story.content)}
            </div>

            {/* Story Metadata */}
            <div className="border-t border-gray-100 pt-6 mt-8">
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div>
                  <strong>Created:</strong>{" "}
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>Theme:</strong> {step3Data.customTheme || story.theme}
                </div>
                <div>
                  <strong>Word Count:</strong> ~
                  {story.content.split(" ").length} words
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-600 mb-2">
              Ready to generate your story
            </h3>
            <p className="text-gray-500 mb-6">
              Click the button below to create {childData.name}'s personalized
              adventure
            </p>
            <Button
              onClick={() => generateStoryMutation.mutate()}
              className="bg-coral hover:bg-coral/90 text-white px-8 py-3 rounded-full"
            >
              <Sparkles className="mr-2" size={16} />
              Generate Story
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {story && (
        <Card className="shadow-sm border border-gray-100 mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-navy mb-4">
              What's next?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto flex-col"
              >
                <Download size={24} className="mb-2" />
                <span className="font-medium">Download PDF</span>
                <span className="text-xs text-gray-500">
                  Get a printable version
                </span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto flex-col"
              >
                <Share2 size={24} className="mb-2" />
                <span className="font-medium">Share Story</span>
                <span className="text-xs text-gray-500">
                  Send to family & friends
                </span>
              </Button>

              <Button
                onClick={onComplete}
                className="bg-coral hover:bg-coral/90 text-white flex items-center space-x-2 p-4 h-auto flex-col"
              >
                <Sparkles size={24} className="mb-2" />
                <span className="font-medium">Create Another</span>
                <span className="text-xs">Make a new story</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
          {story && (
            <p className="text-gray-500 text-sm">
              Story successfully created for {childData.name}!
            </p>
          )}
        </div>

        {story && (
          <Button
            onClick={onComplete}
            className="bg-mint hover:bg-mint/90 text-white px-8 py-3 rounded-full font-medium"
          >
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}
