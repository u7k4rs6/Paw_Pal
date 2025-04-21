import { Link } from 'react-router-dom';
import { Search, Heart, MessageCircle, PawPrint } from 'lucide-react';
import { mockBreeds, mockPets, mockPosts } from '../data/mockData';

const HomePage = () => {
  // Get a few items for the showcase sections
  const featuredBreeds = mockBreeds.slice(0, 3);
  const featuredPets = mockPets.slice(0, 3);
  const featuredPosts = mockPosts.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 mt-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Ultimate Pet Companion Hub
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover breeds, find your perfect pet match, and connect with the pet lover community—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/breed-explorer" className="btn-primary text-center">
                Explore Breeds
              </Link>
              <Link to="/adoption-matcher" className="btn-secondary text-center">
                Find a Pet
              </Link>
              <Link to="/community" className="btn-accent text-center">
                Join Community
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,234.7C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything Your Pet Needs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PawPal brings together all the tools and resources you need to be the best pet parent possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pet Breed Explorer</h3>
              <p className="text-gray-600 mb-6">
                Upload your dog's photo to identify its breed and discover detailed information about characteristics, care needs, and more.
              </p>
              <Link to="/breed-explorer" className="text-primary-600 font-medium hover:text-primary-700">
                Try It Now →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Adoption Matchmaker</h3>
              <p className="text-gray-600 mb-6">
                Find your perfect companion through our personality-based matching system that connects you with pets suited to your lifestyle.
              </p>
              <Link to="/adoption-matcher" className="text-secondary-600 font-medium hover:text-secondary-700">
                Find Your Match →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={32} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pet Care Community</h3>
              <p className="text-gray-600 mb-6">
                Connect with fellow pet owners, share experiences, get advice, and join a supportive community of animal lovers.
              </p>
              <Link to="/community" className="text-accent-600 font-medium hover:text-accent-700">
                Join the Community →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breed Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Popular Dog Breeds</h2>
              <p className="text-gray-600">Explore detailed information about hundreds of dog breeds</p>
            </div>
            <Link to="/breed-explorer" className="btn-outline mt-4 md:mt-0">
              View All Breeds
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBreeds.map(breed => (
              <div key={breed.id} className="card group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={breed.imageUrl} 
                    alt={breed.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium">
                      {breed.temperament.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <PawPrint size={20} className="text-primary-500 mr-2" />
                    {breed.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {breed.description}
                  </p>
                  <Link to={`/breed-explorer?breed=${breed.id}`} className="text-primary-600 font-medium hover:text-primary-700">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Showcase */}
      <section className="py-16 bg-gradient-to-r from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Pets Looking for Homes</h2>
              <p className="text-gray-600">Find your perfect companion among these adorable pets</p>
            </div>
            <Link to="/adoption-matcher" className="btn-secondary mt-4 md:mt-0">
              Meet More Pets
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPets.map(pet => (
              <div key={pet.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pet.imageUrl} 
                    alt={pet.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge bg-white text-secondary-700 px-3 py-1 shadow-sm">
                      {pet.adoptionStatus === 'available' ? 'Available' : pet.adoptionStatus === 'pending' ? 'Pending' : 'Adopted'}
                    </span>
                  </div>
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
                  </div>
                  <Link to={`/adoption-matcher?pet=${pet.id}`} className="btn-secondary w-full text-center">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">From Our Community</h2>
              <p className="text-gray-600">Tips, stories, and discussions from pet lovers like you</p>
            </div>
            <Link to="/community" className="btn-accent mt-4 md:mt-0">
              Join the Conversation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.userAvatar} 
                      alt={post.userName} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{post.userName}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="ml-auto badge-primary">
                      {post.category === 'tip' ? 'Tip' : 
                       post.category === 'question' ? 'Question' : 
                       post.category === 'discussion' ? 'Discussion' : 'Photo'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  {post.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt="Post content" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Heart size={18} className="mr-1" />
                      <span className="mr-4">{post.likes} likes</span>
                      <MessageCircle size={18} className="mr-1" />
                      <span>{post.comments.length} comments</span>
                    </div>
                    <Link to={`/community?post=${post.id}`} className="text-accent-600 font-medium hover:text-accent-700">
                      Join Discussion →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to be a better pet parent?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of pet lovers on PawPal and access all our tools and resources to give your furry friend the best life possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/breed-explorer" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Start Exploring
            </Link>
            <Link to="/community" className="btn border-2 border-white text-white hover:bg-primary-700">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;