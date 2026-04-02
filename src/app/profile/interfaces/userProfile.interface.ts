import { Link } from "./link.interface";
import { Project } from "./project.interface";
import { TechnologyElement } from "./technologies.interface";

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

export interface Title {
  titleName:    string;
  descripcion:  null;
  titleIconURL: null;
}
