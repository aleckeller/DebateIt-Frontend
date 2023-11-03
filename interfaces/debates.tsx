export interface FeedItemInterface {
  id: number;
  title: string;
  category_names: string[];
  summary: string;
  picture_url: string;
  end_at: string;
  leader: string;
  created_by: string;
  response_count: number;
}

export interface CoreDetailsInterface {
  id: number;
  title: string;
  summary: string;
  end_at: string;
  picture_url: string;
  created_by: string;
  leader: string;
  response_count: number;
}

export interface ResponseInterface {
  id: number;
  body: string;
  created_by: string;
  agree: number;
  disagree: number;
  agree_enabled: boolean;
  disagree_enabled: boolean;
}

export interface RawDataStateInterface extends CoreDetailsInterface {
  category_names: string[];
  responses: ResponseInterface[];
}

export interface DetailsStateInterface extends CoreDetailsInterface {
  category_names: string;
  is_response: boolean;
}

export interface ResponseStateInterface extends ResponseInterface {
  is_response: boolean;
}

export interface CreateDebateInterface {
  title: string;
  summary: string;
  endAt: Date;
  selectedCategories: Category[];
}

export interface Category {
  id: number;
}
