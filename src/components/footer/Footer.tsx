import { Bug, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-grey-200 bg-grey-100 p-6 text-grey-900">
      <div className="flex flex-col justify-between gap-3">
        <div className="flex items-center">
          <span className="text-16 font-bold">인턴하샤</span>
        </div>

        <div className="flex flex-col gap-2 text-13 font-light">
          <div className="flex items-center gap-2">
            <Mail size={13} />
            <span>Contact:</span>
            <a
              href="mailto:internhasha.official@gmail.com"
              className="hover:text-blue-800 hover:underline"
            >
              internhasha.official@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Bug size={13} />
            <span>버그 제보:</span>
            <a
              href="mailto:internhasha.official@gmail.com"
              className="hover:text-blue-800 hover:underline"
            >
              internhasha.official@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-grey-700">
          <p>© {new Date().getFullYear()} internhasha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
