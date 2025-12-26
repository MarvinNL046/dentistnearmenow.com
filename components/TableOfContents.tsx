'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  variant?: 'default' | 'sticky' | 'compact';
  title?: string;
  className?: string;
}

export default function TableOfContents({
  items,
  variant = 'default',
  title = 'Table of Contents',
  className = '',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Observe sections for active state
  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (items.length === 0) {
    return null;
  }

  // Get indentation based on heading level
  const getIndent = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-0';
      case 2:
        return 'pl-0';
      case 3:
        return 'pl-4';
      case 4:
        return 'pl-8';
      default:
        return 'pl-0';
    }
  };

  // Get font size based on heading level
  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
      case 2:
        return 'text-sm font-medium';
      case 3:
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <List className="w-4 h-4" />
          Jump to:
        </span>
        {items.filter(item => item.level <= 2).map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-sm text-primary hover:underline"
          >
            {item.title}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'sticky') {
    return (
      <nav
        className={`sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto bg-gray-50 rounded-xl p-6 ${className}`}
        aria-label="Table of contents"
      >
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={getIndent(item.level)}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left py-1.5 px-3 rounded-lg transition-all
                  ${getFontSize(item.level)}
                  ${activeId === item.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {activeId === item.id && (
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span className="line-clamp-1">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Default variant
  return (
    <nav
      className={`bg-gray-50 rounded-xl p-6 ${className}`}
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={getIndent(item.level)}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`
                w-full text-left py-1.5 px-3 rounded-lg transition-all
                ${getFontSize(item.level)}
                ${activeId === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                }
              `}
            >
              <span className="line-clamp-1">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Helper function to extract TOC items from headings in content
export function extractTOCItems(content: string): TOCItem[] {
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h\1>/g;
  const items: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    items.push({
      level: parseInt(match[1], 10),
      id: match[2],
      title: match[3],
    });
  }

  return items;
}

// Helper function to generate id-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
