import { BookOpen } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={16} />
              </div>
              <span className="font-poppins font-bold text-lg text-navy">
                Echoberry
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Creating magical personalized stories for children worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-navy mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-coral transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-coral transition-colors"
                >
                  Sample Stories
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-coral transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-navy mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#help" className="hover:text-coral transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-coral transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-coral transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-navy mb-3">Connect</h4>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-sm text-gray-500">
          © 2024 Echoberry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
