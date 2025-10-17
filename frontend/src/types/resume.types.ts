export type Education = {
  institution_name: string;
  degree: string;
  specialization: string;
  start_date: string;
  end_date: string | null;
}

export type Experience = {
  company_name: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export type Project = {
  name: string;
  description: string;
  start_date: string;
  end_date: string | null;
  link?: string;
}

export type Certificate = {
  name: string;
  organization: string;
  date: string;
  link?: string;
}

export type Language = {
  name: string;
  level: string;
}

export type Reference = {
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export type Link = {
  type: string;
  url: string;
}

export type ResumeData = {
  full_name: string;
  email: string;
  date_of_birth: string;
  city: string;
  country: string;
  phone: string;
  about: string;
  profession_id: number;
  education: string;
  salary: number;
  status: boolean;
  photo: string;
  skills: string[];
  educations: Education[];
  experiences: Experience[];
  projects?: Project[];
  certificates?: Certificate[];
  languages?: Language[];
  hobbies?: string[];
  references?: Reference[];
  links?: Link[];
  other?: string;
}

