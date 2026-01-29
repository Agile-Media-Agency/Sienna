import React, { useState, useEffect } from 'react'

// ============ HELPER FUNCTIONS ============
function calcAge(birthday, atDate = new Date()) {
  const birth = new Date(birthday);
  const at = new Date(atDate);
  let age = at.getFullYear() - birth.getFullYear();
  const monthDiff = at.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ============ SAMPLE DATA (will come from D1 later) ============
const INITIAL_DATA = {
  people: [
    { id: "sienna", name: "Sienna", nickname: "Sienna", birthday: "2010-11-24", emoji: "⭐", color: "#FF69B4", type: "family", isFavorite: true },
    { id: "neil", name: "Daddy (Neil)", nickname: "Daddy", birthday: "1973-06-07", emoji: "👨", color: "#3498DB", type: "family", isFavorite: true },
    { id: "cheryl", name: "Mommy (Cheryl)", nickname: "Mommy", birthday: "1975-04-21", emoji: "👩", color: "#E91E63", type: "family", isFavorite: true },
    { id: "chad", name: "Chad Wild Clay", nickname: "Chad", birthday: "1984-03-10", emoji: "🥷", color: "#FF6B35", type: "youtuber", isFavorite: true },
    { id: "vy", name: "Vy Qwaint", nickname: "Vy", birthday: "1986-01-03", emoji: "🎀", color: "#9B59B6", type: "youtuber", isFavorite: true },
    { id: "brooklynn", name: "Brooklynn Pitts", nickname: "Brooklynn", birthday: "2010-09-28", emoji: "🦒", color: "#FFD700", type: "musician", isFavorite: true },
    { id: "dallas", name: "Dallas Skye", nickname: "Dallas", birthday: "2011-11-17", emoji: "🎹", color: "#98D8C8", type: "musician", isFavorite: false },
    { id: "kinley", name: "Kinley Cunningham", nickname: "Kinley", birthday: "2010-12-22", emoji: "🌈", color: "#FF6B6B", type: "musician", isFavorite: false },
    { id: "tinie", name: "Tinie T", nickname: "Tinie", birthday: "2011-03-13", emoji: "🎤", color: "#9B59B6", type: "musician", isFavorite: false },
  ],
  events: [
    { id: "shrek-kravis", name: "Shrek Musical @ Kravis", date: "2024-09-28", emoji: "🎭", color: "#4CAF50", type: "show", isFavorite: true, attended: true },
    { id: "kidzbop-2018", name: "Kidz Bop Concert 2018", date: "2018-07-20", emoji: "🎵", color: "#FF9800", type: "concert", isFavorite: true, attended: true },
    { id: "kidzbop-2012", name: "Kidz Bop Concert 2012", date: "2012-08-12", emoji: "🎵", color: "#FF9800", type: "concert", isFavorite: true, attended: true },
    { id: "xomg-formed", name: "XOMG POP Formed", date: "2021-12-16", emoji: "⭐", color: "#FF69B4", type: "milestone", isFavorite: false, attended: false },
    { id: "xomg-agt", name: "XOMG POP on AGT", date: "2022-08-23", emoji: "🌟", color: "#FFD700", type: "tv", isFavorite: false, attended: false },
  ],
  groups: [
    { id: "xomg", name: "XOMG POP!", emoji: "💖", color: "#FF69B4", type: "band", isFavorite: true },
    { id: "spy-ninjas", name: "Spy Ninjas", emoji: "🥷", color: "#FF6B35", type: "youtube", isFavorite: true },
    { id: "kidz-bop", name: "Kidz Bop", emoji: "🎤", color: "#00BCD4", type: "band", isFavorite: true },
    { id: "shrek-musical", name: "Shrek the Musical", emoji: "🎭", color: "#4CAF50", type: "show", isFavorite: true },
  ]
};

// ============ COMPONENTS ============

function NavButton({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`nav-btn ${active ? 'active' : ''}`}>
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function HeartButton({ isFavorite, onToggle }) {
  return (
    <button className="heart-btn" onClick={onToggle}>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}

function PersonRow({ person, showHeart = true, onToggleFavorite }) {
  return (
    <div className={`person-row ${person.id === 'sienna' ? 'highlight' : ''}`}>
      <span className="emoji">{person.emoji}</span>
      <div className="info">
        <div className="name">{person.nickname || person.name}</div>
        <div className="birthday">🎂 {formatDate(person.birthday)}</div>
      </div>
      <span className="age-badge" style={{ background: person.color }}>{calcAge(person.birthday)}</span>
      {showHeart && <HeartButton isFavorite={person.isFavorite} onToggle={() => onToggleFavorite(person.id)} />}
    </div>
  );
}

function FavoritePill({ item, selected, onClick }) {
  return (
    <button className={`fav-pill ${selected ? 'selected' : ''}`} onClick={onClick}>
      <span className="emoji">{item.emoji}</span>
      <span>{item.nickname || item.name}</span>
      {item.isFavorite && <span className="heart">❤️</span>}
    </button>
  );
}

// ============ PAGES ============

function PeoplePage({ people, onToggleFavorite, onSelect }) {
  const [search, setSearch] = useState('');
  const favorites = people.filter(p => p.isFavorite);
  const filtered = search 
    ? people.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : people;

  return (
    <div className="page">
      <h2 style={{ color: '#FF69B4' }}>👧 People</h2>
      
      {/* Favorites Quick Access */}
      <div className="favorites-section">
        <h3>⭐ Favorites</h3>
        <div className="favorites-pills">
          {favorites.map(p => (
            <FavoritePill key={p.id} item={p} onClick={() => onSelect(p)} />
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <span className="icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search people..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="card">
        {filtered.map(p => (
          <PersonRow key={p.id} person={p} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  );
}

function EventsPage({ events, onToggleFavorite }) {
  const favorites = events.filter(e => e.isFavorite);
  const attended = events.filter(e => e.attended);

  return (
    <div className="page">
      <h2 style={{ color: '#9B59B6' }}>📅 Events</h2>
      
      {/* Favorites */}
      <div className="favorites-section">
        <h3>⭐ Favorites</h3>
        <div className="favorites-pills">
          {favorites.map(e => (
            <FavoritePill key={e.id} item={e} />
          ))}
        </div>
      </div>

      {/* Shows We Went To */}
      <div className="card">
        <h3 style={{ marginBottom: '10px', color: '#4CAF50' }}>✅ Shows We Saw!</h3>
        {attended.map(e => (
          <div key={e.id} className="person-row">
            <span className="emoji">{e.emoji}</span>
            <div className="info">
              <div className="name">{e.name}</div>
              <div className="birthday">📅 {formatDate(e.date)}</div>
            </div>
            <HeartButton isFavorite={e.isFavorite} onToggle={() => onToggleFavorite(e.id)} />
          </div>
        ))}
      </div>

      {/* All Events */}
      <div className="card">
        <h3 style={{ marginBottom: '10px', color: '#7B68EE' }}>📋 All Events</h3>
        {events.map(e => (
          <div key={e.id} className="person-row">
            <span className="emoji">{e.emoji}</span>
            <div className="info">
              <div className="name">{e.name}</div>
              <div className="birthday">📅 {formatDate(e.date)}</div>
            </div>
            {e.attended && <span style={{ fontSize: '12px', color: '#4CAF50' }}>✅</span>}
            <HeartButton isFavorite={e.isFavorite} onToggle={() => onToggleFavorite(e.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelinePage({ people, events, onToggleFavorite }) {
  const [selected, setSelected] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const favPeople = people.filter(p => p.isFavorite);
  const favEvents = events.filter(e => e.isFavorite);

  const toggleItem = (type, id) => {
    const key = `${type}:${id}`;
    if (selected.includes(key)) {
      setSelected(selected.filter(k => k !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  const selectEvent = (event) => {
    setSelectedDate(event.date);
    // Auto-add family when selecting an event
    const familyKeys = people.filter(p => p.type === 'family').map(p => `person:${p.id}`);
    setSelected(prev => [...new Set([...prev, ...familyKeys])]);
  };

  const selectedPeople = selected
    .filter(k => k.startsWith('person:'))
    .map(k => people.find(p => p.id === k.split(':')[1]))
    .filter(Boolean);

  return (
    <div className="page">
      <h2 style={{ color: '#9B59B6' }}>📊 Timeline Builder</h2>
      
      {/* Quick Add - Favorite People */}
      <div className="favorites-section">
        <h3>👆 Quick Add People</h3>
        <div className="favorites-pills">
          {favPeople.map(p => (
            <FavoritePill 
              key={p.id} 
              item={p} 
              selected={selected.includes(`person:${p.id}`)}
              onClick={() => toggleItem('person', p.id)} 
            />
          ))}
        </div>
      </div>

      {/* Quick Add - Events */}
      <div className="favorites-section">
        <h3>📅 Pick a Date/Event</h3>
        <div className="favorites-pills">
          <FavoritePill 
            item={{ emoji: '📆', name: 'Today' }} 
            selected={selectedDate === new Date().toISOString().split('T')[0]}
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])} 
          />
          {favEvents.map(e => (
            <FavoritePill 
              key={e.id} 
              item={e} 
              selected={selectedDate === e.date}
              onClick={() => selectEvent(e)} 
            />
          ))}
        </div>
      </div>

      {/* Results */}
      {selectedDate && selectedPeople.length > 0 && (
        <div className="card" style={{ background: '#F5F5FF' }}>
          <h3 style={{ marginBottom: '10px', color: '#9B59B6' }}>
            🎂 Ages on {formatDate(selectedDate)}
          </h3>
          {selectedPeople
            .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
            .map(p => (
              <div key={p.id} className={`person-row ${p.id === 'sienna' ? 'highlight' : ''}`}>
                <span className="emoji">{p.emoji}</span>
                <div className="info">
                  <div className="name">{p.nickname || p.name}</div>
                  <div className="birthday">🎂 {formatDate(p.birthday)}</div>
                </div>
                <span className="age-badge" style={{ background: p.color }}>
                  {calcAge(p.birthday, selectedDate)}
                </span>
              </div>
            ))}
        </div>
      )}

      {!selectedDate && (
        <div className="card" style={{ background: '#FFF3E0', textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>👆</div>
          <p style={{ color: '#E65100' }}>Pick people + a date above!</p>
        </div>
      )}
    </div>
  );
}

function GroupsPage({ groups, onToggleFavorite }) {
  return (
    <div className="page">
      <h2 style={{ color: '#FF69B4' }}>🎤 Groups & Shows</h2>
      
      <div className="card">
        {groups.map(g => (
          <div key={g.id} className="person-row">
            <span className="emoji">{g.emoji}</span>
            <div className="info">
              <div className="name">{g.name}</div>
              <div className="birthday">{g.type}</div>
            </div>
            <HeartButton isFavorite={g.isFavorite} onToggle={() => onToggleFavorite(g.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState('timeline');
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const toggleFavorite = (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    }));
  };

  const renderPage = () => {
    switch (page) {
      case 'people':
        return <PeoplePage 
          people={data.people} 
          onToggleFavorite={(id) => toggleFavorite('people', id)}
          onSelect={setSelectedPerson}
        />;
      case 'events':
        return <EventsPage 
          events={data.events} 
          onToggleFavorite={(id) => toggleFavorite('events', id)}
        />;
      case 'groups':
        return <GroupsPage 
          groups={data.groups} 
          onToggleFavorite={(id) => toggleFavorite('groups', id)}
        />;
      case 'timeline':
      default:
        return <TimelinePage 
          people={data.people} 
          events={data.events}
          onToggleFavorite={(id) => toggleFavorite('events', id)}
        />;
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>✨ Sienna's Tracker ✨</h1>
        <p>How old was everyone? 🎂</p>
      </div>

      <div className="nav">
        <NavButton label="Timeline" icon="📊" active={page === 'timeline'} onClick={() => setPage('timeline')} />
        <NavButton label="People" icon="👧" active={page === 'people'} onClick={() => setPage('people')} />
        <NavButton label="Events" icon="📅" active={page === 'events'} onClick={() => setPage('events')} />
        <NavButton label="Groups" icon="🎤" active={page === 'groups'} onClick={() => setPage('groups')} />
      </div>

      {renderPage()}

      <div className="footer">Made with 💖 for Sienna</div>
    </div>
  );
}
