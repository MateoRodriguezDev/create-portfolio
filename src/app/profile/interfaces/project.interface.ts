import { TechnologyElement } from "./technologies.interface";

export interface Project {
  id: number
  projectName:  string;
  imgURL:       string;
  projectURL?:       string;
  descripcion:  string | null;
  technologies: TechnologyElement[];
  displayArt: boolean;
}

export interface CreateProject extends Omit<Project, 'technologies'> {
  userProfileId: number
  technologyIds: number[]
  file: File | null
}
