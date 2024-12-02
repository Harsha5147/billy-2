export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: Comment[];
  tags: string[];
  likes: number;
  isAnonymous: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
  isAnonymous: boolean;
}

export interface Report {
  id: string;
  userId: string;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    state: string;
    district: string;
    city: string;
  };
  bullyingType: string;
  perpetratorInfo: {
    platform: string;
    username?: string;
    profileUrl?: string;
    realName?: string;
    approximateAge?: string;
    additionalDetails?: string;
  };
  evidenceLinks: string[];
  timestamp: Date;
  status: 'pending' | 'reported' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  isAnonymous: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  type?: 'input' | 'options';
  options?: string[];
}

export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  category: 'prevention' | 'response' | 'awareness' | 'support';
  tags: string[];
}