import { Councillor, PropertyRecord, WaterRecord, Project, Scheme, GalleryItem, NewsItem, DownloadItem, MapMarker, LanguageStrings } from '../types';

export const ADMIN_MEMBERS: Councillor[] = [
  {
    id: 'admin-1',
    name: 'Mr. Nitin Ganvir',
    role: 'President',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    email: 'president.godhani@maharashtra.gov.in',
    phone: '+91 98230 45678',
    vision: 'To transform Godhani into Nagpur’s premier clean, green, and digital-first Nagar Panchayat with world-class drinking water, smart schools, and digital citizen delivery.',
    term: '2022 - 2027',
    gender: 'Male'
  },
  {
    id: 'admin-2',
    name: 'Mr. Satish Patil',
    role: 'Vice President',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    email: 'vp.godhani@maharashtra.gov.in',
    phone: '+91 94221 87654',
    vision: 'Ensuring seamless infrastructure development, concrete roads in all 17 wards, and robust emergency services for every citizen.',
    term: '2022 - 2027',
    gender: 'Male'
  },
  {
    id: 'admin-3',
    name: 'Mrs. Sunita Bhalekar',
    role: 'Chief Officer',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    email: 'co.godhani-ngp@gov.in',
    phone: '+91 71122 32623',
    vision: 'Administrative efficiency, transparency via absolute digitization of records, and prompt grievance redressal through our digital complaint desk.',
    term: 'Govt Appointed',
    gender: 'Female'
  },
  {
    id: 'councillor-1',
    name: 'Mrs. Rekha Khobragade',
    role: 'Councillor',
    ward: 1,
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400',
    email: 'ward1.rekha@godhaninp.org',
    phone: '+91 91580 12345',
    vision: 'Total sanitation coverage and clean drinking water facilities for all families in Ward 1.',
    term: '2022 - 2027',
    gender: 'Female'
  },
  {
    id: 'councillor-2',
    name: 'Mr. Rajesh Borkar',
    role: 'Councillor',
    ward: 2,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    email: 'ward2.rajesh@godhaninp.org',
    phone: '+91 93701 56789',
    vision: 'Modern street lighting grid and road repair campaigns throughout the sector.',
    term: '2022 - 2027',
    gender: 'Male'
  },
  {
    id: 'councillor-3',
    name: 'Mr. Arvind Waghmare',
    role: 'Councillor',
    ward: 3,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    email: 'ward3.arvind@godhaninp.org',
    phone: '+91 98902 45312',
    vision: 'Promoting local health centers, free medical diagnostic drives, and sports facilities for youth.',
    term: '2022 - 2027',
    gender: 'Male'
  },
  {
    id: 'councillor-4',
    name: 'Mrs. Deepa S. Sharma',
    role: 'Councillor',
    ward: 4,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    email: 'ward4.deepa@godhaninp.org',
    phone: '+91 95455 78210',
    vision: 'Upgradation of local Anganwadi resources and clean primary education facilities.',
    term: '2022 - 2027',
    gender: 'Female'
  }
];

export const PROPERTY_RECORDS: PropertyRecord[] = [
  {
    propertyId: 'GNP2026101',
    ownerName: 'Arvind Deshmukh',
    mobile: '9876543210',
    address: 'Plot No 23, Shri Ram Nagar, Godhani',
    ward: 'Ward No 3',
    propertyType: 'Residential',
    dueAmount: 2450,
    status: 'Pending'
  },
  {
    propertyId: 'GNP2026102',
    ownerName: 'Sunil G. Wankhede',
    mobile: '9422112233',
    address: 'H No. 455, Jai Bheem Square, Godhani',
    ward: 'Ward No 1',
    propertyType: 'Residential',
    dueAmount: 1850,
    status: 'Pending'
  },
  {
    propertyId: 'GNP2026103',
    ownerName: 'Rameshwar Mahajan',
    mobile: '9158012345',
    address: 'Shop No 12, Main Bazar Road, Godhani',
    ward: 'Ward No. 2, Godhani',
    propertyType: 'Commercial',
    dueAmount: 5200,
    status: 'Pending'
  },
  {
    propertyId: 'GNP2026104',
    ownerName: 'Suresh J. Singh',
    mobile: '9370156789',
    address: 'Plot No. 412, Pragati Nagar, Godhani',
    ward: 'Ward No. 5',
    propertyType: 'Residential',
    dueAmount: 0,
    status: 'Paid'
  }
];

