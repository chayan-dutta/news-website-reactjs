export interface NewsApiResponse {
  nextPage: number;
  results: NewsResults[];
  status: string;
  totalResults: number;
}

export interface NewsResults {
  category: string[];
  content: string;
  country: string[];
  creator: string[] | null;
  description: string;
  image_url: string | undefined;
  keyword: string[] | null;
  language: string;
  link: string;
  pubDate: string;
  source_id: string;
  source_priority: number;
  title: string;
  video_url: string | null;
}

export interface CountryNameAndCode {
  label: string;
  value: string;
}

export interface NewsContextType {
  nextPage: number;
  status: string;
  results: NewsResults[];
  totalResults: number;
  getNewsData: (country: string, topic: string | null) => void;
}
