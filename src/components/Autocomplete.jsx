import { useState, useEffect } from 'react';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import './Autocomplete.css';

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch filtered items from DummyJSON API
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=8`);
      
      if (!response.ok) {
        throw new Error('Network response failed');
      }
      
      const data = await response.json();
      setSuggestions(data.products || []);
    } catch (err) {
      setError('Failed to fetch product data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce logic & AbortController handling
  useEffect(() => {
    const controller = new AbortController();
    
    const delayDebounceTimer = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceTimer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="search-page-wrapper">
      <div className="search-center-content">
        
        {/* 1. Logo Container Placeholder */}
        <div className="logo-container">
          <img 
            src="/image_2dd6dc.png" 
            alt="My Custom Logo" 
            className="custom-logo" 
          />
        </div>

        {/* 2. Relative Container Wrapper that forces the Dropdown to stay underneath */}
        <div className="search-box-rel-container">
          
          {/* The visible search input container */}
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
          {query.trim() && (
            <div className="suggestions-overlay-panel">
              {loading && <div className="dropdown-status-row">Searching catalog...</div>}
              
              {error && <div className="dropdown-status-row error-text">{error}</div>}

              {!loading && !error && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((product) => (
                    <li 
                      key={product.id} 
                      className="suggestion-item"
                      onClick={() => {
                        setQuery(product.title);
                        setSuggestions([]);
                      }}
                    >
                      <Search size={16} className="item-search-icon" />
                      {product.thumbnail && (
                        <img 
                          src={product.thumbnail} 
                          alt={product.title} 
                          className="item-thumbnail-preview" 
                        />
                      )}
                      <span className="item-title-text">{product.title}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!loading && !error && query.trim() && suggestions.length === 0 && (
                <div className="dropdown-status-row">No matching products found</div>
              )}
            </div>
          )}

        </div> {/* End of search-box-rel-container */}

      </div>
    </div>
  );
}

export default Autocomplete;