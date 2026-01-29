import React, { useState } from 'react'
import { 
  Heart, 
  Search, 
  Users, 
  Calendar, 
  Star, 
  Music, 
  Clock,
  Sparkles,
  ChevronRight,
  Cake
} from 'lucide-react'

// ============ HELPERS ============
function calcAge(birthday, atDate = new Date()) {
  const birth = new Date(birthday)
  const at = new Date(atDate)
  let age = at.getFullYear() - birth.getFullYear()
  const monthDiff = at.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) age--
  return age
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ============ SAMPLE DATA ============
const INITIAL_DATA = {
  people: [
    { id: 'sienna', name: 'Sienna', nickname: 'Sienna', birthday: '2010-11-24', emoji: '⭐', color: 'bg-coral', type: 'family', isFavorite: true },
    { id: 'neil', name: 'Daddy (Neil)', nickname: 'Daddy', birthday: '1973-06-07', emoji: '👨', color: 'bg-sky', type: 'family', isFavorite: true },
    { id: 'cheryl', name: 'Mommy (Cheryl)', nickname: 'Mommy', birthday: '1975-04-21', emoji: '👩', color: 'bg-lavender', type: 'family', isFavorite: true },
    { id: 'chad', name: 'Chad Wild Clay', nickname: 'Chad', birthday: '1984-03-10', emoji: '🥷', color: 'bg-blush', type: 'youtuber', isFavorite: true },
    { id: 'vy', name: 'Vy Qwaint', nickname: 'Vy', birthday: '1986-01-03', emoji: '🎀', color: 'bg-lavender', type: 'youtuber', isFavorite: true },
    { id: 'brooklynn', name: 'Brooklynn Pitts', nickname: 'Brooklynn', birthday: '2010-09-28', emoji: '🦒', color: 'bg-sienna-400', type: 'musician', isFavorite: true },
    { id: 'dallas', name: 'Dallas Skye', nickname: 'Dallas', birthday: '2011-11-17', emoji: '🎹', color: 'bg-sage-400', type: 'musician', isFavorite: false },
    { id: 'kinley', name: 'Kinley Cunningham', nickname: 'Kinley', birthday: '2010-12-22', emoji: '🌈', color: 'bg-coral', type: 'musician', isFavorite: false },
    { id: 'tinie', name: 'Tinie T', nickname: 'Tinie', birthday: '2011-03-13', emoji: '🎤', color: 'bg-lavender', type: 'musician', isFavorite: false },
  ],
  events: [
    { id: 'shrek-kravis', name: 'Shrek Musical @ Kravis', date: '2024-09-28', emoji: '🎭', type: 'show', isFavorite: true, attended: true },
    { id: 'kidzbop-2018', name: 'Kidz Bop Concert 2018', date: '2018-07-20', emoji: '🎵', type: 'concert', isFavorite: true, attended: true },
    { id: 'kidzbop-2012', name: 'Kidz Bop Concert 2012', date: '2012-08-12', emoji: '🎵', type: 'concert', isFavorite: true, attended: true },
    { id: 'xomg-formed', name: 'XOMG POP Formed', date: '2021-12-16', emoji: '💖', type: 'milestone', isFavorite: false },
  ],
  groups: [
    { id: 'xomg', name: 'XOMG POP!', emoji: '💖', type: 'band', isFavorite: true },
    { id: 'spy-ninjas', name: 'Spy Ninjas', emoji: '🥷', type: 'youtube', isFavorite: true },
    { id: 'kidz-bop', name: 'Kidz Bop', emoji: '🎤', type: 'band', isFavorite: true },
    { id: 'shrek-musical', name: 'Shrek the Musical', emoji: '🎭', type: 'show', isFavorite: true },
  ]
}

// ============ COMPONENTS ============

function NavButton({ label, icon: Icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`nav-btn ${active ? 'active' : ''}`}>
      <Icon className="w-5 h-5" />
      <span className="text-xs">{label}</span>
    </button>
  )
}

