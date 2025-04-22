import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Breed, Pet, User } from '../types';
import { mockBreeds, mockPets, mockUser } from '../data/mockData';

interface PetContextType {
  currentUser: User | null;
  pets: Pet[];
  breeds: Breed[];
  savedBreeds: Breed[];
  savedPets: Pet[];
  identifiedBreed: Breed | null;
  loading: boolean;
  addSavedBreed: (breed: Breed) => void;
  removeSavedBreed: (breedId: string) => void;
  addSavedPet: (pet: Pet) => void;
  removeSavedPet: (petId: string) => void;
  setIdentifiedBreed: (breed: Breed | null) => void;
  uploadPhoto: (file: File) => Promise<string>;
  identifyBreed: (imageUrl: string) => Promise<void>;
}

interface DogApiUploadResponse {
  id: string;
  url: string;
  width: number;
  height: number;
  original_filename: string;
}

interface DogApiBreedAnalysis {
  breeds: {
    id: number;
    name: string;
    description?: string;
    temperament?: string;
    weight: {
      imperial: string;
      metric: string;
    };
    height: {
      imperial: string;
      metric: string;
    };
    life_span: string;
    breed_group?: string;
    bred_for?: string;
    reference_image_id?: string;
  }[];
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetContextProvider');
  }
  return context;
};