export const WATER_RECORDS: WaterRecord[] = [
  {
    connectionNo: 'GNPW001',
    ownerName: 'Arvind Deshmukh',
    mobile: '9876543210',
    address: 'Plot No 23, Shri Ram Nagar, Godhani',
    ward: 'Ward No 3',
    dueAmount: 380,
    status: 'Pending'
  },
  {
    connectionNo: 'GNPW002',
    ownerName: 'Suresh J. Singh',
    mobile: '9370156789',
    address: 'Plot No. 412, Pragati Nagar, Godhani',
    ward: 'Ward No 3, Godhani',
    dueAmount: 550,
    status: 'Pending'
  },
  {
    connectionNo: 'GNPW003',
    ownerName: 'Sunil G. Wankhede',
    mobile: '9422112233',
    address: 'H No. 455, Jai Bheem Square, Godhani',
    ward: 'Ward No 1',
    dueAmount: 0,
    status: 'Paid'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Concrete Road Construction',
    category: 'Roads',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400',
    progress: 85,
    budget: '₹45.5 Lakhs',
    status: 'Ongoing',
    ward: 3
  },
  {
    id: 'proj-2',
    name: 'Primary School Digital Classroom Expansion',
    category: 'Schools',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400',
    progress: 100,
    budget: '₹12.0 Lakhs',
    status: 'Completed',
    ward: 1
  },
  {
    id: 'proj-3',
    name: 'Water Pipeline Distribution Extension',
    category: 'Water Supply',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400',
    progress: 60,
    budget: '₹34.8 Lakhs',
    status: 'Ongoing',
    ward: 2
  },
  {
    id: 'proj-4',
    name: 'LED Smart Street Light Installation',
    category: 'Street Lights',
    image: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=400',
    progress: 100,
    budget: '₹8.5 Lakhs',
    status: 'Completed',
    ward: 5
  },
  {
    id: 'proj-5',
    name: 'Nagar Panchayat Office Modernization',
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    progress: 15,
    budget: '₹55.0 Lakhs',
    status: 'Upcoming',
    ward: 3
  }
];

