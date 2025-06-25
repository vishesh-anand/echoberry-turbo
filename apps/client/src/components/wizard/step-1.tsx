import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowRight } from "lucide-react";

interface Step1Props {
  onNext: (data: { name: string; age: number }) => void;
  initialData?: { name: string; age: number };
}

export default function Step1({ onNext, initialData }: Step1Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age) {
      onNext({ name, age: parseInt(age) });
    }
  };

  const isValid = name.trim() && age;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-coral/20 rounded-xl flex items-center justify-center">
              <User className="text-coral" size={24} />
            </div>
            <div>
              <h2 className="font-poppins font-semibold text-2xl text-navy">
                Tell us about your child
              </h2>
              <p className="text-gray-600">
                Help us create a story that's perfect for them
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-navy">
                Child's Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Emma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base rounded-xl border-gray-200 focus:ring-2 focus:ring-coral focus:border-coral"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-navy">
                Age *
              </Label>
              <Select value={age} onValueChange={setAge} required>
                <SelectTrigger className="h-12 text-base rounded-xl border-gray-200 focus:ring-2 focus:ring-coral focus:border-coral">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 years old</SelectItem>
                  <SelectItem value="4">4 years old</SelectItem>
                  <SelectItem value="5">5 years old</SelectItem>
                  <SelectItem value="6">6 years old</SelectItem>
                  <SelectItem value="7">7 years old</SelectItem>
                  <SelectItem value="8">8 years old</SelectItem>
                  <SelectItem value="9">9 years old</SelectItem>
                  <SelectItem value="10">10 years old</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={!isValid}
                className="w-full h-12 bg-coral text-white hover:bg-coral/90 rounded-xl font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-mint/20 rounded-xl border border-mint/30">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-mint rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Privacy Note:</strong> We only use this information to personalize your story. 
                Your child's details are never shared with third parties.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
