/**
 * SchemaMarkup Component
 *
 * Renders JSON-LD structured data for SEO purposes.
 * Supports single or multiple schema objects.
 *
 * Usage:
 * ```tsx
 * import SchemaMarkup from '@/components/SchemaMarkup';
 * import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo-config';
 *
 * // Single schema
 * <SchemaMarkup schema={generateOrganizationSchema()} />
 *
 * // Multiple schemas
 * <SchemaMarkup schema={[
 *   generateOrganizationSchema(),
 *   generateBreadcrumbSchema([...]),
 * ]} />
 * ```
 */

interface SchemaMarkupProps {
  /**
   * Schema object(s) to render as JSON-LD
   * Can be a single schema object or an array of schema objects
   */
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // Normalize to array for consistent handling
  const schemas = Array.isArray(schema) ? schema : [schema];

  // Filter out any null/undefined schemas
  const validSchemas = schemas.filter(
    (s): s is object => s !== null && s !== undefined && typeof s === 'object'
  );

  if (validSchemas.length === 0) {
    return null;
  }

  return (
    <>
      {validSchemas.map((schemaItem, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0),
          }}
        />
      ))}
    </>
  );
}

/**
 * SchemaMarkupHead Component
 *
 * Alternative component for use in Next.js metadata/head.
 * Returns the JSON-LD as a string for manual insertion.
 */
export function getSchemaMarkupString(schema: object | object[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  const validSchemas = schemas.filter(
    (s): s is object => s !== null && s !== undefined && typeof s === 'object'
  );

  if (validSchemas.length === 0) {
    return '';
  }

  // If single schema, return it directly
  if (validSchemas.length === 1) {
    return JSON.stringify(validSchemas[0]);
  }

  // If multiple schemas, wrap in @graph
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': validSchemas.map((s) => {
      // Remove @context from individual schemas when using @graph
      const { '@context': _, ...rest } = s as { '@context'?: string };
      return rest;
    }),
  });
}
