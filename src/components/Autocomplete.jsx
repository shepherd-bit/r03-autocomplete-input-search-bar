import { useState } from 'react';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import './Autocomplete.css';

function Autocomplete() {
  const [query, setQuery] = useState('');

  return (
    <div className="search-page-wrapper">
      <div className="search-center-content">
        
        {/* 1. Clear Logo Placeholder */}
        {/* 1. Clear Logo Placeholder */}
        <div className="logo-container">
            <img 
            src="/Shepherd-Logo.svg" 
            alt="My Custom Logo" 
            className="custom-logo" 
            />
        </div>

        {/* 2. Sleek Rounded Search Box */}
        <div className="search-bar-box">
          <Search className="icon-left" size={20} />
          
          <input
            type="text"
            className="main-search-input"
            placeholder="Ask Google or search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          <div className="icon-actions-right">
            <Mic className="action-icon" size={20} />
            <Camera className="action-icon" size={20} />
            <button className="chrome-ai-btn">
              <Sparkles size={16} />
              <span>AI Mode</span>
            </button>
          </div>
        </div>

        {/* 3. Floating Dropdown Container */}
        <div className="suggestions-overlay-panel">
          {/* API rows will map out here cleanly in later steps */}
        </div>

      </div>
    </div>
  );
}

export default Autocomplete;