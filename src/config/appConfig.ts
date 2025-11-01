import type { SearchConfig, ResultsConfig } from '~/types/config';

export const searchConfig: SearchConfig = {
  firstName: {
    key: 'firstName',
    label: 'First Name',
    uiType: 'input',
    renderOrder: 1,
    placeholder: 'Enter Name',
  },
  lastName: {
    key: 'lastName',
    label: 'Last Name',
    uiType: 'input',
    renderOrder: 2,
    placeholder: 'Enter Surname',
  },
  dateOfBirth: {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    uiType: 'date-picker',
    renderOrder: 3,
  },
};

export const resultsConfig: ResultsConfig = {
  fullName: {
    key: 'fullName',
    label: 'Customer Name',
    extractionType: 'fullName',
    renderOrder: 1,
    width: 200,
  },
  dateOfBirth: {
    key: 'dateOfBirth',
    label: 'D.O.B.',
    extractionType: 'simple',
    format: 'date',
    renderOrder: 2,
    width: 120,
  },
  primaryPhone: {
    key: 'phones',
    label: 'Primary Phone',
    extractionType: 'primaryPhone',
    renderOrder: 3,
    width: 150,
  },
  primaryEmail: {
    key: 'emails',
    label: 'Primary Email',
    extractionType: 'primaryEmail',
    renderOrder: 4,
  },
};
