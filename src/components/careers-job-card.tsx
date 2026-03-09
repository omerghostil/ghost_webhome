"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  emailSubject: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

interface CareersJobCardProps {
  job: JobPosition;
}

export function CareersJobCard({ job }: CareersJobCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden hover:border-neutral-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-right cursor-pointer"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2.5 py-1">
              <Briefcase className="w-3 h-3" />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2.5 py-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2.5 py-1">
              <Clock className="w-3 h-3" />
              {job.type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <a
            href={`mailto:careers@ghost-ai.com?subject=${encodeURIComponent(job.emailSubject)}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold hidden sm:inline-flex items-center justify-center gap-2 transition-colors"
          >
            הגש מועמדות
          </a>
          <ChevronDown
            className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 border-t border-neutral-100 pt-6">
            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              {job.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">
                  תחומי אחריות
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">
                  דרישות
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">
                יתרון
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.niceToHave.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-full px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <a
                href={`mailto:careers@ghost-ai.com?subject=${encodeURIComponent(job.emailSubject)}`}
              >
                <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-10 px-6 text-xs font-bold w-full">
                  <Mail className="ml-2 w-4 h-4" />
                  הגש מועמדות
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