function HeartButton({ isFavorite, onToggle }) {
  return (
    <button onClick={onToggle} className="heart-btn">
      <Heart 
        className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-coral text-coral' : 'text-warm-300'}`} 
      />
    </button>
  )
}

function PersonRow({ person, showHeart = true, onToggleFavorite, dateForAge = null }) {
  const age = calcAge(person.birthday, dateForAge)
  const isHighlight = person.id === 'sienna'
  
  return (
    <div className={`item-row ${isHighlight ? 'highlight' : ''}`}>
      <div className="avatar">
        <span>{person.emoji}</span>
      </div>
      <div className="info">
        <div className="name">{person.nickname || person.name}</div>
        <div className="meta flex items-center gap-1">
          <Cake className="w-3 h-3" />
          {formatDate(person.birthday)}
        </div>
      </div>
      <span className={`age-badge ${person.color}`}>{age}</span>
      {showHeart && (
        <HeartButton 
          isFavorite={person.isFavorite} 
          onToggle={() => onToggleFavorite(person.id)} 
        />
      )}
    </div>
  )
}

function Pill({ item, selected, onClick }) {
  return (
    <button onClick={onClick} className={`pill ${selected ? 'selected' : ''}`}>
      <span className="emoji">{item.emoji}</span>
      <span>{item.nickname || item.name}</span>
      {item.isFavorite && !selected && (
        <Heart className="w-3 h-3 fill-coral text-coral" />
      )}
    </button>
  )
}

// ============ PAGES ============

