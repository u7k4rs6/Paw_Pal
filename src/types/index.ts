export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  description: string;
  imageUrl: string;
  characteristics: string[];
  location: string;
  adoptionStatus: 'available' | 'pending' | 'adopted';
}

export interface Breed {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  temperament: string[];
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  lifeSpan: string;
  characteristics: {
    adaptability: number;
    affectionLevel: number;
    childFriendly: number;
    dogFriendly: number;
    energyLevel: number;
    grooming: number;
    healthIssues: number;
    intelligence: number;
    sheddingLevel: number;
    trainability: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  category: 'tip' | 'question' | 'discussion' | 'photo';
  likes: number;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}