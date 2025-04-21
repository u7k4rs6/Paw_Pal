import { Breed, Pet, Post, QuizQuestion, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  bio: 'Dog lover and proud pet parent to a Golden Retriever named Max',
  location: 'San Francisco, CA',
};

export const mockBreeds: Breed[] = [
  {
    id: '1',
    name: 'Golden Retriever',
    description: 'The Golden Retriever is a medium-large gun dog that was bred to retrieve shot waterfowl, such as ducks and upland game birds, during hunting and shooting parties. The name "retriever" refers to the breed\'s ability to retrieve shot game undamaged due to their soft mouth.',
    temperament: ['Intelligent', 'Friendly', 'Devoted', 'Confident', 'Reliable', 'Trustworthy'],
    lifeSpan: '10-12 years',
    weight: {
      imperial: '55-75 lbs',
      metric: '25-34 kg'
    },
    height: {
      imperial: '21.5-24 inches',
      metric: '55-61 cm'
    },
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: {
      adaptability: 5,
      affectionLevel: 5,
      childFriendly: 5,
      dogFriendly: 5,
      energyLevel: 5,
      grooming: 3,
      healthIssues: 2,
      intelligence: 4,
      sheddingLevel: 4,
      socialNeeds: 5,
      strangerFriendly: 5,
      trainability: 5
    }
  },
  {
    id: '2',
    name: 'German Shepherd',
    description: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. According to the FCI, the breed\'s English language name is German Shepherd Dog.',
    temperament: ['Confident', 'Courageous', 'Smart', 'Loyal', 'Obedient', 'Alert'],
    lifeSpan: '9-13 years',
    weight: {
      imperial: '50-90 lbs',
      metric: '22-40 kg'
    },
    height: {
      imperial: '22-26 inches',
      metric: '55-65 cm'
    },
    imageUrl: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: {
      adaptability: 5,
      affectionLevel: 5,
      childFriendly: 5,
      dogFriendly: 3,
      energyLevel: 5,
      grooming: 4,
      healthIssues: 4,
      intelligence: 5,
      sheddingLevel: 5,
      socialNeeds: 4,
      strangerFriendly: 2,
      trainability: 5
    }
  },
  {
    id: '3',
    name: 'Labrador Retriever',
    description: 'The Labrador Retriever, often abbreviated to Labrador or Lab, is a medium-large gun dog. It is the most popular dog breed in many countries across the world.',
    temperament: ['Outgoing', 'Even Tempered', 'Gentle', 'Intelligent', 'Agile', 'Trusting'],
    lifeSpan: '10-12 years',
    weight: {
      imperial: '55-80 lbs',
      metric: '25-36 kg'
    },
    height: {
      imperial: '21.5-24.5 inches',
      metric: '55-62 cm'
    },
    imageUrl: 'https://images.pexels.com/photos/2252311/pexels-photo-2252311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: {
      adaptability: 5,
      affectionLevel: 5,
      childFriendly: 5,
      dogFriendly: 5,
      energyLevel: 5,
      grooming: 2,
      healthIssues: 3,
      intelligence: 5,
      sheddingLevel: 4,
      socialNeeds: 5,
      strangerFriendly: 5,
      trainability: 5
    }
  },
  {
    id: '4',
    name: 'Beagle',
    description: 'The Beagle is a breed of small hound that is similar in appearance to the much larger foxhound. The beagle is a scent hound, developed primarily for hunting hare.',
    temperament: ['Friendly', 'Curious', 'Merry', 'Even Tempered', 'Determined', 'Intelligent'],
    lifeSpan: '12-15 years',
    weight: {
      imperial: '20-30 lbs',
      metric: '9-14 kg'
    },
    height: {
      imperial: '13-15 inches',
      metric: '33-38 cm'
    },
    imageUrl: 'https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: {
      adaptability: 3,
      affectionLevel: 5,
      childFriendly: 5,
      dogFriendly: 5,
      energyLevel: 4,
      grooming: 2,
      healthIssues: 3,
      intelligence: 4,
      sheddingLevel: 3,
      socialNeeds: 5,
      strangerFriendly: 4,
      trainability: 3
    }
  },
  {
    id: '5',
    name: 'French Bulldog',
    description: 'The French Bulldog is a breed of domestic dog, bred to be companion dogs. The breed is the result of a cross between Toy Bulldogs imported from England, and local ratters in Paris, France, in the 1800s.',
    temperament: ['Playful', 'Affectionate', 'Bright', 'Sociable', 'Lively', 'Patient'],
    lifeSpan: '10-12 years',
    weight: {
      imperial: '16-28 lbs',
      metric: '7-13 kg'
    },
    height: {
      imperial: '11-12 inches',
      metric: '28-30 cm'
    },
    imageUrl: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: {
      adaptability: 5,
      affectionLevel: 5,
      childFriendly: 4,
      dogFriendly: 4,
      energyLevel: 3,
      grooming: 2,
      healthIssues: 5,
      intelligence: 3,
      sheddingLevel: 3,
      socialNeeds: 5,
      strangerFriendly: 4,
      trainability: 3
    }
  }
];

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'large',
    description: 'Buddy is a friendly and active Golden Retriever who loves to play fetch and go for long walks. He gets along well with children and other pets. He\'s well-trained and knows several commands.',
    imageUrl: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Friendly', 'Active', 'Loyal', 'Well-trained', 'Good with kids'],
    location: 'San Francisco, CA',
    adoptionStatus: 'available'
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'German Shepherd',
    age: 2,
    gender: 'female',
    size: 'large',
    description: 'Luna is an intelligent and protective German Shepherd. She\'s been trained for basic obedience and is looking for an active family that can provide plenty of exercise and mental stimulation.',
    imageUrl: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Intelligent', 'Protective', 'Loyal', 'Active', 'Alert'],
    location: 'Los Angeles, CA',
    adoptionStatus: 'available'
  },
  {
    id: '3',
    name: 'Max',
    breed: 'Labrador Retriever',
    age: 1,
    gender: 'male',
    size: 'large',
    description: 'Max is a playful and energetic Labrador Retriever puppy. He\'s still learning basic commands but is very eager to please. He would do best in a home with a yard where he can run and play.',
    imageUrl: 'https://images.pexels.com/photos/2252311/pexels-photo-2252311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Playful', 'Energetic', 'Friendly', 'Curious', 'Affectionate'],
    location: 'Seattle, WA',
    adoptionStatus: 'pending'
  },
  {
    id: '4',
    name: 'Daisy',
    breed: 'Beagle',
    age: 4,
    gender: 'female',
    size: 'medium',
    description: 'Daisy is a sweet and curious Beagle who loves to explore with her nose. She\'s great with children and other dogs. She does have a strong prey drive, so homes with small pets like rabbits might not be ideal.',
    imageUrl: 'https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Sweet', 'Curious', 'Good with kids', 'Social', 'Active'],
    location: 'Chicago, IL',
    adoptionStatus: 'available'
  },
  {
    id: '5',
    name: 'Oliver',
    breed: 'French Bulldog',
    age: 5,
    gender: 'male',
    size: 'small',
    description: 'Oliver is a laid-back French Bulldog who loves to cuddle on the couch. He\'s well-behaved and doesn\'t require a lot of exercise, making him perfect for apartment living. He gets along with children but prefers a calm environment.',
    imageUrl: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Calm', 'Affectionate', 'Low energy', 'Well-behaved', 'Loyal'],
    location: 'New York, NY',
    adoptionStatus: 'available'
  },
  {
    id: '6',
    name: 'Bella',
    breed: 'Siberian Husky',
    age: 3,
    gender: 'female',
    size: 'large',
    description: 'Bella is a beautiful and energetic Siberian Husky. She needs an experienced owner who understands the breed and can provide plenty of exercise and stimulation. She loves running and would make a great jogging companion.',
    imageUrl: 'https://images.pexels.com/photos/3715583/pexels-photo-3715583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    characteristics: ['Energetic', 'Independent', 'Playful', 'Talkative', 'Strong-willed'],
    location: 'Denver, CO',
    adoptionStatus: 'available'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Emma Wilson',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Just discovered that puzzle toys keep my Border Collie busy for hours! What are your favorite mental stimulation toys for high-energy dogs?',
    category: 'tip',
    likes: 24,
    comments: [
      {
        id: '101',
        userId: '3',
        userName: 'John Smith',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'We love the Kong Wobbler! It keeps our Australian Shepherd entertained for ages.',
        createdAt: '2025-03-15T10:30:00Z'
      },
      {
        id: '102',
        userId: '4',
        userName: 'Sophia Chen',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Have you tried snuffle mats? My dog loves searching for treats in them!',
        createdAt: '2025-03-15T11:15:00Z'
      }
    ],
    createdAt: '2025-03-15T09:00:00Z',
    tags: ['dogtraining', 'dogtoys', 'bordercollie']
  },
  {
    id: '2',
    userId: '5',
    userName: 'Michael Brown',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Looking for advice on introducing my new kitten to my 3-year-old cat. Any tips for a smooth transition?',
    category: 'question',
    likes: 18,
    comments: [
      {
        id: '103',
        userId: '6',
        userName: 'Lisa Johnson',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Take it slow! Keep them separated at first and gradually increase supervised interaction time. Feliway diffusers can help too.',
        createdAt: '2025-03-16T14:10:00Z'
      }
    ],
    createdAt: '2025-03-16T13:45:00Z',
    tags: ['cats', 'kittens', 'catbehavior']
  },
  {
    id: '3',
    userId: '7',
    userName: 'David Lee',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'My dog has been absolutely loving this homemade frozen treat recipe: plain yogurt, peanut butter, and mashed banana! Super easy and keeps them cool in summer.',
    imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'tip',
    likes: 42,
    comments: [
      {
        id: '104',
        userId: '8',
        userName: 'Jessica Taylor',
        userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Trying this today! Do you freeze them in ice cube trays?',
        createdAt: '2025-03-17T09:20:00Z'
      },
      {
        id: '105',
        userId: '7',
        userName: 'David Lee',
        userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Yes, ice cube trays work perfectly! You can also use silicone molds for fun shapes.',
        createdAt: '2025-03-17T09:35:00Z'
      }
    ],
    createdAt: '2025-03-17T08:30:00Z',
    tags: ['dogtreats', 'homemade', 'dogrecipes']
  },
  {
    id: '4',
    userId: '1',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Max enjoying his favorite hiking trail! We try to get out at least twice a week for exercise and mental stimulation. What are your favorite outdoor activities with your pets?',
    imageUrl: 'https://images.pexels.com/photos/1144410/pexels-photo-1144410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'photo',
    likes: 56,
    comments: [
      {
        id: '106',
        userId: '9',
        userName: 'Robert Wilson',
        userAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
        content: 'Beautiful dog! We love beach walks with our Golden too.',
        createdAt: '2025-03-18T16:15:00Z'
      }
    ],
    createdAt: '2025-03-18T15:00:00Z',
    tags: ['dogsofpawpal', 'hiking', 'goldenretriever', 'outdoors']
  }
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How would you describe your lifestyle?',
    options: [
      { id: '1a', text: 'Very active, always on the go', value: 'active' },
      { id: '1b', text: 'Balanced between active and relaxed', value: 'balanced' },
      { id: '1c', text: 'Mostly relaxed, homebody', value: 'relaxed' }
    ]
  },
  {
    id: 2,
    question: 'What type of living space do you have?',
    options: [
      { id: '2a', text: 'House with a large yard', value: 'large' },
      { id: '2b', text: 'House with a small yard', value: 'medium' },
      { id: '2c', text: 'Apartment or condo', value: 'small' }
    ]
  },
  {
    id: 3,
    question: 'How experienced are you with pet ownership?',
    options: [
      { id: '3a', text: 'Very experienced, had multiple pets', value: 'experienced' },
      { id: '3b', text: 'Some experience with pets', value: 'moderate' },
      { id: '3c', text: 'First-time pet owner', value: 'novice' }
    ]
  },
  {
    id: 4,
    question: 'How much time can you dedicate to a pet daily?',
    options: [
      { id: '4a', text: '4+ hours', value: 'high' },
      { id: '4b', text: '2-4 hours', value: 'medium' },
      { id: '4c', text: 'Less than 2 hours', value: 'low' }
    ]
  },
  {
    id: 5,
    question: 'What activity level would you prefer in a pet?',
    options: [
      { id: '5a', text: 'High energy, needs lots of exercise', value: 'high' },
      { id: '5b', text: 'Moderate energy, enjoys play but also relaxing', value: 'medium' },
      { id: '5c', text: 'Low energy, mostly calm and relaxed', value: 'low' }
    ]
  },
  {
    id: 6,
    question: 'Do you have a preference for pet size?',
    options: [
      { id: '6a', text: 'Large', value: 'large' },
      { id: '6b', text: 'Medium', value: 'medium' },
      { id: '6c', text: 'Small', value: 'small' },
      { id: '6d', text: 'No preference', value: 'any' }
    ]
  },
  {
    id: 7,
    question: 'Do you have a preference for pet age?',
    options: [
      { id: '7a', text: 'Puppy/Kitten', value: 'young' },
      { id: '7b', text: 'Adult', value: 'adult' },
      { id: '7c', text: 'Senior', value: 'senior' },
      { id: '7d', text: 'No preference', value: 'any' }
    ]
  }
];