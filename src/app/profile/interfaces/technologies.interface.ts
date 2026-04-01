export interface TechCategory {
  id: number;
  techCategoryName: string;
  imgURL: null;
  descripcion: null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TechnologyElement {
  technology: Technology;
}

export interface Technology {
  id: number;
  techName: string;
  imgURL: string;
  descripcion: null;
}
