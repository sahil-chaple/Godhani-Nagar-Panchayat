export interface Councillor {
  id: string;
  name: string;
  role: 'President' | 'Vice President' | 'Chief Officer' | 'Councillor';
  ward?: number;
  photo: string;
  email: string;
  phone: string;
  vision: string;
  term: string;
  gender: 'Male' | 'Female';
}

export interface PropertyRecord {
  propertyId: string;
  ownerName: string;
  mobile: string;
  address: string;
  ward: string;
  propertyType: string;
  dueAmount: number;
  status: 'Pending' | 'Paid';
}

export interface WaterRecord {
  connectionNo: string;
  ownerName: string;
  mobile: string;
  address: string;
  ward: string;
  dueAmount: number;
  status: 'Pending' | 'Paid';
}

export interface Complaint {
  id: string;
  fullName: string;
  mobile: string;
  ward: string;
  complaintType: string;
  description: string;
  imageUrl?: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'Roads' | 'Schools' | 'Water Supply' | 'Street Lights' | 'Other';
  image: string;
  progress: number;
  budget: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  ward: number;
}

export interface Scheme {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  ministry: string;
  benefits: string[];
  eligibility: string;
  image: string;
  link: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Festival' | 'Roads' | 'Schools' | 'Temples' | 'Development' | 'Events';
  image: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  type: 'Notice' | 'Tender' | 'Announcement';
  date: string;
  month: string;
  description: string;
  fileSize?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Forms' | 'Acts' | 'Reports' | 'Budgets';
  fileSize: string;
  fileType: string;
}

export interface MapMarker {
  id: string;
  name: string;
  category: 'Office' | 'School' | 'Hospital' | 'Railway' | 'Bank' | 'Temple' | 'BusStop' | 'Park';
  latitude: number;
  longitude: number;
  googleMapsUrl: string;

  description: string;
}

export interface LanguageStrings {
  home: string;
  about: string;
  administration: string;
  citizenServices: string;
  development: string;
  schemes: string;
  gallery: string;
  downloads: string;
  contact: string;
  tagline: string;
  welcome: string;
  exploreServices: string;
  knowMore: string;
  statistics: string;
  population: string;
  wards: string;
  families: string;
  literacy: string;
  male: string;
  female: string;
}
