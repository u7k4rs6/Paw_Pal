import { useState } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Image, 
  Send, 
  Search, 
  Filter, 
  User,
  X,
  PlusCircle,
  Tag
} from 'lucide-react';
import { usePetContext } from '../context/PetContext';
import { Post } from '../types';

const CommunityPage = () => {
  const { currentUser, posts, createPost, addComment, likePost } = usePetContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    imageUrl: '',
    category: 'discussion' as 'tip' | 'question' | 'discussion' | 'photo',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);

  const filteredPosts = posts.filter(post => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = 
      selectedCategory === null || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handlePostFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      e.preventDefault();
      if (!newPost.tags.includes(newTag.trim())) {
        setNewPost({
          ...newPost,
          tags: [...newPost.tags, newTag.trim()]
        });
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.content.trim()) {
      createPost({
        content: newPost.content,
        imageUrl: newPost.imageUrl || undefined,
        category: newPost.category,
        tags: newPost.tags
      });
      setNewPost({
        content: '',
        imageUrl: '',
        category: 'discussion',
        tags: []
      });
      setShowPostForm(false);
    }
  };

  const handleCommentChange = (postId: string, content: string) => {
    setNewComment({
      ...newComment,
      [postId]: content
    });
  };

  const handleAddComment = (postId: string) => {
    if (newComment[postId]?.trim()) {
      addComment(postId, newComment[postId]);
      setNewComment({
        ...newComment,
        [postId]: ''
      });
    }
  };

  const handleLikePost = (postId: string) => {
    likePost(postId);
  };

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const closePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-500 to-accent-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Pet Care Community</h1>
            <p className="text-xl mb-8">
              Connect with fellow pet lovers, share tips, ask questions, and join discussions about everything pet-related.
            </p>
            
            <button
              onClick={() => setShowPostForm(true)}
              className="btn bg-white text-accent-700 hover:bg-gray-100 flex items-center mx-auto"
            >
              <PlusCircle size={20} className="mr-2" />
              Create a Post
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                
                <div className="space-y-2">
                  <button
                    className={`w-full py-2 px-3 rounded-lg text-left transition-colors ${
                      selectedCategory === null
                        ? 'bg-accent-100 text-accent-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    All Posts
                  </button>
                  <button
                    className={`w-full py-2 px-3 rounded-lg text-left transition-colors ${
                      selectedCategory === 'tip'
                        ? 'bg-accent-100 text-accent-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange('tip')}
                  >
                    Tips & Advice
                  </button>
                  <button
                    className={`w-full py-2 px-3 rounded-lg text-left transition-colors ${
                      selectedCategory === 'question'
                        ? 'bg-accent-100 text-accent-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange('question')}
                  >
                    Questions
                  </button>
                  <button
                    className={`w-full py-2 px-3 rounded-lg text-left transition-colors ${
                      selectedCategory === 'discussion'
                        ? 'bg-accent-100 text-accent-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange('discussion')}
                  >
                    Discussions
                  </button>
                  <button
                    className={`w-full py-2 px-3 rounded-lg text-left transition-colors ${
                      selectedCategory === 'photo'
                        ? 'bg-accent-100 text-accent-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange('photo')}
                  >
                    Pet Photos
                  </button>
                </div>
                
                <hr className="my-6" />
                
                <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
                
                <div className="flex flex-wrap gap-2">
                  <button className="badge-accent">
                    #dogtraining
                  </button>
                  <button className="badge-accent">
                    #catcare
                  </button>
                  <button className="badge-accent">
                    #petnutrition
                  </button>
                  <button className="badge-accent">
                    #puppies
                  </button>
                  <button className="badge-accent">
                    #rescuepets
                  </button>
                  <button className="badge-accent">
                    #pettips
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-2/4">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="input pl-10 w-full"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              {/* Create Post Button (Mobile) */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowPostForm(true)}
                  className="btn-accent w-full flex items-center justify-center"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Create a Post
                </button>
              </div>
              
              {/* Posts Feed */}
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No posts found</h3>
                    <p className="text-gray-500 mb-6">
                      {searchQuery 
                        ? `No posts match "${searchQuery}"${selectedCategory ? ` in the ${selectedCategory} category` : ''}`
                        : selectedCategory 
                          ? `No posts in the ${selectedCategory} category` 
                          : 'Be the first to create a post!'}
                    </p>
                    <button
                      onClick={() => setShowPostForm(true)}
                      className="btn-accent"
                    >
                      Create a Post
                    </button>
                  </div>
                ) : (
                  filteredPosts.map(post => (
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
                          <span className="ml-auto badge-accent">
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
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="badge-primary text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500">
                            <button 
                              onClick={() => handleLikePost(post.id)}
                              className="flex items-center hover:text-accent-600"
                            >
                              <Heart size={18} className="mr-1" />
                              <span className="mr-4">{post.likes}</span>
                            </button>
                            <button
                              onClick={() => openPostDetail(post)}
                              className="flex items-center hover:text-accent-600"
                            >
                              <MessageCircle size={18} className="mr-1" />
                              <span>{post.comments.length}</span>
                            </button>
                          </div>
                          <button
                            onClick={() => openPostDetail(post)}
                            className="text-accent-600 font-medium hover:text-accent-700"
                          >
                            View Discussion →
                          </button>
                        </div>
                        
                        {/* Quick Comment Form */}
                        {currentUser && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-start gap-3">
                              <img 
                                src={currentUser.avatar} 
                                alt={currentUser.name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-grow relative">
                                <input
                                  type="text"
                                  placeholder="Write a comment..."
                                  className="input pr-10"
                                  value={newComment[post.id] || ''}
                                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleAddComment(post.id);
                                    }
                                  }}
                                />
                                <button
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-600 hover:text-accent-800"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComment[post.id]?.trim()}
                                >
                                  <Send size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:w-1/4">
              {/* User Profile Card */}
              {currentUser && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{currentUser.name}</h3>
                      <p className="text-gray-500 text-sm">{currentUser.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {currentUser.bio || "No bio yet. Tell the community about yourself and your pets!"}
                  </p>
                  
                  <button className="btn-outline w-full flex items-center justify-center">
                    <User size={18} className="mr-2" />
                    View Profile
                  </button>
                </div>
              )}
              
              {/* Trending Discussions */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Trending Discussions</h3>
                
                <div className="space-y-4">
                  <div className="group cursor-pointer">
                    <h4 className="font-medium group-hover:text-accent-600 transition-colors">
                      Best food brands for dogs with sensitive stomachs?
                    </h4>
                    <p className="text-sm text-gray-500">32 comments • 2 days ago</p>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <h4 className="font-medium group-hover:text-accent-600 transition-colors">
                      How to introduce a new kitten to your resident cat
                    </h4>
                    <p className="text-sm text-gray-500">18 comments • 3 days ago</p>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <h4 className="font-medium group-hover:text-accent-600 transition-colors">
                      Tips for managing seasonal allergies in pets
                    </h4>
                    <p className="text-sm text-gray-500">24 comments • 5 days ago</p>
                  </div>
                </div>
                
                <button className="text-accent-600 font-medium mt-4 hover:text-accent-700">
                  View All →
                </button>
              </div>
              
              {/* Community Guidelines */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Community Guidelines</h3>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-accent-100 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-accent-800 text-sm font-bold">1</span>
                    </div>
                    <p>Be respectful and kind to other community members</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-accent-100 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-accent-800 text-sm font-bold">2</span>
                    </div>
                    <p>Share accurate, helpful information about pet care</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-accent-100 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-accent-800 text-sm font-bold">3</span>
                    </div>
                    <p>Use appropriate categories when posting</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-accent-100 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-accent-800 text-sm font-bold">4</span>
                    </div>
                    <p>For medical concerns, always consult a veterinarian</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create a Post</h2>
                <button
                  onClick={() => setShowPostForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreatePost}>
                <div className="mb-6">
                  <label htmlFor="category" className="label">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="input"
                    value={newPost.category}
                    onChange={handlePostFormChange}
                  >
                    <option value="discussion">Discussion</option>
                    <option value="question">Question</option>
                    <option value="tip">Tip/Advice</option>
                    <option value="photo">Photo</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="content" className="label">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    rows={5}
                    className="input"
                    placeholder="What's on your mind about pets?"
                    value={newPost.content}
                    onChange={handlePostFormChange}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="imageUrl" className="label flex items-center">
                    <Image size={18} className="mr-2 text-gray-500" />
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="input"
                    placeholder="https://example.com/image.jpg"
                    value={newPost.imageUrl}
                    onChange={handlePostFormChange}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="tags" className="label flex items-center">
                    <Tag size={18} className="mr-2 text-gray-500" />
                    Tags
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPost.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="badge-accent flex items-center"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-accent-800 hover:text-accent-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      id="tags"
                      className="input pl-8"
                      placeholder="Add tags (press Enter after each tag)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <Tag size={18} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Add relevant tags to help others find your post (e.g., dogtraining, petcare)
                  </p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-accent"
                    disabled={!newPost.content.trim()}
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {showPostDetail && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6">
              <button
                onClick={closePostDetail}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center mb-6">
                <img 
                  src={selectedPost.userAvatar} 
                  alt={selectedPost.userName} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{selectedPost.userName}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedPost.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className="ml-auto badge-accent">
                  {selectedPost.category === 'tip' ? 'Tip' : 
                   selectedPost.category === 'question' ? 'Question' : 
                   selectedPost.category === 'discussion' ? 'Discussion' : 'Photo'}
                </span>
              </div>
              
              <p className="text-gray-700 text-lg mb-6">{selectedPost.content}</p>
              
              {selectedPost.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={selectedPost.imageUrl} 
                    alt="Post content" 
                    className="w-full max-h-96 object-contain"
                  />
                </div>
              )}
              
              {selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <span key={index} className="badge-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center text-gray-500 border-t border-b border-gray-200 py-3 mb-6">
                <button 
                  onClick={() => handleLikePost(selectedPost.id)}
                  className="flex items-center hover:text-accent-600"
                >
                  <Heart size={20} className="mr-1" />
                  <span className="mr-6">{selectedPost.likes} likes</span>
                </button>
                <div className="flex items-center">
                  <MessageCircle size={20} className="mr-1" />
                  <span>{selectedPost.comments.length} comments</span>
                </div>
              </div>
              
              {/* Comments */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">
                  Comments
                </h3>
                
                {selectedPost.comments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPost.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <img 
                          src={comment.userAvatar} 
                          alt={comment.userName} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-grow">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{comment.userName}</h4>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex gap-3 mt-1 text-sm">
                            <button className="text-gray-500 hover:text-gray-700">Like</button>
                            <button className="text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
              
              {/* Add Comment */}
              {currentUser && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-grow relative">
                      <textarea
                        placeholder="Write a comment..."
                        className="input min-h-[80px]"
                        value={newComment[selectedPost.id] || ''}
                        onChange={(e) => handleCommentChange(selectedPost.id, e.target.value)}
                      ></textarea>
                      <button
                        className="btn-accent mt-2 flex items-center ml-auto"
                        onClick={() => handleAddComment(selectedPost.id)}
                        disabled={!newComment[selectedPost.id]?.trim()}
                      >
                        <Send size={18} className="mr-2" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;