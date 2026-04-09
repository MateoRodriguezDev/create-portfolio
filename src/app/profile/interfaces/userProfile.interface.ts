import { Link } from "./link.interface";
import { Project } from "./project.interface";
import { TechnologyElement } from "./technologies.interface";
import { Title } from "./title.interface";

export interface BackendResponse {
  success: boolean;
  message: string;
  result:  any;
  errors:  any[];
  token:   null;
}

export interface UserProfileResponse {
  id?: number;
  userName:          string;
  fullName: string
  profilePictureURL: string;
  title:             Title | null;
  links:             Link[];
  projects:          Project[];
}

export interface EditProfile extends Omit<UserProfileResponse, 'links' | 'projects' | 'title'> {
  titleId: number
  userId?: number
}

