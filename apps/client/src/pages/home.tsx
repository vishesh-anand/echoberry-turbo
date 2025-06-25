import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Camera,
  Palette,
  Heart,
  ArrowRight,
  Users,
  BookOpen,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-coral/10 to-teal/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-coral/20 text-coral hover:bg-coral/30 mb-6">
                ✨ AI-Powered Storytelling
              </Badge>
              <h1 className="font-poppins font-bold text-5xl lg:text-6xl text-navy leading-tight mb-6">
                Create Magical Stories with Your Child as the
                <span className="text-coral"> Hero</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your child's photos into personalized illustrated
                stories that teach values, spark imagination, and create lasting
                memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/wizard">
                  <Button className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-lg font-medium">
                    Create Your Story
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="px-8 py-4 rounded-full text-lg"
                >
                  View Sample Stories
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="transform rotate-3 hover:rotate-0 transition-transform">
                  <CardContent className="p-4">
                    <img
                      src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                      alt="Child reading"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-sm text-navy">
                      Emma's Space Adventure
                    </h4>
                    <p className="text-xs text-gray-500">
                      Teaching courage & curiosity
                    </p>
                  </CardContent>
                </Card>

                <Card className="transform -rotate-2 hover:rotate-0 transition-transform mt-8">
                  <CardContent className="p-4">
                    <img
                      src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                      alt="Child playing"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-sm text-navy">
                      Max's Jungle Quest
                    </h4>
                    <p className="text-xs text-gray-500">
                      Teaching friendship & sharing
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute top-4 right-4 bg-mint/20 rounded-full p-3">
                <Sparkles className="text-mint" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-navy mb-4">
              How Echoberry Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create personalized stories in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="relative border-2 border-coral/20 hover:border-coral/40 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="text-coral" size={32} />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="font-poppins font-semibold text-xl text-navy mb-4">
                  Upload Photos
                </h3>
                <p className="text-gray-600">
                  Add 3-5 clear photos of your child. Our AI will use these to
                  create personalized illustrations.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative border-2 border-teal/20 hover:border-teal/40 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="text-teal" size={32} />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="font-poppins font-semibold text-xl text-navy mb-4">
                  Choose Style & Values
                </h3>
                <p className="text-gray-600">
                  Select art style, story theme, and values you want to teach
                  through the adventure.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative border-2 border-sky/20 hover:border-sky/40 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sky/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-sky" size={32} />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-sky rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="font-poppins font-semibold text-xl text-navy mb-4">
                  Get Your Story
                </h3>
                <p className="text-gray-600">
                  Receive a beautifully illustrated, personalized story with
                  your child as the hero.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-navy mb-4">
              Why Choose Echoberry?
            </h2>
            <p className="text-xl text-gray-600">
              More than just a story - a personalized learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Heart className="text-coral mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  Value-Based Learning
                </h3>
                <p className="text-gray-600 text-sm">
                  Every story is designed to teach important values like
                  courage, kindness, and friendship.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Sparkles className="text-teal mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  AI-Powered Personalization
                </h3>
                <p className="text-gray-600 text-sm">
                  Advanced AI creates unique stories tailored to your child's
                  age, interests, and photos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Palette className="text-sky mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  Multiple Art Styles
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose from 3D animation, watercolor, anime, and more to match
                  your child's preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="text-mint mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  Family Bonding
                </h3>
                <p className="text-gray-600 text-sm">
                  Create shared reading experiences that bring families together
                  and spark conversations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <BookOpen className="text-coral mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  Printable & Shareable
                </h3>
                <p className="text-gray-600 text-sm">
                  Download high-quality PDFs or share digital versions with
                  family and friends.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Star className="text-teal mb-4" size={32} />
                <h3 className="font-semibold text-lg text-navy mb-2">
                  Age-Appropriate
                </h3>
                <p className="text-gray-600 text-sm">
                  Stories are carefully crafted to be engaging and appropriate
                  for each age group.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-navy mb-4">
              Sample Stories
            </h2>
            <p className="text-xl text-gray-600">
              See the magic of personalized storytelling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample stories would go here */}
            {Array.from({ length: 6 }, (_, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    [
                      "1503454537195-1dcabb73ffb9",
                      "1544717297-fa95b6ee9643",
                      "1519340241574-2cec6aef0c01",
                      "1578662996442-48f60103fc96",
                      "1513475382585-d06e58bcb0e0",
                      "1541961017774-22349e4a1262",
                    ][index]
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`}
                  alt={`Sample story ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-navy mb-2">
                    {
                      [
                        "The Brave Knight Adventure",
                        "Magical Forest Quest",
                        "Space Explorer Mission",
                        "Underwater Treasure Hunt",
                        "Fairy Tale Kingdom",
                        "Jungle Safari",
                      ][index]
                    }
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    A personalized story teaching{" "}
                    {
                      [
                        "courage",
                        "kindness",
                        "curiosity",
                        "friendship",
                        "honesty",
                        "perseverance",
                      ][index]
                    }
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">
                      {
                        [
                          "3D Animation",
                          "Watercolor",
                          "Soft Anime",
                          "Mixed Media",
                          "3D Animation",
                          "Watercolor",
                        ][index]
                      }
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Age {3 + index}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-navy mb-4">
              Simple, Fair Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Create magical stories for your children at an affordable price
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Trial */}
            <Card className="border-2 border-gray-200 hover:border-coral/50 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="font-poppins font-semibold text-xl text-navy mb-2">
                  Free Trial
                </h3>
                <div className="text-4xl font-bold text-coral mb-4">$0</div>
                <p className="text-gray-600 mb-6">Try before you buy</p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li>✓ 1 personalized story</li>
                  <li>✓ All art styles available</li>
                  <li>✓ Basic values selection</li>
                  <li>✓ Digital download (PDF)</li>
                </ul>
                <Link href="/wizard">
                  <Button variant="outline" className="w-full rounded-full">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Single Story */}
            <Card className="border-2 border-coral bg-coral/5 hover:border-coral transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-coral text-white text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                  Most Popular
                </div>
                <h3 className="font-poppins font-semibold text-xl text-navy mb-2">
                  Single Story
                </h3>
                <div className="text-4xl font-bold text-coral mb-4">$9.99</div>
                <p className="text-gray-600 mb-6">
                  Perfect for special occasions
                </p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li>✓ 1 personalized story</li>
                  <li>✓ All art styles & themes</li>
                  <li>✓ Custom values & plots</li>
                  <li>✓ High-quality PDF download</li>
                  <li>✓ Print-ready format</li>
                </ul>
                <Link href="/wizard">
                  <Button className="w-full bg-coral hover:bg-coral/90 text-white rounded-full">
                    Create Story
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Story Bundle */}
            <Card className="border-2 border-gray-200 hover:border-coral/50 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="font-poppins font-semibold text-xl text-navy mb-2">
                  Story Bundle
                </h3>
                <div className="text-4xl font-bold text-coral mb-4">$24.99</div>
                <p className="text-gray-600 mb-6">Best value for families</p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li>✓ 3 personalized stories</li>
                  <li>✓ All premium features</li>
                  <li>✓ Multiple children support</li>
                  <li>✓ Priority customer support</li>
                  <li>✓ Commercial printing rights</li>
                </ul>
                <Link href="/wizard">
                  <Button variant="outline" className="w-full rounded-full">
                    Get Bundle
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-coral to-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-4xl mb-6">
            Ready to Create Your Child's Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of families creating magical memories with
            personalized stories
          </p>
          <Link href="/wizard">
            <Button className="bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full text-sm font-medium">
              Start Creating Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
