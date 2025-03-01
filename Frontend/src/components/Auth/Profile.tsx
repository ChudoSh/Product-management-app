// src/components/Auth/Profile.tsx
import React, { useState } from 'react';
import { FiUser, FiMail, FiEdit, FiSave } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setError('All fields are required');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // This would normally call an API to update the profile
      // For now, we'll just simulate a successful update
      
      // await userService.updateProfile({ name, email });
      setEditing(false);
      setIsLoading(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block">👤 User Profile:</span>
            <span className="text-xs block text-stone-500">
              Manage your account details
            </span>
          </div>

          <button 
            onClick={() => setEditing(!editing)} 
            className="flex text-sm items-center gap-2 bg-violet-100 text-violet-700 transition-colors hover:bg-violet-200 px-3 py-1.5 rounded"
          >
            {editing ? <><FiSave /> Save</> : <><FiEdit /> Edit</>}
          </button>
        </div>
      </div>
      
      <div className="px-4">
        <div className="col-span-12 p-4 rounded border border-stone-300">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
              <FiUser className="text-4xl text-violet-500" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-stone-500">{user?.email}</p>
              <p className="text-xs text-stone-400 mt-1">Member since {new Date(user?.create_at|| Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center border border-stone-300 rounded-md focus-within:ring-2 focus-within:ring-violet-500">
                <span className="pl-3 text-stone-500">
                  <FiUser />
                </span>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-3 py-2 outline-none" 
                  disabled={!editing}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-stone-300 rounded-md focus-within:ring-2 focus-within:ring-violet-500">
                <span className="pl-3 text-stone-500">
                  <FiMail />
                </span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 outline-none" 
                  disabled={!editing}
                />
              </div>
            </div>
            
            {editing && (
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-sm text-stone-600 border border-stone-300 rounded hover:bg-stone-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm text-white bg-violet-600 rounded hover:bg-violet-700 disabled:opacity-70"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;