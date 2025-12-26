import Link from 'next/link';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';
import { US_STATES } from '@/lib/dentist-data';

interface NearbyLocationsProps {
  currentCity?: string;
  state: string;
  cities?: string[];
  limit?: number;
  variant?: 'list' | 'grid' | 'inline';
}

// Major cities by state (fallback when cities prop is not provided)
const majorCitiesByState: Record<string, string[]> = {
  AL: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  AK: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'],
  AZ: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Tempe'],
  AR: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
  CA: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Oakland', 'Fresno'],
  CO: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'],
  CT: ['Hartford', 'New Haven', 'Stamford', 'Bridgeport', 'Waterbury'],
  DE: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
  FL: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'St. Petersburg'],
  GA: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
  HI: ['Honolulu', 'Hilo', 'Kailua', 'Pearl City', 'Waipahu'],
  ID: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello'],
  IL: ['Chicago', 'Aurora', 'Naperville', 'Rockford', 'Springfield'],
  IN: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
  IA: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
  KS: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
  KY: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
  LA: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
  ME: ['Portland', 'Lewiston', 'Bangor', 'Auburn', 'South Portland'],
  MD: ['Baltimore', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda'],
  MA: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
  MI: ['Detroit', 'Grand Rapids', 'Warren', 'Ann Arbor', 'Lansing'],
  MN: ['Minneapolis', 'Saint Paul', 'Rochester', 'Bloomington', 'Duluth'],
  MS: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
  MO: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
  MT: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Helena'],
  NE: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
  NV: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
  NH: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Rochester'],
  NJ: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
  NM: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
  NY: ['New York', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'],
  NC: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
  ND: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
  OH: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
  OK: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond'],
  OR: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro'],
  PA: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Reading', 'Erie'],
  RI: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
  SC: ['Charleston', 'Columbia', 'Greenville', 'Mount Pleasant', 'Rock Hill'],
  SD: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
  TN: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
  TX: ['Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso'],
  UT: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
  VT: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
  VA: ['Virginia Beach', 'Norfolk', 'Richmond', 'Arlington', 'Alexandria'],
  WA: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  WV: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'],
  WI: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
  WY: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
  DC: ['Washington'],
};

function createCitySlug(city: string, stateAbbr: string): string {
  return `${city}-${stateAbbr}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function NearbyLocations({
  currentCity,
  state,
  cities,
  limit = 5,
  variant = 'list',
}: NearbyLocationsProps) {
  // Get state info
  const stateAbbr = state.length === 2 ? state.toUpperCase() :
    US_STATES.find(s => s.name.toLowerCase() === state.toLowerCase())?.abbr || state;
  const stateInfo = US_STATES.find(s => s.abbr === stateAbbr);
  const stateName = stateInfo?.name || state;

  // Get cities to display
  const availableCities = cities || majorCitiesByState[stateAbbr] || [];
  const filteredCities = availableCities
    .filter(city => city.toLowerCase() !== currentCity?.toLowerCase())
    .slice(0, limit);

  if (filteredCities.length === 0) {
    return null;
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          Nearby:
        </span>
        {filteredCities.map((city) => (
          <Link
            key={city}
            href={`/city/${createCitySlug(city, stateAbbr)}`}
            className="text-sm text-primary hover:underline"
          >
            {city}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Other Cities in {stateName}
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredCities.map((city) => (
            <Link
              key={city}
              href={`/city/${createCitySlug(city, stateAbbr)}`}
              className="group flex items-center gap-2 bg-white border rounded-lg p-3 hover:border-primary hover:shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {city}
              </span>
            </Link>
          ))}
        </div>
        {stateInfo && (
          <Link
            href={`/state/${stateInfo.slug}`}
            className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            View all cities in {stateName}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    );
  }

  // Default: list variant
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">
          Nearby Cities in {stateName}
        </h3>
      </div>
      <ul className="space-y-2">
        {filteredCities.map((city) => (
          <li key={city}>
            <Link
              href={`/city/${createCitySlug(city, stateAbbr)}`}
              className="flex items-center gap-2 py-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <MapPin className="w-4 h-4" />
              <span>Dentists in {city}, {stateAbbr}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        ))}
      </ul>
      {stateInfo && (
        <Link
          href={`/state/${stateInfo.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          Browse all {stateName} cities
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