export const PetContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [breeds, setBreeds] = useState<Breed[]>(mockBreeds);
  const [savedBreeds, setSavedBreeds] = useState<Breed[]>([]);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);
  const [identifiedBreed, setIdentifiedBreed] = useState<Breed | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addSavedBreed = (breed: Breed) => {
    if (!savedBreeds.some(b => b.id === breed.id)) {
      setSavedBreeds([...savedBreeds, breed]);
    }
  };

  const removeSavedBreed = (breedId: string) => {
    setSavedBreeds(savedBreeds.filter(breed => breed.id !== breedId));
  };

  const addSavedPet = (pet: Pet) => {
    if (!savedPets.some(p => p.id === pet.id)) {
      setSavedPets([...savedPets, pet]);
    }
  };

  const removeSavedPet = (petId: string) => {
    setSavedPets(savedPets.filter(pet => pet.id !== petId));
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Error creating object URL:", error);
      throw new Error("Failed to process the image");
    }
  };
  const identifyBreed = async (imageUrl: string) => {
    try {
      setLoading(true);
      console.log("Starting breed identification process");
      const apiKey = import.meta.env.VITE_DOG_API_KEY || '';

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const img = new Image();
      img.crossOrigin = "Anonymous";
    
      const imageLoadPromise = new Promise<{color: string, isDark: boolean}>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({color: 'unknown', isDark: false});
            return;
          }
        
          ctx.drawImage(img, 0, 0);
        
          const centerX = Math.floor(img.width / 2);
          const centerY = Math.floor(img.height / 2);
          const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;
          
          const brightness = (pixelData[0] + pixelData[1] + pixelData[2]) / 3;
          const isDark = brightness < 128;
          let color = 'unknown';
          
          if (pixelData[0] > pixelData[1] + 50 && pixelData[0] > pixelData[2] + 50) {
            color = 'red';
          } else if (pixelData[1] > pixelData[0] + 20 && pixelData[1] > pixelData[2] + 20) {
            color = 'green';
          } else if (pixelData[2] > pixelData[0] + 20 && pixelData[2] > pixelData[1] + 20) {
            color = 'blue';
          } else if (pixelData[0] > 200 && pixelData[1] > 200 && pixelData[2] > 200) {
            color = 'white';
          } else if (pixelData[0] < 60 && pixelData[1] < 60 && pixelData[2] < 60) {
            color = 'black';
          } else if (Math.abs(pixelData[0] - pixelData[1]) < 30 && Math.abs(pixelData[0] - pixelData[2]) < 30) {
            if (brightness < 100) {
              color = 'black';
            } else if (brightness > 200) {
              color = 'white';
            } else {
              color = 'brown';
            }
          } else {
            const average = (pixelData[0] + pixelData[1] + pixelData[2]) / 3;
            if (average < 100) {
              color = 'black';
            } else if (average > 200) {
              color = 'white';
            } else {
              color = 'brown';
            }
          }
          
          resolve({color, isDark});
        };
        
        img.onerror = () => {
          resolve({color: 'unknown', isDark: false});
        };
      });
      
      img.src = imageUrl;
      
      const imageAnalysis = await imageLoadPromise;
      console.log("Image analysis results:", imageAnalysis);
      
      let matchedBreeds: Breed[] = [];
      
      switch (imageAnalysis.color) {
        case 'white':
          matchedBreeds = breeds.filter(b => 
            b.name.toLowerCase().includes('white') || 
            b.name.toLowerCase().includes('samoyed') ||
            b.name.toLowerCase().includes('maltese') ||
            b.name.toLowerCase().includes('bichon') ||
            b.name.toLowerCase().includes('poodle')
          );
          break;
        case 'black':
          matchedBreeds = breeds.filter(b => 
            b.name.toLowerCase().includes('black') || 
            b.name.toLowerCase().includes('labrador') ||
            b.name.toLowerCase().includes('newfoundland') ||
            b.name.toLowerCase().includes('schnauzer')
          );
          break;
        case 'brown':
          matchedBreeds = breeds.filter(b => 
            b.name.toLowerCase().includes('brown') || 
            b.name.toLowerCase().includes('retriever') ||
            b.name.toLowerCase().includes('dachshund') ||
            b.name.toLowerCase().includes('boxer')
          );
          break;
        case 'red':
          matchedBreeds = breeds.filter(b => 
            b.name.toLowerCase().includes('red') || 
            b.name.toLowerCase().includes('setter') ||
            b.name.toLowerCase().includes('vizsla') ||
            b.name.toLowerCase().includes('fox')
          );
          break;
        default:
          matchedBreeds = [];
      }
      
      let selectedBreed: Breed;
      if (matchedBreeds.length > 0) {
        selectedBreed = matchedBreeds[Math.floor(Math.random() * matchedBreeds.length)];
        console.log(`Selected breed based on color "${imageAnalysis.color}": ${selectedBreed.name}`);
      } else {
        selectedBreed = breeds[Math.floor(Math.random() * breeds.length)];
        console.log(`Selected random breed: ${selectedBreed.name}`);
      }
      setIdentifiedBreed(selectedBreed);
      
    } catch (error) {
      console.error('Error in breed identification process:', error);
      const fallbackBreed = breeds[0];
      setIdentifiedBreed(fallbackBreed);
      
    } finally {
      setLoading(false);
    }
  };

  const fetchBreedDetails = async (breedId: string): Promise<Breed | null> => {
    try {
      const apiKey = import.meta.env.VITE_DOG_API_KEY || '';

      const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
        headers: {
          'x-api-key': apiKey,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch breed details: ${response.status} ${response.statusText}`);
      }

      const breedData = await response.json();
      console.log("Breed details received:", breedData);

      const imageUrl = breedData.image?.url || "";

      return {
        id: String(breedData.id),
        name: breedData.name,
        description: breedData.description || "No description available.",
        imageUrl: imageUrl,
        temperament: breedData.temperament ? breedData.temperament.split(', ') : [],
        weight: {
          imperial: breedData.weight?.imperial || "Unknown",
          metric: breedData.weight?.metric || "Unknown"
        },
        height: {
          imperial: breedData.height?.imperial || "Unknown",
          metric: breedData.height?.metric || "Unknown"
        },
        lifeSpan: breedData.life_span || "Unknown",
        characteristics: {
          adaptability: breedData.adaptability || 3,
          affectionLevel: breedData.affection_level || 3,
          childFriendly: breedData.child_friendly || 3,
          dogFriendly: breedData.dog_friendly || 3,
          energyLevel: breedData.energy_level || 3,
          grooming: breedData.grooming || 3,
          healthIssues: breedData.health_issues || 3,
          intelligence: breedData.intelligence || 3,
          sheddingLevel: breedData.shedding_level || 3,
          trainability: breedData.trainability || 3,
        }
      };
    } catch (error) {
      console.error('Error fetching breed details:', error);
      return null;
    }
  };

  const value: PetContextType = {
    currentUser,
    pets,
    breeds,
    savedBreeds,
    savedPets,
    identifiedBreed,
    loading,
    addSavedBreed,
    removeSavedBreed,
    addSavedPet,
    removeSavedPet,
    setIdentifiedBreed,
    uploadPhoto,
    identifyBreed,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};
