export enum ChemicalForm {
  solid = 's',
  gas = 'g',
  aquatic = 'aq',
  liquid = 'l',
}

export type Substance = {
  _id: string;
  form: ChemicalForm;
  enthalpy: number | null;
  gibs: number | null;
  entropy: number | null;
  name: string;
  author: string | 'Anonymous';

  searchName?: string;
  approved?: boolean | false;
  source?: SourceBook;
};

export type SubstanceData = {
  _id: {
    $oid: string;
  };
  form: 's' | 'g' | 'aq' | 'l';
  enthalpy: number | null;
  gibs: number | null;
  entropy: number | null;
  name: string;
  author: string | 'Anonymous';
  approved?: boolean | false;
  scientificName?: string;
  searchName?: string;
  molarMass?: number;
};

export type SubstanceUI = {
  id: string;
  coefficient: number | 1;
  type: 'reactant' | 'product';
  chosen: boolean;
  substance: Substance | null;

  specialUI?: string;
};

type SourceTimeDocument = {
  yearMade: number;
  yearRead: number;
  comments?: string;
};

export type SourceBook = {
  title: string;
  publishers: Array<string>;
  authors: Array<string>;
  site: number | Array<string> | string;
  sourceDate: SourceTimeDocument;
};

export type SourceWeb = {
  title: string;
  websiteName: string;
  websiteURL: string;
  websiteAuthor?: string;
  sourceDate: SourceTimeDocument;
};

export type ThermoDynamicForm = 'enthalpy' | 'entropy' | 'gibs';
