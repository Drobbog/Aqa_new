import { faker } from '@faker-js/faker';

export interface SignupData {
  username: string;
  email: string;
  password: string;
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  day: string;
  month: string;
  year: string;
}

export function generateSignupData(): SignupData {
  return {
    username: faker.internet.username().substring(0, 20) + 'qa',
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 6, memorable: false }) + 'Zz99!!',
    title: faker.helpers.arrayElement(['Mr.', 'Mrs.']),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.helpers.arrayElement([
      'India',
      'United States',
      'Canada',
      'Australia',
      'Israel',
      'New Zealand',
      'Singapore',
    ]),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#######'),
    mobile: faker.phone.number({ style: 'international' }),
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.number.int({ min: 1, max: 12 }).toString(),
    year: faker.number.int({ min: 1980, max: 2000 }).toString(),
  };
}