export const SCHEMES: Scheme[] = [
  {
    id: 'scheme-1',
    title: 'PM Awas Yojana (PMAY)',
    shortTitle: 'PMAY Gramin',
    description: 'Providing clean concrete homes with sanitation and electricity to all shelterless and lower-income families of Godhani.',
    ministry: 'Ministry of Housing and Urban Affairs',
    benefits: ['Financial assistance of up to ₹1.3 Lakhs', 'Subsidized loan interest rates', 'Sanitation grant integration under SBM'],
    eligibility: 'Families with no brick houses in India, income limit below ₹3 Lakhs annually.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    link: 'https://pmaymis.gov.in/'
  },
  {
    id: 'scheme-2',
    title: 'Jal Jeevan Mission',
    shortTitle: 'Har Ghar Jal',
    description: 'Aiming to provide secure, clean tap water connection to every individual household in Godhani village with regular testing.',
    ministry: 'Ministry of Jal Shakti',
    benefits: ['Free water pipe installation', 'Clean filtered drinking water tap inside courtyard', 'Regular ward water monitoring'],
    eligibility: 'All permanently residing families in Godhani without access to standard municipal piped water.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400',
    link: 'https://jaljeevanmission.gov.in/'
  },
  {
    id: 'scheme-3',
    title: 'Swachh Bharat Mission (SBM)',
    shortTitle: 'Swachh Bharat',
    description: 'Enforcing waste segregation at source, zero littering, and financial aid to build personal and community toilet units.',
    ministry: 'Ministry of Drinking Water and Sanitation',
    benefits: ['₹12,000 subsidy to construct private home toilet', 'Daily wet/dry waste collection at doorstep', 'No public littering fines structure'],
    eligibility: 'Residing households with lack of proper private toilet facilities.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400',
    link: 'https://swachhbharatmission.gov.in/'
  },
  {
    id: 'scheme-4',
    title: 'PM Kisan Samman Nidhi',
    shortTitle: 'PM Kisan',
    description: 'Providing income support of ₹6,000 per year in three equal installments directly to bank accounts of all farmer families.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefits: ['Direct benefit transfer of ₹6,000 annually', 'Crop insurance counseling services', 'Direct link to fertilizer subsidies'],
    eligibility: 'Landholder farmers holding cultivable land in government revenue maps.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=400',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 'scheme-5',
    title: 'Ayushman Bharat Yojana',
    shortTitle: 'PM-JAY',
    description: 'Health insurance scheme providing cover up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.',
    ministry: 'Ministry of Health and Family Welfare',
    benefits: ['Free cashless treatment at empaneled hospitals', 'Covers up to 3 days pre-hospitalization and 15 days post', 'Covers pre-existing diseases'],
    eligibility: 'Identified poor and vulnerable families under SECC 2011 database.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    link: 'https://pmjay.gov.in/'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Ganesh Festival Celebration in Godhani',
    category: 'Festival',
    image: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=600',
    date: 'Sep 2025'
  },
  {
    id: 'g-2',
    title: 'Completed Concrete Road in Ward No 3',
    category: 'Roads',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    date: 'Dec 2025'
  },
  {
    id: 'g-3',
    title: 'Digital Lab in Godhani Zilla Parishad School',
    category: 'Schools',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    date: 'Jan 2026'
  },
  {
    id: 'g-4',
    title: 'Local Hanuman Mandir Ground Upgradation',
    category: 'Temples',
    image: 'https://images.unsplash.com/photo-1609137144813-90df09b5a8cb?auto=format&fit=crop&q=80&w=600',
    date: 'Mar 2026'
  },
  {
    id: 'g-5',
    title: 'Door-to-door Waste Segregation Awareness Camp',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600',
    date: 'Apr 2026'
  },
  {
    id: 'g-6',
    title: 'Ward Water Supply Pipeline Groundbreaking',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    date: 'Jun 2026'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Property Tax Payment Deadline Extended to 31st Oct 2026',
    type: 'Notice',
    date: '21',
    month: 'Jul',
    description: 'In light of requests from citizen forums, the general body of Godhani Nagar Panchayat has extended the rebate period and deadline for property tax with zero interest penalty till 31st October 2026. Citizens are urged to pay online.'
  },
  {
    id: 'news-2',
    title: 'Tender for Paved Road Construction in Ward No 5 & 6',
    type: 'Tender',
    date: '15',
    month: 'Jul',
    description: 'Sealed item-rate online tenders are invited from registered contractors for the concrete road leveling and storm water drain paving work in Ward 5 and Ward 6. Estimated budget: ₹25.4 Lakhs. Tender reference: GNP/TEN-RD/2026-04.'
  },
  {
    id: 'news-3',
    title: 'Free Health Checkup and Ayushman Card Registration Drive',
    type: 'Announcement',
    date: '10',
    month: 'Jul',
    description: 'A special two-day health and card generation camp is organized at the Godhani Community Hall on 25th and 26th July 2026. Free cardiac, diabetic, and general wellness checkups will be provided alongside spot-issuing of Ayushman Health Cards.'
  },
  {
    id: 'news-4',
    title: 'Notice regarding Water Supply timing alteration during repairs',
    type: 'Notice',
    date: '05',
    month: 'Jul',
    description: 'Due to trunk-main repair works near Nagpur Rural Water Treatment Plant, water supply in Wards 1 to 8 will be alternate-day only from 8th to 12th July. Timing will be 6:00 AM - 8:00 AM. Thank you for your cooperation.'
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Property Tax Self-Assessment & Registration Form',
    category: 'Forms',
    fileSize: '1.2 MB',
    fileType: 'PDF'
  },
  {
    id: 'dl-2',
    title: 'Birth Certificate Correction and Issuance Form',
    category: 'Forms',
    fileSize: '650 KB',
    fileType: 'PDF'
  },
  {
    id: 'dl-3',
    title: 'Maharashtra Nagar Panchayat and Municipalities Act 1965',
    category: 'Acts',
    fileSize: '4.5 MB',
    fileType: 'PDF'
  },
  {
    id: 'dl-4',
    title: 'Annual Budget Statement & Project Allotment Report 2025-2026',
    category: 'Budgets',
    fileSize: '2.1 MB',
    fileType: 'PDF'
  },
  {
    id: 'dl-5',
    title: 'Quarterly Drinking Water Quality Audit Lab Report (Q1)',
    category: 'Reports',
    fileSize: '1.4 MB',
    fileType: 'PDF'
  }
];

