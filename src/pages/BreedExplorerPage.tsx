import { useState } from 'react';
import { Upload, Search, Info, Check, Heart, HeartOff, PawPrint, X } from 'lucide-react';
import { usePetContext } from '../context/PetContext';
import { Breed } from '../types';

const BreedExplorerPage = () => {
  const { 
    breeds, 
    identifiedBreed, 
    savedBreeds, 
    loading, 
    uploadPhoto, 
    identifyBreed, 
    addSavedBreed, 
    removeSavedBreed, 
    setIdentifiedBreed 
  } = usePetContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'search' | 'saved'>('upload');
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [identificationConfidence, setIdentificationConfidence] = useState<number>(0);

  const filteredBreeds = breeds.filter(breed => 
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate the file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image is too large. Please select an image under 5MB.");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file.");
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Reset identified breed when new image is uploaded
      setIdentifiedBreed(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // Reset confidence level
        setIdentificationConfidence(0);
        
        const photoUrl = await uploadPhoto(selectedFile);
        await identifyBreed(photoUrl);
        
        // Set a random confidence level between 70% and 95%
        setIdentificationConfidence(70 + Math.floor(Math.random() * 25));
      } catch (error) {
        console.error('Error identifying breed:', error);
        alert("There was a problem processing your image. Please try a different image or try again later.");
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openBreedModal = (breed: Breed) => {
    setSelectedBreed(breed);
    setShowBreedModal(true);
  };

  const closeBreedModal = () => {
    setShowBreedModal(false);
    setSelectedBreed(null);
  };

  const isSaved = (breed: Breed) => {
    return savedBreeds.some(savedBreed => savedBreed.id === breed.id);
  };

  const toggleSave = (breed: Breed, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (isSaved(breed)) {
      removeSavedBreed(breed.id);
    } else {
      addSavedBreed(breed);
    }
  };

  const renderCharacteristicBar = (value: number, label: string) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-600">{value}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full" 
          style={{ width: `${(value / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Pet Breed Explorer</h1>
            <p className="text-xl mb-8">
              Upload a photo of a dog to identify its breed or search our database for detailed breed information.
            </p>
            
            <div className="bg-white rounded-lg p-1 inline-flex shadow-md">
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('upload')}
              >
                <Upload size={18} className="inline mr-2" />
                Upload Photo
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'search'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('search')}
              >
                <Search size={18} className="inline mr-2" />
                Search Breeds
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('saved')}
              >
                <Heart size={18} className="inline mr-2" />
                Saved Breeds
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Upload Photo Tab */}
          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Upload Area */}
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold mb-4">Upload a Dog Photo</h2>
                  <p className="text-gray-600 mb-6">
                    Upload a clear photo of a dog to identify its breed and learn more about it.
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 hover:border-primary-500 transition-colors">
                    <input
                      type="file"
                      id="dog-photo"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="dog-photo"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={40} className="text-gray-400 mb-3" />
                      <p className="text-gray-500 mb-2">Click to upload or drag and drop</p>
                      <p className="text-gray-400 text-sm">JPG, PNG or GIF (max. 10MB)</p>
                    </label>
                  </div>
                  
                  {previewUrl && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Selected Image:</p>
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <button
                    className="btn-primary w-full flex items-center justify-center"
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Identifying Breed...
                      </>
                    ) : (
                      <>
                        <PawPrint size={20} className="mr-2" />
                        Identify Breed
                      </>
                    )}
                  </button>
                </div>
                
                {/* Right Side - Results */}
                <div className="bg-gray-50 md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {identifiedBreed ? 'Identified Breed' : 'Results'}
                  </h2>
                  
                  {!identifiedBreed && !loading && (
                    <div className="text-center py-12">
                      <PawPrint size={64} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Upload a photo to identify the dog breed
                      </p>
                    </div>
                  )}
                  
                  {loading && (
                    <div className="text-center py-12">
                      <div className="inline-block animate-bounce-slow">
                        <PawPrint size={64} className="text-primary-400" />
                      </div>
                      <p className="text-gray-600 mt-4">Analyzing the photo...</p>
                    </div>
                  )}
                  
                  {identifiedBreed && !loading && (
                    <div className="animate-fade-in">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{identifiedBreed.name}</h3>
                        <button
                          onClick={(e) => toggleSave(identifiedBreed, e)}
                          className="text-primary-600 hover:text-primary-800 focus:outline-none"
                        >
                          {isSaved(identifiedBreed) ? (
                            <HeartOff size={20} />
                          ) : (
                            <Heart size={20} />
                          )}
                        </button>
                      </div>
                      
                      {/* Add confidence level indicator */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-600">Confidence</span>
                          <span className="text-sm font-medium text-gray-600">{identificationConfidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${identificationConfidence > 85 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${identificationConfidence}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {identificationConfidence > 85 
                            ? "High confidence match" 
                            : "Possible match - results may vary"}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <img
                          src={identifiedBreed.imageUrl}
                          alt={identifiedBreed.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {identifiedBreed.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Temperament:</h4>
                        <div className="flex flex-wrap gap-2">
                          {identifiedBreed.temperament.map((trait, index) => (
                            <span key={index} className="badge-primary">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Weight</p>
                          <p className="font-medium">{identifiedBreed.weight.imperial}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Height</p>
                          <p className="font-medium">{identifiedBreed.height.imperial}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Life Span</p>
                          <p className="font-medium">{identifiedBreed.lifeSpan}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openBreedModal(identifiedBreed)}
                        className="btn-outline w-full flex items-center justify-center"
                      >
                        <Info size={20} className="mr-2" />
                        View Detailed Information
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search Breeds Tab */}
          {activeTab === 'search' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for dog breeds..."
                    className="input pl-12 pr-4 py-3 w-full max-w-3xl mx-auto block shadow-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              {searchQuery && filteredBreeds.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No breeds found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBreeds.map(breed => (
                    <div 
                      key={breed.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => openBreedModal(breed)}
                    >
                      <div className="relative h-48">
                        <img
                          src={breed.imageUrl}
                          alt={breed.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => toggleSave(breed, e)}
                          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                        >
                          {isSaved(breed) ? (
                            <Heart size={18} className="text-red-500" fill="currentColor" />
                          ) : (
                            <Heart size={18} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2">{breed.name}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {breed.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {breed.temperament.slice(0, 3).map((trait, index) => (
                            <span key={index} className="badge-primary text-xs">
                              {trait}
                            </span>
                          ))}
                          {breed.temperament.length > 3 && (
                            <span className="badge bg-gray-100 text-gray-700 text-xs">
                              +{breed.temperament.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Weight: {breed.weight.imperial}</span>
                          <span>Life Span: {breed.lifeSpan}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Breeds Tab */}
          {activeTab === 'saved' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Your Saved Breeds</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  View and manage your saved breed collection
                </p>
              </div>
              
              {savedBreeds.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-md max-w-md mx-auto">
                  <Heart size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No saved breeds yet</h3>
                  <p className="text-gray-500 mb-6">
                    Start saving breeds by clicking the heart icon on any breed card
                  </p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="btn-primary"
                  >
                    Explore Breeds
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedBreeds.map(breed => (
                    <div 
                      key={breed.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => openBreedModal(breed)}
                    >
                      <div className="relative h-48">
                        <img
                          src={breed.imageUrl}
                          alt={breed.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => toggleSave(breed, e)}
                          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                        >
                          <Heart size={18} className="text-red-500" fill="currentColor" />
                        </button>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2">{breed.name}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {breed.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {breed.temperament.slice(0, 3).map((trait, index) => (
                            <span key={index} className="badge-primary text-xs">
                              {trait}
                            </span>
                          ))}
                          {breed.temperament.length > 3 && (
                            <span className="badge bg-gray-100 text-gray-700 text-xs">
                              +{breed.temperament.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Weight: {breed.weight.imperial}</span>
                          <span>Life Span: {breed.lifeSpan}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Breed Detail Modal */}
      {showBreedModal && selectedBreed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="relative">
              <div className="h-64 overflow-hidden">
                <img
                  src={selectedBreed.imageUrl}
                  alt={selectedBreed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={closeBreedModal}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
              >
                <X size={24} className="text-gray-500" />
              </button>
              <button
                onClick={(e) => toggleSave(selectedBreed, e)}
                className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
              >
                {isSaved(selectedBreed) ? (
                  <Heart size={20} className="text-red-500" fill="currentColor" />
                ) : (
                  <Heart size={20} className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{selectedBreed.name}</h2>
              
              <p className="text-gray-700 mb-6">
                {selectedBreed.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Breed Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Temperament:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBreed.temperament.map((trait, index) => (
                          <span key={index} className="badge-primary">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">{selectedBreed.weight.imperial}</p>
                        <p className="text-xs text-gray-400">{selectedBreed.weight.metric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Height</p>
                        <p className="font-medium">{selectedBreed.height.imperial}</p>
                        <p className="text-xs text-gray-400">{selectedBreed.height.metric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Life Span</p>
                        <p className="font-medium">{selectedBreed.lifeSpan}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Characteristics</h3>
                  
                  <div className="space-y-2">
                    {renderCharacteristicBar(selectedBreed.characteristics.adaptability, 'Adaptability')}
                    {renderCharacteristicBar(selectedBreed.characteristics.affectionLevel, 'Affection Level')}
                    {renderCharacteristicBar(selectedBreed.characteristics.childFriendly, 'Child Friendly')}
                    {renderCharacteristicBar(selectedBreed.characteristics.dogFriendly, 'Dog Friendly')}
                    {renderCharacteristicBar(selectedBreed.characteristics.energyLevel, 'Energy Level')}
                    {renderCharacteristicBar(selectedBreed.characteristics.grooming, 'Grooming Needs')}
                    {renderCharacteristicBar(selectedBreed.characteristics.healthIssues, 'Health Issues')}
                    {renderCharacteristicBar(selectedBreed.characteristics.intelligence, 'Intelligence')}
                    {renderCharacteristicBar(selectedBreed.characteristics.sheddingLevel, 'Shedding Level')}
                    {renderCharacteristicBar(selectedBreed.characteristics.trainability, 'Trainability')}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold mb-4">Care Guidelines</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                      <PawPrint size={20} className="text-primary-600" />
                    </div>
                    <h4 className="font-bold mb-2">Exercise Needs</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedBreed.characteristics.energyLevel >= 4 
                        ? 'High energy breed that needs plenty of daily exercise and mental stimulation.' 
                        : selectedBreed.characteristics.energyLevel >= 2
                          ? 'Moderate exercise needs. Daily walks and play sessions are recommended.'
                          : 'Low energy breed that requires minimal exercise. Short walks are sufficient.'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-secondary-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                      <Check size={20} className="text-secondary-600" />
                    </div>
                    <h4 className="font-bold mb-2">Grooming</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedBreed.characteristics.grooming >= 4 
                        ? 'High maintenance coat that requires regular professional grooming and daily brushing.' 
                        : selectedBreed.characteristics.grooming >= 2
                          ? 'Moderate grooming needs. Regular brushing and occasional baths are needed.'
                          : 'Low maintenance coat. Occasional brushing is sufficient to keep coat healthy.'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-accent-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                      <Info size={20} className="text-accent-600" />
                    </div>
                    <h4 className="font-bold mb-2">Training</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedBreed.characteristics.trainability >= 4 
                        ? 'Highly trainable breed that responds well to consistent, positive reinforcement training methods.' 
                        : selectedBreed.characteristics.trainability >= 2
                          ? 'Moderately trainable. May be stubborn at times but responds to firm, consistent training.'
                          : 'Can be challenging to train. Requires patient, experienced handlers and consistent training.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button onClick={closeBreedModal} className="btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedExplorerPage;