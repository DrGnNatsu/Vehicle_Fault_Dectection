import { Car, Twitter, Youtube, Linkedin, Disc3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t border-border shadow-[0_-2px_8px_rgba(0,0,0,0.08)] flex justify-center">
      <div className="w-full !px-4 pt-12 flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Car className="w-6 h-6 text-blue-600" strokeWidth={2} />
          <h2 className="text-blue-600 text-base font-black">CarScript</h2>
        </div>

        {/* Social media (EXTERNAL) */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1  rounded-xl hover:bg-gray-100"
          >
            <Twitter className="w-6 h-6 text-gray-500" />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1  rounded-xl hover:bg-gray-100"
          >
            <Youtube className="w-6 h-6 text-gray-500" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1  rounded-xl hover:bg-gray-100"
          >
            <Linkedin className="w-6 h-6 text-gray-500" />
          </a>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1  rounded-xl hover:bg-gray-100"
          >
            <Disc3 className="w-6 h-6 text-gray-500" />
          </a>
        </div>

        {/* Footer bottom */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-xs">
            © 2025, MLT Cooperation. All Rights Reserved.
          </p>

          {/* Internal routes */}
          <div className="flex items-center gap-2">
            <Link
              to="/privacy"
              className="text-gray-500 text-xs hover:text-gray-700"
            >
              Privacy
            </Link>
            <span className="text-gray-500 text-xs">·</span>
            <Link
              to="/terms"
              className="text-gray-500 text-xs hover:text-gray-700"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