export const MAP_MARKERS: MapMarker[] = [
  {
    id: 'm-1',
    name: 'Nagar Panchayat Office',
    category: 'Office',
    lat: 35,
    lng: 40,
    description: 'Main Administrative Building, Citizen Services Windows, and Council Hall.'
  },
  {
    id: 'm-2',
    name: 'Zilla Parishad Primary School',
    category: 'School',
    lat: 25,
    lng: 20,
    description: 'Primary school with smart digital classrooms and children garden.'
  },
  {
    id: 'm-3',
    name: 'Primary Health Center (PHC)',
    category: 'Hospital',
    lat: 55,
    lng: 60,
    description: '24/7 Outpatient assistance, maternity care, and diagnostic facilities.'
  },
  {
    id: 'm-4',
    name: 'Godhani Railway Station',
    category: 'Railway',
    lat: 15,
    lng: 75,
    description: 'GGDHANI Railway junction providing local sub-urban connections.'
  },
  {
    id: 'm-5',
    name: 'Bank of India - Godhani Branch',
    category: 'Bank',
    lat: 42,
    lng: 30,
    description: 'Full-service public sector bank branch and 24-hour ATM counter.'
  },
  {
    id: 'm-6',
    name: 'Hanuman Mandir & Temple Ground',
    category: 'Temple',
    lat: 70,
    lng: 45,
    description: 'Historic cultural sanctuary and community playground site.'
  },
  {
    id: 'm-7',
    name: 'Main Bus Stop',
    category: 'BusStop',
    lat: 48,
    lng: 50,
    description: 'Direct transit connecting to Nagpur Central Stand and Rural areas.'
  },
  {
    id: 'm-8',
    name: 'Ambedkar Park & Joggers Track',
    category: 'Park',
    lat: 30,
    lng: 65,
    description: 'Lush green public park with concrete walking trail and open-air gym.'
  }
];

export const MARATHI_STRINGS: LanguageStrings = {
  home: 'मुख्य पृष्ठ',
  about: 'गोधनी बद्दल',
  administration: 'प्रशासन',
  citizenServices: 'नागरी सेवा',
  development: 'विकास कामे',
  schemes: 'शासकीय योजना',
  gallery: 'छायाचित्र दालन',
  downloads: 'डाउनलोड्स',
  contact: 'संपर्क',
  tagline: 'स्वच्छ, हरित आणि डिजिटल भविष्यासाठी एकत्र',
  welcome: 'गोधनी नगर पंचायत मध्ये आपले स्वागत आहे',
  exploreServices: 'सेवा शोधा',
  knowMore: 'अधिक माहिती',
  statistics: 'महत्वाची आकडेवारी',
  population: 'एकूण लोकसंख्या',
  wards: 'वॉर्ड संख्या',
  families: 'एकूण कुटुंबे',
  literacy: 'साक्षरता प्रमाण',
  male: 'पुरुष',
  female: 'महिला'
};

export const HINDI_STRINGS: LanguageStrings = {
  home: 'मुख्य पृष्ठ',
  about: 'गोधनी के बारे में',
  administration: 'प्रशासन',
  citizenServices: 'नागरिक सेवाएं',
  development: 'विकास कार्य',
  schemes: 'सरकारी योजनाएं',
  gallery: 'गैलरी',
  downloads: 'डाउनलोड',
  contact: 'संपर्क',
  tagline: 'स्वच्छ, हरित और डिजिटल भविष्य के लिए एकजुट',
  welcome: 'गोधनी नगर पंचायत में आपका स्वागत है',
  exploreServices: 'सेवाएं देखें',
  knowMore: 'अधिक जानकारी',
  statistics: 'महत्वपूर्ण आँकड़े',
  population: 'कुल जनसंख्या',
  wards: 'वार्ड संख्या',
  families: 'कुल परिवार',
  literacy: 'साक्षरता दर',
  male: 'पुरुष',
  female: 'महिला'
};

export const ENGLISH_STRINGS: LanguageStrings = {
  home: 'Home',
  about: 'About',
  administration: 'Administration',
  citizenServices: 'Citizen Services',
  development: 'Development',
  schemes: 'Schemes',
  gallery: 'Gallery',
  downloads: 'Downloads',
  contact: 'Contact',
  tagline: 'Together for a Clean, Green & Sanitised Godhani',
  welcome: 'Welcome to Godhani Nagar Panchayat',
  exploreServices: 'Explore Services',
  knowMore: 'Know More',
  statistics: 'Key Statistics',
  population: 'Population',
  wards: 'Wards',
  families: 'Families',
  literacy: 'Literacy Rate',
  male: 'Male',
  female: 'Female'
};
