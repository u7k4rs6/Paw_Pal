import { useState } from 'react';
import { 
  Heart, 
  HeartOff, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Search,
  Phone,
  Mail,
  MapPin,
  User,
  X
} from 'lucide-react';
import { mockQuizQuestions } from '../data/mockData';
import { usePetContext } from '../context/PetContext';
import { Pet, QuizQuestion, QuizResult } from '../types';

const AdoptionMatcherPage = () => {
  const { 
    pets, 
    savedPets, 
    quizResults, 
    addSavedPet, 
    removeSavedPet, 
    setQuizResults 
  } = usePetContext();
  
  const [activeTab, setActiveTab] = useState<'quiz' | 'results' | 'browse' | 'saved'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showPetModal, setShowPetModal] = useState(false);
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.characteristics.some(trait => trait.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < mockQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Process quiz results
      processQuizResults();
      setActiveTab('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const processQuizResults = () => {
    // Simple processing of answers to generate quiz results
    const results: QuizResult = {
      lifestyle: answers[1] || 'balanced',
      space: answers[2] || 'medium',
      experience: answers[3] || 'moderate',
      timeCommitment: answers[4] || 'medium',
      activityLevel: answers[5] || 'medium',
      preferences: {
        size: answers[6] as 'small' | 'medium' | 'large',
        age: answers[7] as 'young' | 'adult' | 'senior'
      }
    };
    
    setQuizResults(results);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setActiveTab('quiz');
  };

  const getMatchPercentage = (pet: Pet): number => {
    if (!quizResults) return 50; // Default match if no quiz results
    
    let score = 0;
    const totalPoints = 5; // Total number of matching criteria
    
    // Match activity level
    if (
      (quizResults.activityLevel === 'high' && pet.characteristics.includes('Active')) ||
      (quizResults.activityLevel === 'medium' && pet.characteristics.includes('Playful')) ||
      (quizResults.activityLevel === 'low' && pet.characteristics.includes('Calm'))
    ) {
      score += 1;
    }
    
    // Match size preference
    if (
      (quizResults.preferences.size === pet.size) ||
      (!quizResults.preferences.size || quizResults.preferences.size === 'any')
    ) {
      score += 1;
    }
    
    // Match time commitment
    if (
      (quizResults.timeCommitment === 'high' && pet.characteristics.includes('High energy')) ||
      (quizResults.timeCommitment === 'medium' && !pet.characteristics.includes('High energy') && !pet.characteristics.includes('Low energy')) ||
      (quizResults.timeCommitment === 'low' && pet.characteristics.includes('Low energy'))
    ) {
      score += 1;
    }
    
    // Match living space
    if (
      (quizResults.space === 'large' && pet.size === 'large') ||
      (quizResults.space === 'medium' && (pet.size === 'medium' || pet.size === 'small')) ||
      (quizResults.space === 'small' && pet.size === 'small')
    ) {
      score += 1;
    }
    
    // Match experience level
    if (
      (quizResults.experience === 'experienced' && pet.characteristics.includes('Needs experienced owner')) ||
      (quizResults.experience === 'moderate') ||
      (quizResults.experience === 'novice' && pet.characteristics.includes('Good with kids'))
    ) {
      score += 1;
    }
    
    return Math.round((score / totalPoints) * 100);
  };

  const sortedPets = [...pets].sort((a, b) => getMatchPercentage(b) - getMatchPercentage(a));

  const isSaved = (pet: Pet) => {
    return savedPets.some(savedPet => savedPet.id === pet.id);
  };

  const toggleSave = (pet: Pet, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isSaved(pet)) {
      removeSavedPet(pet.id);
    } else {
      addSavedPet(pet);
    }
  };

  const openPetModal = (pet: Pet) => {
    setSelectedPet(pet);
    setShowPetModal(true);
  };

  const closePetModal = () => {
    setShowPetModal(false);
    setSelectedPet(null);
    setShowContactForm(false);
    setFormSubmitted(false);
  };

  const openContactForm = () => {
    setShowContactForm(true);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(contactForm.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number should be 10 digits';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would submit the form data to a server
      setFormSubmitted(true);
    }
  };

  const renderQuestion = (question: QuizQuestion) => (
    <div className="py-6">
      <h3 className="text-xl font-bold mb-4">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map(option => (
          <label 
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              answers[question.id] === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={answers[question.id] === option.value}
              onChange={() => handleQuizAnswer(question.id, option.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              answers[question.id] === option.value
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300'
            }`}>
              {answers[question.id] === option.value && (
                <CheckCircle size={14} className="text-white" />
              )}
            </div>
            <span>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Pet Adoption Matchmaker</h1>
            <p className="text-xl mb-8">
              Find your perfect pet companion based on your lifestyle and preferences.
            </p>
            
            <div className="bg-white rounded-lg p-1 inline-flex shadow-md">
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'quiz'
                    ? 'bg-secondary-100 text-secondary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('quiz')}
              >
                <CheckCircle size={18} className="inline mr-2" />
                Take the Quiz
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'results'
                    ? 'bg-secondary-100 text-secondary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('results')}
                disabled={!quizResults}
              >
                <Search size={18} className="inline mr-2" />
                Matches
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'browse'
                    ? 'bg-secondary-100 text-secondary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('browse')}
              >
                <Search size={18} className="inline mr-2" />
                Browse All
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'bg-secondary-100 text-secondary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('saved')}
              >
                <Heart size={18} className="inline mr-2" />
                Saved Pets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Find Your Perfect Pet Match</h2>
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                  <div 
                    className="bg-secondary-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / mockQuizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                
                {renderQuestion(mockQuizQuestions[currentQuestionIndex])}
                
                <div className="flex justify-between mt-8">
                  {currentQuestionIndex > 0 ? (
                    <button
                      className="btn-outline flex items-center"
                      onClick={prevQuestion}
                    >
                      <ArrowLeft size={18} className="mr-2" />
                      Previous
                    </button>
                  ) : (
                    null
                  )}
                  
                  <button
                    className="btn-secondary flex items-center"
                    onClick={nextQuestion}
                    disabled={!answers[mockQuizQuestions[currentQuestionIndex].id]}
                  >
                    {currentQuestionIndex < mockQuizQuestions.length - 1 ? (
                      <>
                        Next
                        <ArrowRight size={18} className="ml-2" />
                      </>
                    ) : (
                      'See Your Matches'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="max-w-6xl mx-auto">
              {quizResults ? (
                <>
                  <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Your Perfect Pet Matches</h2>
                        <p className="text-gray-600">
                          Based on your lifestyle and preferences, here are the pets that would make a great match for you!
                        </p>
                      </div>
                      <button
                        onClick={resetQuiz}
                        className="btn-outline mt-4 md:mt-0 flex items-center"
                      >
                        <ArrowLeft size={18} className="mr-2" />
                        Retake Quiz
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Lifestyle</h3>
                        <p className="font-medium capitalize">{quizResults.lifestyle}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Living Space</h3>
                        <p className="font-medium capitalize">{quizResults.space}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Experience Level</h3>
                        <p className="font-medium capitalize">{quizResults.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Time Commitment</h3>
                        <p className="font-medium capitalize">{quizResults.timeCommitment}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Activity Level</h3>
                        <p className="font-medium capitalize">{quizResults.activityLevel}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Preferences</h3>
                        <p className="font-medium">
                          {quizResults.preferences.size && quizResults.preferences.size !== 'any' 
                            ? `${quizResults.preferences.size} size` 
                            : ''}
                          {quizResults.preferences.size && quizResults.preferences.age && quizResults.preferences.size !== 'any' && quizResults.preferences.age !== 'any' ? ', ' : ''}
                          {quizResults.preferences.age && quizResults.preferences.age !== 'any' 
                            ? `${quizResults.preferences.age} age` 
                            : ''}
                          {(!quizResults.preferences.size || quizResults.preferences.size === 'any') && 
                           (!quizResults.preferences.age || quizResults.preferences.age === 'any') && 
                            'No specific preferences'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedPets.map(pet => {
                      const matchPercentage = getMatchPercentage(pet);
                      return (
                        <div 
                          key={pet.id} 
                          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => openPetModal(pet)}
                        >
                          <div className="relative h-64">
                            <img
                              src={pet.imageUrl}
                              alt={pet.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex space-x-2">
                              <span className={`badge ${
                                matchPercentage >= 75 
                                  ? 'bg-green-100 text-green-800' 
                                  : matchPercentage >= 50 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-gray-100 text-gray-800'
                              } px-3 py-1 shadow-sm`}>
                                {matchPercentage}% Match
                              </span>
                              <span className="badge bg-white text-secondary-700 px-3 py-1 shadow-sm">
                                {pet.adoptionStatus === 'available' ? 'Available' : pet.adoptionStatus === 'pending' ? 'Pending' : 'Adopted'}
                              </span>
                            </div>
                            <button
                              onClick={(e) => toggleSave(pet, e)}
                              className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                            >
                              {isSaved(pet) ? (
                                <Heart size={18} className="text-red-500" fill="currentColor" />
                              ) : (
                                <Heart size={18} className="text-gray-500" />
                              )}
                            </button>
                          </div>
                          <div className="p-5">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-bold">{pet.name}</h3>
                              <span className="text-sm font-medium text-gray-500">{pet.age} yr old</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-3">
                              <span className="mr-4">{pet.breed}</span>
                              <span className="mr-4">{pet.gender}</span>
                              <span>{pet.size}</span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {pet.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {pet.characteristics.slice(0, 3).map((trait, index) => (
                                <span key={index} className="badge-secondary text-xs">
                                  {trait}
                                </span>
                              ))}
                              {pet.characteristics.length > 3 && (
                                <span className="badge bg-gray-100 text-gray-700 text-xs">
                                  +{pet.characteristics.length - 3} more
                                </span>
                              )}
                            </div>
                            <button className="btn-secondary w-full">
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md max-w-md mx-auto">
                  <CheckCircle size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No results yet</h3>
                  <p className="text-gray-500 mb-6">
                    Take the pet matching quiz to see your recommended pets
                  </p>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="btn-secondary"
                  >
                    Take the Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Browse Tab */}
          {activeTab === 'browse' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pets by name, breed, or characteristics..."
                    className="input pl-12 pr-4 py-3 w-full max-w-3xl mx-auto block shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              {searchQuery && filteredPets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No pets found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPets.map(pet => (
                    <div 
                      key={pet.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => openPetModal(pet)}
                    >
                      <div className="relative h-64">
                        <img
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="badge bg-white text-secondary-700 px-3 py-1 shadow-sm">
                            {pet.adoptionStatus === 'available' ? 'Available' : pet.adoptionStatus === 'pending' ? 'Pending' : 'Adopted'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => toggleSave(pet, e)}
                          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                        >
                          {isSaved(pet) ? (
                            <Heart size={18} className="text-red-500" fill="currentColor" />
                          ) : (
                            <Heart size={18} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold">{pet.name}</h3>
                          <span className="text-sm font-medium text-gray-500">{pet.age} yr old</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <span className="mr-4">{pet.breed}</span>
                          <span className="mr-4">{pet.gender}</span>
                          <span>{pet.size}</span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {pet.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pet.characteristics.slice(0, 3).map((trait, index) => (
                            <span key={index} className="badge-secondary text-xs">
                              {trait}
                            </span>
                          ))}
                          {pet.characteristics.length > 3 && (
                            <span className="badge bg-gray-100 text-gray-700 text-xs">
                              +{pet.characteristics.length - 3} more
                            </span>
                          )}
                        </div>
                        <button className="btn-secondary w-full">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Pets Tab */}
          {activeTab === 'saved' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Your Saved Pets</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  View and manage your saved pet collection
                </p>
              </div>
              
              {savedPets.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-md max-w-md mx-auto">
                  <Heart size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No saved pets yet</h3>
                  <p className="text-gray-500 mb-6">
                    Start saving pets by clicking the heart icon on any pet card
                  </p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="btn-secondary"
                  >
                    Browse Pets
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPets.map(pet => (
                    <div 
                      key={pet.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => openPetModal(pet)}
                    >
                      <div className="relative h-64">
                        <img
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="badge bg-white text-secondary-700 px-3 py-1 shadow-sm">
                            {pet.adoptionStatus === 'available' ? 'Available' : pet.adoptionStatus === 'pending' ? 'Pending' : 'Adopted'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => toggleSave(pet, e)}
                          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                        >
                          <Heart size={18} className="text-red-500" fill="currentColor" />
                        </button>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold">{pet.name}</h3>
                          <span className="text-sm font-medium text-gray-500">{pet.age} yr old</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <span className="mr-4">{pet.breed}</span>
                          <span className="mr-4">{pet.gender}</span>
                          <span>{pet.size}</span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {pet.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pet.characteristics.slice(0, 3).map((trait, index) => (
                            <span key={index} className="badge-secondary text-xs">
                              {trait}
                            </span>
                          ))}
                          {pet.characteristics.length > 3 && (
                            <span className="badge bg-gray-100 text-gray-700 text-xs">
                              +{pet.characteristics.length - 3} more
                            </span>
                          )}
                        </div>
                        <button className="btn-secondary w-full">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pet Detail Modal */}
      {showPetModal && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            {!showContactForm ? (
              <>
                {/* Pet Details View */}
                <div className="relative">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={selectedPet.imageUrl}
                      alt={selectedPet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={closePetModal}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => toggleSave(selectedPet, e)}
                    className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                  >
                    {isSaved(selectedPet) ? (
                      <Heart size={20} className="text-red-500" fill="currentColor" />
                    ) : (
                      <Heart size={20} className="text-gray-500" />
                    )}
                  </button>
                  
                  <div className="absolute bottom-4 right-4">
                    <span className={`badge px-3 py-1 shadow-sm ${
                      selectedPet.adoptionStatus === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedPet.adoptionStatus === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedPet.adoptionStatus === 'available' ? 'Available for Adoption' : selectedPet.adoptionStatus === 'pending' ? 'Adoption Pending' : 'Already Adopted'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{selectedPet.name}</h2>
                      <p className="text-lg text-gray-600">{selectedPet.breed}</p>
                    </div>
                    
                    {quizResults && (
                      <div className={`badge px-3 py-1 mt-2 md:mt-0 ${
                        getMatchPercentage(selectedPet) >= 75 
                          ? 'bg-green-100 text-green-800' 
                          : getMatchPercentage(selectedPet) >= 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getMatchPercentage(selectedPet)}% Match
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Calendar size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-medium">{selectedPet.age} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        {selectedPet.gender === 'male' ? (
                          <Male size={20} className="text-gray-600" />
                        ) : (
                          <Female size={20} className="text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium capitalize">{selectedPet.gender}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <ArrowsUpFromLine size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p className="font-medium capitalize">{selectedPet.size}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">About {selectedPet.name}</h3>
                    <p className="text-gray-700 mb-4">
                      {selectedPet.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPet.characteristics.map((trait, index) => (
                        <span key={index} className="badge-secondary">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3">Location</h3>
                    <div className="flex items-center">
                      <MapPin size={20} className="text-gray-500 mr-2" />
                      <p className="text-gray-700">{selectedPet.location}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-bold mb-4">Interested in adopting {selectedPet.name}?</h3>
                    
                    {selectedPet.adoptionStatus === 'available' ? (
                      <button
                        onClick={openContactForm}
                        className="btn-secondary w-full md:w-auto flex items-center justify-center"
                      >
                        <Heart size={20} className="mr-2" />
                        Contact About Adoption
                      </button>
                    ) : (
                      <p className="text-gray-700">
                        {selectedPet.name} is {selectedPet.adoptionStatus === 'pending' ? 'currently pending adoption' : 'already adopted'}. 
                        Please check out our other available pets.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Contact Form View */}
                <div className="p-6">
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-500 hover:text-gray-700 mb-4 flex items-center"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to {selectedPet.name}'s profile
                  </button>
                  
                  <h2 className="text-2xl font-bold mb-6">Contact About Adopting {selectedPet.name}</h2>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle size={24} className="text-green-600 mr-2" />
                        <h3 className="text-lg font-bold">Thank you for your interest!</h3>
                      </div>
                      <p className="mb-4">
                        Your inquiry about adopting {selectedPet.name} has been submitted successfully. 
                        A member of our adoption team will contact you within 24-48 hours to discuss the next steps.
                      </p>
                      <button
                        onClick={closePetModal}
                        className="btn-secondary"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactFormSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="label">Your Name*</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className={`input pl-10 ${formErrors.name ? 'border-red-500' : ''}`}
                              placeholder="Enter your full name"
                              value={contactForm.name}
                              onChange={handleContactFormChange}
                            />
                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="label">Email Address*</label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`input pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                              placeholder="your@email.com"
                              value={contactForm.email}
                              onChange={handleContactFormChange}
                            />
                            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="label">Phone Number*</label>
                          <div className="relative">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className={`input pl-10 ${formErrors.phone ? 'border-red-500' : ''}`}
                              placeholder="(123) 456-7890"
                              value={contactForm.phone}
                              onChange={handleContactFormChange}
                            />
                            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="message" className="label">Message*</label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className={`input ${formErrors.message ? 'border-red-500' : ''}`}
                            placeholder={`Tell us why you're interested in adopting ${selectedPet.name} and ask any questions you may have...`}
                            value={contactForm.message}
                            onChange={handleContactFormChange}
                          ></textarea>
                          {formErrors.message && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-secondary"
                        >
                          Submit Inquiry
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Add missing icon components
const Female = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="7" />
    <line x1="12" y1="21" x2="12" y2="15" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const Male = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="14" r="7" />
    <line x1="22" y1="2" x2="15" y2="9" />
    <line x1="16" y1="2" x2="22" y2="2" />
    <line x1="22" y1="8" x2="22" y2="2" />
  </svg>
);

const Calendar = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowsUpFromLine = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m4 6 3-3 3 3" />
    <path d="M7 17V3" />
    <path d="m14 6 3-3 3 3" />
    <path d="M17 17V3" />
    <path d="M4 21h16" />
  </svg>
);

export default AdoptionMatcherPage;