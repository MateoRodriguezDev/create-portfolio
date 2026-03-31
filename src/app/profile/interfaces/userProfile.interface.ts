export interface BackendResponse {
  success: boolean;
  message: string;
  result:  any;
  errors:  any[];
  token:   null;
}

export interface UserProfileResponse {
  userName:          string;
  profilePictureURL: string;
  title:             Title;
  links:             Link[];
  projects:          Project[];
}

export interface Link {
  url:         string;
  descripcion: string;
}

export interface Project {
  projectName:  string;
  imgURL:       string;
  descripcion:  string | null;
  technologies: TechnologyElement[];
}

export interface TechnologyElement {
  technology: TechnologyTechnology;
}

export interface TechnologyTechnology {
  techName:    string;
  imgURL:      string;
  descripcion: null;
}

export interface Title {
  titleName:    string;
  descripcion:  null;
  titleIconURL: null;
}