function TimelinePage({ people, events, onToggleFavorite }) {
  const [selected, setSelected] = useState(['sienna', 'neil', 'cheryl'])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  const favPeople = people.filter(p => p.isFavorite)
  const favEvents = events.filter(e => e.isFavorite)
  const selectedPeople = people.filter(p => selected.includes(p.id))

  const togglePerson = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const selectEvent = (event) => {
    setSelectedDate(event.date)
    // Auto-select family
    const familyIds = people.filter(p => p.type === 'family').map(p => p.id)
    setSelected(prev => [...new Set([...prev, ...familyIds])])
  }

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Timeline
      </h1>
      
      {/* Quick Add People */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Star className="w-3 h-3" /> Favorites
        </div>
        <div className="flex flex-wrap gap-2">
          {favPeople.map(p => (
            <Pill 
              key={p.id} 
              item={p} 
              selected={selected.includes(p.id)}
              onClick={() => togglePerson(p.id)} 
            />
          ))}
        </div>
      </div>

      {/* Quick Events */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Pick a Date
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill 
            item={{ emoji: '📆', name: 'Today' }} 
            selected={selectedDate === new Date().toISOString().split('T')[0]}
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])} 
          />
          {favEvents.map(e => (
            <Pill 
              key={e.id} 
              item={e} 
              selected={selectedDate === e.date}
              onClick={() => selectEvent(e)} 
            />
          ))}
        </div>
      </div>

      {/* Results */}
      {selectedPeople.length > 0 ? (
        <div className="card bg-gradient-to-br from-sienna-50 to-white">
          <div className="card-header">
            <Cake className="w-5 h-5 text-sienna-500" />
            Ages on {formatDate(selectedDate)}
          </div>
          <div className="space-y-1">
            {selectedPeople
              .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
              .map(p => (
                <PersonRow 
                  key={p.id} 
                  person={p} 
                  showHeart={false}
                  dateForAge={selectedDate}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="icon">👆</div>
            <div className="message">Tap people above to compare!</div>
          </div>
        </div>
      )}
    </div>
  )
}

function PeoplePage({ people, onToggleFavorite }) {
  const [search, setSearch] = useState('')
  const favorites = people.filter(p => p.isFavorite)
  const filtered = search 
    ? people.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : people

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Users className="w-6 h-6" />
        People
      </h1>
      
      {/* Favorites */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Star className="w-3 h-3" /> Favorites
        </div>
        <div className="flex flex-wrap gap-2">
          {favorites.map(p => (
            <Pill key={p.id} item={p} />
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <Search className="w-5 h-5 text-warm-400" />
        <input 
          type="text" 
          placeholder="Search people..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="card">
        <div className="space-y-1">
          {filtered.map(p => (
            <PersonRow 
              key={p.id} 
              person={p} 
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function EventsPage({ events, onToggleFavorite }) {
  const attended = events.filter(e => e.attended)

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Events
      </h1>
      
      {/* Shows We Attended */}
      {attended.length > 0 && (
        <div className="card bg-gradient-to-br from-sage-50 to-white mb-4">
          <div className="card-header text-sage-600">
            <Sparkles className="w-5 h-5" />
            Shows We Saw!
          </div>
          <div className="space-y-1">
            {attended.map(e => (
              <div key={e.id} className="item-row">
                <div className="avatar bg-sage-100">
                  <span>{e.emoji}</span>
                </div>
                <div className="info">
                  <div className="name">{e.name}</div>
                  <div className="meta">{formatDate(e.date)}</div>
                </div>
                <HeartButton 
                  isFavorite={e.isFavorite} 
                  onToggle={() => onToggleFavorite(e.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div className="card">
        <div className="card-header">
          <Calendar className="w-5 h-5 text-sienna-500" />
          All Events
        </div>
        <div className="space-y-1">
          {events.map(e => (
            <div key={e.id} className="item-row">
              <div className="avatar">
                <span>{e.emoji}</span>
              </div>
              <div className="info">
                <div className="name">{e.name}</div>
                <div className="meta">{formatDate(e.date)}</div>
              </div>
              {e.attended && (
                <span className="text-xs text-sage-500 font-medium">✓ went</span>
              )}
              <HeartButton 
                isFavorite={e.isFavorite} 
                onToggle={() => onToggleFavorite(e.id)} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GroupsPage({ groups, onToggleFavorite }) {
  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Music className="w-6 h-6" />
        Groups & Shows
      </h1>
      
      <div className="card">
        <div className="space-y-1">
          {groups.map(g => (
            <div key={g.id} className="item-row">
              <div className="avatar">
                <span>{g.emoji}</span>
              </div>
              <div className="info">
                <div className="name">{g.name}</div>
                <div className="meta capitalize">{g.type}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-warm-300" />
              <HeartButton 
                isFavorite={g.isFavorite} 
                onToggle={() => onToggleFavorite(g.id)} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState('timeline')
  const [data, setData] = useState(INITIAL_DATA)

  const toggleFavorite = (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    }))
  }

  const renderPage = () => {
    switch (page) {
      case 'people':
        return <PeoplePage 
          people={data.people} 
          onToggleFavorite={(id) => toggleFavorite('people', id)}
        />
      case 'events':
        return <EventsPage 
          events={data.events} 
          onToggleFavorite={(id) => toggleFavorite('events', id)}
        />
      case 'groups':
        return <GroupsPage 
          groups={data.groups} 
          onToggleFavorite={(id) => toggleFavorite('groups', id)}
        />
      case 'timeline':
      default:
        return <TimelinePage 
          people={data.people} 
          events={data.events}
          onToggleFavorite={(id) => toggleFavorite('events', id)}
        />
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-sienna-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sienna-500 to-sienna-600 text-white p-4 safe-top">
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          sienna
        </h1>
        <p className="text-sienna-100 text-sm">How old was everyone?</p>
      </header>

      {/* Content */}
      <main className="pb-20">
        {renderPage()}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-sienna-100 p-2 safe-bottom">
        <div className="flex justify-around max-w-md mx-auto">
          <NavButton 
            label="Timeline" 
            icon={Clock} 
            active={page === 'timeline'} 
            onClick={() => setPage('timeline')} 
          />
          <NavButton 
            label="People" 
            icon={Users} 
            active={page === 'people'} 
            onClick={() => setPage('people')} 
          />
          <NavButton 
            label="Events" 
            icon={Calendar} 
            active={page === 'events'} 
            onClick={() => setPage('events')} 
          />
          <NavButton 
            label="Groups" 
            icon={Music} 
            active={page === 'groups'} 
            onClick={() => setPage('groups')} 
          />
        </div>
      </nav>
    </div>
  )
}
