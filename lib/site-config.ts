// Site configuration for Cemetery Near Me (USA)
export const getSiteConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ||
                 (typeof window !== 'undefined' ? window.location.hostname : 'cemeterynearbyme.com');

  const configs: Record<string, {
    id: string;
    domain: string;
    name: string;
    description: string;
  }> = {
    'cemeterynearbyme.com': {
      id: 'cemetery',
      domain: 'cemeterynearbyme.com',
      name: 'Cemetery Near Me',
      description: 'Find cemeteries and memorial parks near you'
    },
    'www.cemeterynearbyme.com': {
      id: 'cemetery',
      domain: 'cemeterynearbyme.com',
      name: 'Cemetery Near Me',
      description: 'Find cemeteries and memorial parks near you'
    },
    'localhost:3000': {
      id: 'cemetery',
      domain: 'cemeterynearbyme.com',
      name: 'Cemetery Near Me',
      description: 'Find cemeteries and memorial parks near you'
    },
    'localhost:3001': {
      id: 'cemetery',
      domain: 'cemeterynearbyme.com',
      name: 'Cemetery Near Me',
      description: 'Find cemeteries and memorial parks near you'
    }
  };

  return configs[domain] || configs['cemeterynearbyme.com'];
};
